import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import CategoryPage from '@/components/CategoryPage'
import CategoryPostPage from '@/components/CategoryPostPage'
import WpPageComponent from '@/components/WpPageComponent'
import { getApolloClient } from '@/lib/apollo-client'
import {
  fetchAllCategories,
  fetchCategoryWithChildren,
} from '@/services/pageService'
import { fetchPageBySlug } from '@/services/pagesService'

interface PageProps {
  params: {
    slug: string[]
  }
}

export const revalidate = 3600

const getClient = () => getApolloClient()

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params
  if (!slug || slug.length === 0) {
    return {
      title: 'Страница не найдена',
      description: 'Запрашиваемая страница не существует',
    }
  }

  const apolloClient = getClient()
  const path = slug.join('/')

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
    // Здесь нужно добавить логику для постов
    return {
      title: 'Пост не найден',
      description: 'Запрашиваемый пост не существует',
    }
  }

  return {
    title: 'Страница не найдена',
    description: 'Запрашиваемая страница не существует',
  }
}

const DynamicPage = async ({ params }: PageProps) => {
  const { slug } = params
  if (!slug || slug.length === 0) {
    notFound()
  }

  const apolloClient = getClient()
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

export default DynamicPage

// Генерация статических маршрутов
export async function generateStaticParams() {
  const apolloClient = getClient()

  try {
    // Получаем все страницы WordPress
    const { fetchAllPages } = await import('@/services/pagesService')
    const pages = await fetchAllPages(apolloClient)

    // Получаем все категории
    const categories = await fetchAllCategories(apolloClient)

    const paths: Array<{ slug: string[] }> = []

    // Добавляем страницы WordPress (исключаем главную и projects)
    const filteredPages = pages.filter((page) => {
      if (
        !page.slug ||
        page.slug === 'home' ||
        page.slug === 'glavnaya' ||
        page.slug === 'projects' ||
        page.slug === ''
      ) {
        return false
      }
      return true
    })

    filteredPages.forEach((page) => {
      paths.push({ slug: [page.slug] })
    })

    // Добавляем категории
    categories.forEach(({ node: category }) => {
      paths.push({ slug: [category.slug] })
    })

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
