import { getApolloClient } from '@/lib/apollo-client'
import { fetchAllCategories } from '@/services/pageService'

export default async function TestCategories() {
  const apolloClient = getApolloClient()

  console.log('🧪 Тестируем получение категорий...')

  // Получаем все категории
  const categories = await fetchAllCategories(apolloClient)
  console.log('📋 Все категории:', categories)

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Тест категорий WordPress</h1>

      <h2>Все категории ({categories.length}):</h2>
      <ul>
        {categories.map(({ node: category }, index) => (
          <li key={index}>
            <strong>{category.name}</strong> - slug: {category.slug} - ID:{' '}
            {category.id}
          </li>
        ))}
      </ul>

      <h2>Предлагаемая структура маршрутов:</h2>
      <div style={{ background: '#f0f0f0', padding: '10px', margin: '10px 0' }}>
        <h3>Страницы WordPress (корень):</h3>
        <ul>
          <li>/privacy-policy</li>
          <li>/about</li>
          <li>/projects</li>
        </ul>

        <h3>Категории (по реальным названиям):</h3>
        <ul>
          {categories.map(({ node: category }) => (
            <li key={category.slug}>
              /{category.slug} - {category.name}
            </li>
          ))}
        </ul>

        <h3>Посты (в категориях):</h3>
        <ul>
          {categories.map(({ node: category }) => (
            <li key={category.slug}>
              /{category.slug}/[slug-поста] - посты в категории "{category.name}
              "
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
