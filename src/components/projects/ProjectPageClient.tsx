'use client'
import { useMemo, useState } from 'react'

interface ProjectPageClientProps {
  heroBlock: any
  aboutBlock: any
  posts: any[]
}

export default function ProjectPageClient({
  heroBlock,
  aboutBlock,
  posts,
}: ProjectPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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

  // Фильтрация проектов
  const filteredPosts = selectedCategory
    ? posts.filter((post: any) =>
        post.categories?.edges.some(
          (edge: any) => edge.node.slug === selectedCategory,
        ),
      )
    : posts

  return (
    <div>
      {heroBlock && (
        <div className="mb-8">
          <div className="mb-4 cont">
            <h1 className="text-3xl font-bold">{heroBlock.header}</h1>
            {heroBlock.sub && (
              <div className="text-lg text-gray-500">{heroBlock.sub}</div>
            )}
            {heroBlock.text1 && <div>{heroBlock.text1}</div>}
            {heroBlock.text2 && <div>{heroBlock.text2}</div>}
            {heroBlock.buttonText && (
              <button className="btn btn-primary mt-4">
                {heroBlock.buttonText}
              </button>
            )}
          </div>
        </div>
      )}
      {aboutBlock && (
        <div className="mb-8">
          <div>{aboutBlock.title}</div>
        </div>
      )}
      <div className="cont my-8">
        <div className="flex flex-row flex-wrap gap-2 mb-6">
          <button
            className={`btn btn-primary ${selectedCategory ? 'btn-outline text-primary border-primary bg-white' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            Все проекты
          </button>
          {uniqueCategories.map((cat) => (
            <button
              key={cat.slug}
              className={`btn bg-white text-black border border-gray-200 ${selectedCategory === cat.slug ? 'border-primary text-primary' : ''}`}
              onClick={() => setSelectedCategory(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.length === 0 && (
            <div>Нет проектов в этой категории</div>
          )}
          {filteredPosts.map((post: any) => (
            <a
              key={post.slug}
              href={`/${post.categories?.edges[0]?.node.slug || 'projects'}/${post.slug}`}
              className="block border rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="text-lg font-semibold mb-2">{post.title}</div>
                <div className="text-sm text-gray-500 mb-1">
                  {post.categories?.edges
                    .map((edge: any) => edge.node.name)
                    .join(', ')}
                </div>
                <div className="text-xs text-gray-400">{post.date}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
