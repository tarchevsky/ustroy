'use client'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

interface Category {
  slug: string
  name: string
}

interface Post {
  categories?: {
    edges: Array<{
      node: {
        slug: string
        name: string
      }
    }>
  }
}

interface CategoryLinksProps {
  categories: Category[]
  posts: Post[]
  currentCategorySlug: string
  className?: string
}

const CategoryLinks: React.FC<CategoryLinksProps> = ({
  categories,
  posts,
  currentCategorySlug,
  className = '',
}) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Собираем уникальные категории только из постов, которые есть
  const uniqueCategories = useMemo(() => {
    const map = new Map<string, { slug: string; name: string }>()
    posts.forEach((post) => {
      post.categories?.edges.forEach((edge: any) => {
        if (!map.has(edge.node.slug)) {
          map.set(edge.node.slug, {
            slug: edge.node.slug,
            name: edge.node.name,
          })
        }
      })
    })
    // Сортируем для стабильности рендера
    return Array.from(map.values()).sort((a, b) => a.slug.localeCompare(b.slug))
  }, [posts])

  // Не рендерим на сервере или если нет данных, только после гидратации
  if (!isClient || !posts || posts.length === 0) {
    return (
      <div
        className={`ind cont carousel carousel-center gap-2 w-full ${className}`}
      >
        <div className="btn bg-white text-black border border-gray-200 whitespace-nowrap">
          Все проекты
        </div>
      </div>
    )
  }

  return (
    <div className="cont">
      <h5 className="mb-6 text-xl">Выберите другую категорию:</h5>
      <div className={`carousel carousel-center gap-2 w-full ${className}`}>
        <Link
          href="/projects"
          className={`btn bg-white text-black border border-gray-200 whitespace-nowrap hover:border-primary hover:text-primary`}
        >
          Все проекты
        </Link>
        {uniqueCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/${cat.slug}`}
            className={`btn bg-white text-black border border-gray-200 whitespace-nowrap ${
              currentCategorySlug === cat.slug
                ? 'btn-primary text-primary border-primary border-2'
                : 'hover:border-primary hover:text-primary'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryLinks
