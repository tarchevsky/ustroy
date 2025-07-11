import { getApolloClient } from '@/lib/apollo-client'
import { fetchCategoryWithChildren } from '@/services/pageService'

export default async function TestCategory() {
  const apolloClient = getApolloClient()

  console.log('🧪 Тестируем категорию projects...')

  // Получаем данные категории projects
  const categoryData = await fetchCategoryWithChildren(apolloClient, 'projects')
  console.log('📋 Данные категории projects:', categoryData)

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Тест категории projects</h1>

      {categoryData ? (
        <div>
          <h2>Основная информация:</h2>
          <ul>
            <li>
              <strong>ID:</strong> {categoryData.id}
            </li>
            <li>
              <strong>Название:</strong> {categoryData.name}
            </li>
            <li>
              <strong>Slug:</strong> {categoryData.slug}
            </li>
            <li>
              <strong>Описание:</strong>{' '}
              {categoryData.description || 'Нет описания'}
            </li>
          </ul>

          <h2>
            Дочерние категории ({categoryData.children?.nodes?.length || 0}):
          </h2>
          {categoryData.children?.nodes &&
          categoryData.children.nodes.length > 0 ? (
            <ul>
              {categoryData.children.nodes.map((child: any) => (
                <li key={child.id}>
                  <strong>{child.name}</strong> - slug: {child.slug} - постов:{' '}
                  {child.count}
                  {child.description && <p>Описание: {child.description}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'red' }}>Дочерних категорий не найдено!</p>
          )}

          <h2>Посты в категории ({categoryData.posts?.edges?.length || 0}):</h2>
          {categoryData.posts?.edges && categoryData.posts.edges.length > 0 ? (
            <ul>
              {categoryData.posts.edges.map(({ node: post }: any) => (
                <li key={post.id}>
                  <strong>{post.title}</strong> - slug: {post.slug}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'orange' }}>Постов в категории не найдено</p>
          )}

          <h2>Raw данные:</h2>
          <pre
            style={{
              background: '#f5f5f5',
              padding: '10px',
              overflow: 'auto',
              maxHeight: '400px',
            }}
          >
            {JSON.stringify(categoryData, null, 2)}
          </pre>
        </div>
      ) : (
        <p style={{ color: 'red' }}>Категория projects не найдена!</p>
      )}
    </div>
  )
}
