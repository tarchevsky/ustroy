'use client'
import { useMemo } from 'react'

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

interface ProjectFiltersProps {
  posts: Post[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  className?: string
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  posts,
  selectedCategory,
  onCategoryChange,
  className = '',
}) => {
  // Собираем уникальные категории из всех постов
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
    return Array.from(map.values())
  }, [posts])

  return (
    <div
      className={`ind cont carousel carousel-center gap-2 py-2 w-full ${className}`}
    >
      <button
        className={`btn btn-primary text-white whitespace-nowrap ${
          selectedCategory ? 'btn-outline bg-white border-white text-black' : ''
        }`}
        onClick={() => onCategoryChange(null)}
      >
        Все проекты
      </button>
      {uniqueCategories.map((cat) => (
        <button
          key={cat.slug}
          className={`btn bg-white text-black border border-gray-200 whitespace-nowrap ${
            selectedCategory === cat.slug
              ? 'border-primary bg-primary border-2 text-primary'
              : ''
          }`}
          onClick={() => onCategoryChange(cat.slug)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}

export default ProjectFilters
