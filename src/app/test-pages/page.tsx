import { getApolloClient } from '@/lib/apollo-client'
import { fetchAllPages, fetchPageBySlug } from '@/services/pagesService'

export default async function TestPages() {
  const apolloClient = getApolloClient()

  console.log('🧪 Тестируем получение страниц...')

  // Получаем все страницы
  const allPages = await fetchAllPages(apolloClient)
  console.log('📋 Все страницы:', allPages)

  // Пытаемся получить конкретную страницу
  const privacyPage = await fetchPageBySlug(apolloClient, 'privacy-policy')
  console.log('🔒 Страница privacy-policy:', privacyPage)

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Тест страниц</h1>

      <h2>Все страницы ({allPages.length}):</h2>
      <ul>
        {allPages.map((page, index) => (
          <li key={index}>
            <strong>{page.title}</strong> - slug: {page.slug} - uri:{' '}
            {page.uri || 'null'} - ID: {page.id}
          </li>
        ))}
      </ul>

      <h2>Страница privacy-policy:</h2>
      {privacyPage ? (
        <div>
          <p>
            <strong>Заголовок:</strong> {privacyPage.title}
          </p>
          <p>
            <strong>ID:</strong> {privacyPage.id}
          </p>
          <p>
            <strong>Slug:</strong> {privacyPage.slug}
          </p>
          <p>
            <strong>Есть контент:</strong> {privacyPage.content ? 'Да' : 'Нет'}
          </p>
          <p>
            <strong>Количество блоков:</strong>{' '}
            {privacyPage.typesOfContent?.choose?.length || 0}
          </p>
          {privacyPage.content && (
            <div>
              <p>
                <strong>Контент:</strong>
              </p>
              <div
                style={{
                  background: '#f5f5f5',
                  padding: '10px',
                  maxHeight: '200px',
                  overflow: 'auto',
                }}
              >
                {privacyPage.content}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p style={{ color: 'red' }}>Страница не найдена!</p>
      )}
    </div>
  )
}
