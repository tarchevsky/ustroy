import { getApolloClient } from '@/lib/apollo-client'
import { fetchAllCategories } from '@/services/pageService'

export async function generateStaticParams() {
  const apolloClient = getApolloClient()

  try {
    // Получаем все страницы WordPress
    const { fetchAllPages } = await import('@/services/pagesService')
    const pages = await fetchAllPages(apolloClient)

    // Получаем все категории
    const categories = await fetchAllCategories(apolloClient)

    // Получаем все посты для проверки пустых категорий
    const { GET_POSTS } = await import('@/graphql/queries/getPosts')
    const { data: postsData } = await apolloClient.query({
      query: GET_POSTS,
      variables: { first: 1000 },
    })
    const posts = postsData?.posts?.edges?.map((edge: any) => edge.node) || []

    // Создаем Set категорий, в которых есть посты
    const categoriesWithPosts = new Set<string>()
    posts.forEach((post: any) => {
      post.categories?.edges?.forEach((edge: any) => {
        categoriesWithPosts.add(edge.node.slug)
      })
    })

    const paths: Array<{ slug: string[] }> = []

    // Добавляем страницы WordPress (исключаем главную и projects)
    const filteredPages = pages.filter((page) => {
      if (!page.slug || page.slug === 'projects' || page.slug === '') {
        return false
      }
      return true
    })

    filteredPages.forEach((page) => {
      paths.push({ slug: [page.slug] })
    })

    // Добавляем только категории, в которых есть посты
    categories.forEach(
      ({
        node: category,
      }: {
        node: import('@/graphql/types/categoriesTypes').CategoryNode
      }) => {
        // Не добавляем путь для подкатегорий projects (их slug совпадает с дочерними категориями projects)
        if (
          categoriesWithPosts.has(category.slug) &&
          category.slug !== 'projects'
        ) {
          paths.push({ slug: [category.slug] })
        }
      },
    )

    // Добавляем подкатегории для projects
    const { fetchCategoryWithChildren } = await import('@/services/pageService')
    const projectsCategory = await fetchCategoryWithChildren(
      apolloClient,
      'projects',
    )
    if (
      projectsCategory &&
      projectsCategory.children &&
      projectsCategory.children.nodes
    ) {
      projectsCategory.children.nodes.forEach((child: any) => {
        paths.push({ slug: ['projects', child.slug] })
      })
    }

    // TODO: Добавить подкатегории и посты
    // Это потребует дополнительных запросов

    console.log(
      '✅ Сгенерированы параметры:',
      paths.map((p) => p.slug.join('/')),
    )
    return paths
  } catch (error) {
    console.error('❌ Ошибка при генерации статических параметров:', error)
    return []
  }
}
