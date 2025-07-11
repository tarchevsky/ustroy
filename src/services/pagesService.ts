import { GET_ALL_PAGES } from '@/graphql/queries/getAllPages'
import { GET_PAGE_SETTINGS } from '@/graphql/queries/getPageSettings'
import { PageSettingsData } from '@/graphql/types/pageSettingsTypes'
import { PagesData } from '@/graphql/types/pagesTypes'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export async function fetchAllPages(
  client: ApolloClient<NormalizedCacheObject>,
) {
  console.log('🔍 Запрашиваем все страницы...')
  const { data } = await client.query<PagesData>({
    query: GET_ALL_PAGES,
  })
  console.log('📋 Получено страниц:', data.pages.nodes.length)
  return data.pages.nodes
}

export async function fetchPageBySlug(
  client: ApolloClient<NormalizedCacheObject>,
  slug: string,
) {
  console.log('🔍 Запрашиваем страницу по slug:', slug)
  try {
    // Сначала получаем все страницы и ищем нужную по slug
    const allPages = await fetchAllPages(client)
    const page = allPages.find((p) => p.slug === slug)

    if (!page) {
      console.log('❌ Страница не найдена в списке всех страниц')
      return null
    }

    console.log('✅ Найдена страница по slug, ID:', page.id)

    // Теперь получаем полные данные страницы по ID
    const { data } = await client.query<PageSettingsData>({
      query: GET_PAGE_SETTINGS,
      variables: { id: page.id },
    })

    console.log('📄 Полные данные страницы:', data.page)

    // Объединяем данные из списка страниц с полными данными
    return {
      ...page,
      ...data.page,
    }
  } catch (error) {
    console.error('❌ Ошибка при получении страницы по slug:', slug, error)
    return null
  }
}
