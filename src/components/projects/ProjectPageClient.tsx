'use client'
import { useMemo, useState } from 'react'

interface ProjectPageClientProps {
  heroBlock: any
  aboutBlock: any
  posts: any[]
  pageTitle?: string
  companies?: any[]
}

export default function ProjectPageClient({
  heroBlock,
  aboutBlock,
  posts,
  pageTitle,
  companies = [],
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

  const showHero =
    heroBlock && heroBlock.header && String(heroBlock.header).trim() !== ''
  return (
    <div>
      {showHero ? (
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
      ) : pageTitle ? (
        <div className="mb-8 cont">
          <h1 className="text-3xl font-bold text-white">{pageTitle}</h1>
        </div>
      ) : null}
      {aboutBlock && (
        <div className="mb-8">
          <div>{aboutBlock.title}</div>
        </div>
      )}
      {companies && companies.length > 0 && (
        <div className="cont my-8">
          <h2 className="text-2xl font-bold mb-4">Наши заказчики</h2>
          <div className="grid grid-cols-2 gap-4 md:flex md:flex-row md:flex-wrap md:gap-6 md:justify-center">
            {companies.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-box flex items-center justify-center"
                style={{ height: 80 }}
              >
                <img
                  src={company.src}
                  alt={company.alt}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                  height={company.height || 40}
                  width={company.width || 100}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="cont my-8">
        <div className="flex flex-row flex-wrap gap-2 mb-6">
          <button
            className={`btn btn-primary border-white text-white ${selectedCategory ? 'btn-outline text-primary bg-white border-primary' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            Все проекты
          </button>
          {uniqueCategories.map((cat) => (
            <button
              key={cat.slug}
              className={`btn bg-white text-black border border-gray-200 ${selectedCategory === cat.slug ? 'border-primary bg-primary border-2 text-primary' : ''}`}
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
              className="block border rounded-lg overflow-hidden hover:shadow-lg transition relative group"
              style={{
                minHeight: '280px',
                background: post.featuredImage?.node?.link
                  ? `url(${post.featuredImage.node.link}) center/cover no-repeat`
                  : '#222',
              }}
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition" />
              <div className="relative z-10 p-4 flex flex-col h-full justify-end">
                <div className="text-lg font-semibold mb-2 text-white">
                  {post.title}
                </div>
                <div className="text-sm text-gray-200 mb-1">
                  {post.categories?.edges
                    .map((edge: any) => edge.node.name)
                    .join(', ')}
                </div>
                <div className="text-xs text-gray-300">{post.date}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
