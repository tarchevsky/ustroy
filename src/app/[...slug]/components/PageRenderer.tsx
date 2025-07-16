import CategoryPage from '@/components/CategoryPage'
import CategoryPostPage from '@/components/CategoryPostPage'
import WpPageComponent from '@/components/WpPageComponent'
import { getApolloClient } from '@/lib/apollo-client'
import { fetchCategoryWithChildren } from '@/services/pageService'
import { fetchPageBySlug } from '@/services/pagesService'
import { notFound } from 'next/navigation'

interface PageRendererProps {
  slug: string[]
}

export async function renderPage({ slug }: PageRendererProps) {
  if (!slug || slug.length === 0) {
    notFound()
  }

  const apolloClient = getApolloClient()
  const path = slug.join('/')

  console.log('🔍 Запрашиваемый путь:', path, 'slug:', slug)

  // 1. Проверяем, это страница WordPress (один сегмент)
  if (slug.length === 1) {
    const pageData = await fetchPageBySlug(apolloClient, slug[0])
    if (pageData) {
      console.log('✅ Найдена страница WordPress:', pageData.title)
      return <WpPageComponent pageData={pageData} />
    }

    // Проверяем категорию с дочерними
    const categoryData = await fetchCategoryWithChildren(apolloClient, slug[0])
    if (categoryData) {
      console.log('✅ Найдена категория с дочерними:', categoryData.name)
      return <CategoryPage categoryData={categoryData} />
    }
  }

  // 2. Проверяем подкатегорию (два сегмента: категория/подкатегория)
  if (slug.length === 2) {
    // Исключаем создание страницы /projects/projects
    if (slug[0] === 'projects' && slug[1] === 'projects') {
      console.log('❌ Блокируем создание страницы /projects/projects')
      notFound()
    }

    const categoryData = await fetchCategoryWithChildren(apolloClient, slug[1])
    if (categoryData) {
      console.log('✅ Найдена подкатегория:', categoryData.name)
      return <CategoryPage categoryData={categoryData} />
    }
  }

  // 3. Проверяем пост (три сегмента: категория/подкатегория/пост)
  if (slug.length === 3) {
    console.log('🔍 Проверяем пост:', slug[0], slug[1], slug[2])
    // slug[0] = projects (категория)
    // slug[1] = cinema (подкатегория)
    // slug[2] = life (slug поста)
    return <CategoryPostPage category={slug[1]} slug={slug[2]} />
  }

  console.log('❌ Ничего не найдено')
  notFound()
}
