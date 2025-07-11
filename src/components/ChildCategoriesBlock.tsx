import FadeIn from '@/components/fadeIn/FadeIn'
import { ChildCategoryNode } from '@/graphql/types/childCategoriesTypes'
import Link from 'next/link'

interface ChildCategoriesBlockProps {
  categories: ChildCategoryNode[]
  parentSlug: string
}

export default function ChildCategoriesBlock({
  categories,
  parentSlug,
}: ChildCategoriesBlockProps) {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <FadeIn className="cont">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Категории проектов</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${parentSlug}/${category.slug}`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              {category.description && (
                <p className="text-gray-600 text-sm mb-2">
                  {category.description}
                </p>
              )}
              <span className="text-sm text-gray-500">
                {category.count}{' '}
                {category.count === 1
                  ? 'пост'
                  : category.count < 5
                    ? 'поста'
                    : 'постов'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
