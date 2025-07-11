import CategoryPosts from '@/components/categoryPosts/CategoryPosts'
import FadeIn from '@/components/fadeIn/FadeIn'
import { ChildCategory } from '@/graphql/types/categoryWithChildrenTypes'
import { transformCategoryBySlugPosts } from '@/services/transformService'
import Link from 'next/link'

interface CategoryPageProps {
  categoryData: any
}

export default function CategoryPage({ categoryData }: CategoryPageProps) {
  console.log('🔍 CategoryPage получила данные:', categoryData)

  // Получаем и трансформируем посты из категории
  const categoryPosts = transformCategoryBySlugPosts(categoryData)

  // Получаем дочерние категории
  const childCategories = categoryData.children?.nodes || []

  console.log('👶 Дочерние категории:', childCategories)
  console.log('📝 Посты:', categoryPosts)

  return (
    <>
      <FadeIn className="cont ind">
        <h1>{categoryData.name}</h1>
        {categoryData.description && (
          <p className="text-gray-600 mt-4">{categoryData.description}</p>
        )}
      </FadeIn>

      {/* Отладочная информация */}
      <div style={{ background: '#f0f0f0', padding: '10px', margin: '10px 0' }}>
        <h3>Отладка CategoryPage</h3>
        <p>Название категории: {categoryData.name}</p>
        <p>Количество дочерних категорий: {childCategories.length}</p>
        <p>Количество постов: {categoryPosts.length}</p>
        <p>
          Дочерние категории:{' '}
          {childCategories.map((c: any) => c.name).join(', ')}
        </p>
      </div>

      {/* Дочерние категории */}
      {childCategories.length > 0 && (
        <FadeIn className="cont">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Подкатегории</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {childCategories.map((child: ChildCategory) => (
                <Link
                  key={child.id}
                  href={`/${categoryData.slug}/${child.slug}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-2">{child.name}</h3>
                  {child.description && (
                    <p className="text-gray-600 text-sm mb-2">
                      {child.description}
                    </p>
                  )}
                  <span className="text-sm text-gray-500">
                    {child.count}{' '}
                    {child.count === 1
                      ? 'пост'
                      : child.count < 5
                        ? 'поста'
                        : 'постов'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {/* Посты в текущей категории */}
      {categoryPosts.length > 0 && (
        <FadeIn className="cont">
          <h2 className="text-2xl font-bold mb-4">
            {childCategories.length > 0 ? 'Посты в этой категории' : 'Посты'}
          </h2>
          <CategoryPosts posts={categoryPosts} />
        </FadeIn>
      )}

      {/* Если нет ни дочерних категорий, ни постов */}
      {childCategories.length === 0 && categoryPosts.length === 0 && (
        <FadeIn className="cont">
          <div className="text-center py-8">
            <p className="text-gray-500">В этой категории пока нет контента</p>
          </div>
        </FadeIn>
      )}
    </>
  )
}
