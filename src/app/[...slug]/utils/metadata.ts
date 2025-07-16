import { GET_POST_BY_SLUG } from '@/graphql/queries/getPostBySlug'
import { getApolloClient } from '@/lib/apollo-client'
import { fetchCategoryWithChildren } from '@/services/pageService'
import { fetchPageBySlug } from '@/services/pagesService'
import { Metadata } from 'next'

interface GenerateMetadataProps {
  slug: string[]
}

export async function generatePageMetadata({
  slug,
}: GenerateMetadataProps): Promise<Metadata> {
  if (!slug || slug.length === 0) {
    return {
      title: 'Страница не найдена',
      description: 'Запрашиваемая страница не существует',
    }
  }

  const apolloClient = getApolloClient()

  // 1. Проверяем, это страница WordPress (один сегмент)
  if (slug.length === 1) {
    const pageData = await fetchPageBySlug(apolloClient, slug[0])
    if (pageData) {
      return {
        title: pageData.seo?.title || pageData.title,
        description: pageData.seo?.metaDesc || `Страница ${pageData.title}`,
      }
    }

    // Проверяем категорию с дочерними
    const categoryData = await fetchCategoryWithChildren(apolloClient, slug[0])
    if (categoryData) {
      return {
        title: categoryData.seo?.title || categoryData.name,
        description:
          categoryData.seo?.metaDesc || `Категория ${categoryData.name}`,
      }
    }
  }

  // 2. Проверяем подкатегорию (два сегмента: категория/подкатегория)
  if (slug.length === 2) {
    // Исключаем создание страницы /projects/projects
    if (slug[0] === 'projects' && slug[1] === 'projects') {
      return {
        title: 'Страница не найдена',
        description: 'Запрашиваемая страница не существует',
      }
    }

    const categoryData = await fetchCategoryWithChildren(apolloClient, slug[1])
    if (categoryData) {
      return {
        title: categoryData.seo?.title || categoryData.name,
        description:
          categoryData.seo?.metaDesc || `Категория ${categoryData.name}`,
      }
    }
  }

  // 3. Проверяем пост (три сегмента: категория/подкатегория/пост)
  if (slug.length === 3) {
    try {
      const { data } = await apolloClient.query({
        query: GET_POST_BY_SLUG,
        variables: { slug: slug[2] },
      })

      const post = data?.postBy
      if (post) {
        return {
          title: post.seo?.title || post.title,
          description: post.seo?.metaDesc || `Пост ${post.title}`,
        }
      }
    } catch (error) {
      console.error('Ошибка при получении поста:', error)
    }
  }

  return {
    title: 'Страница не найдена',
    description: 'Запрашиваемая страница не существует',
  }
}
