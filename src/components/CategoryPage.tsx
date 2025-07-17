import FadeIn from '@/components/fadeIn/FadeIn'
import { ChildCategory } from '@/graphql/types/categoryWithChildrenTypes'
import { transformCategoryBySlugPosts } from '@/services/transformService'
import Link from 'next/link'
import { ConditionalRenderer } from './conditional/ConditionalRenderer'
import ProjectGrid from './projects/ProjectGrid'

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

  // Хлебные крошки
  const breadcrumbs: Array<{ name: string; href?: string }> = [
    { name: 'Главная', href: '/' },
    { name: 'Проекты', href: '/projects' },
    { name: categoryData.name },
  ]

  return (
    <>
      {/* Хлебные крошки */}
      <nav className="cont text-sm text-gray-500 py-4" aria-label="breadcrumbs">
        {breadcrumbs.map((item, idx) =>
          item.href ? (
            <span key={item.name}>
              <Link href={item.href} className="hover:underline">
                {item.name}
              </Link>
              {idx < breadcrumbs.length - 1 && ' | '}
            </span>
          ) : (
            <span key={item.name} className="text-primary font-semibold">
              {item.name}
            </span>
          ),
        )}
      </nav>

      <FadeIn className="cont ind">
        <h1>{categoryData.name}</h1>
        {categoryData.description && (
          <p className="text-gray-600 mt-4">{categoryData.description}</p>
        )}
      </FadeIn>

      {/* Универсальный рендерер для условных блоков */}
      <ConditionalRenderer typesOfContent={undefined} pagecontent={undefined} />

      {/* Дочерние категории */}
      {childCategories.length > 0 && (
        <FadeIn className="cont">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Подкатегории</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {childCategories.map((child: ChildCategory) => (
                <Link
                  key={child.id}
                  href={`/projects/${child.slug}`}
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
        <FadeIn className="cont ind">
          <h2 className="text-2xl font-bold"></h2>
          {/* Сетка проектов без фильтров */}
          <ProjectGrid posts={categoryPosts} />
        </FadeIn>
      )}

      {/* Если нет ни дочерних категорий, ни постов - возвращаем 404 */}
      {childCategories.length === 0 && categoryPosts.length === 0 && (
        <div className="cont ind">
          <div className="text-center py-8">
            <p className="text-gray-500">Страница не найдена</p>
          </div>
        </div>
      )}
    </>
  )
}
