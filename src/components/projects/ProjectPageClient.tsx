'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import ProjectGrid from './ProjectGrid'
import styles from './ProjectPageClient.module.css'

interface ProjectPageClientProps {
  heroBlock: any
  aboutBlock: any
  posts: any[]
  companies?: any[]
}

export default function ProjectPageClient({
  heroBlock,
  aboutBlock,
  posts,
  companies = [],
}: ProjectPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const pathname = usePathname()
  const [pageId, setPageId] = useState<string | null>(null)
  const [pageTitle, setPageTitle] = useState<string>('Все проекты')

  useEffect(() => {
    const slug = pathname.replace(/^\//, '')
    console.log('🔍 ProjectPageClient: pathname =', pathname, 'slug =', slug)
    fetch(`/api/page-title?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('🔍 ProjectPageClient: API response =', data)
        if (data.id) setPageId(data.id)
        if (data.title) setPageTitle(data.title)
      })
      .catch((error) => {
        console.error('🔍 ProjectPageClient: API error =', error)
      })
  }, [pathname])

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
      {/* Хлебные крошки */}
      <nav className="cont text-sm text-gray-500 py-4" aria-label="breadcrumbs">
        <span>
          <a href="/" className="hover:underline">
            Главная
          </a>{' '}
          |
        </span>
        <span className="text-primary font-semibold ml-1">Проекты</span>
      </nav>
      {showHero && (
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
        <div
          className={`flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 ${styles.scrollContainer}`}
        >
          <button
            className={`btn btn-primary text-white whitespace-nowrap ${selectedCategory ? ' btn-outline bg-white border-white text-black' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            Все проекты
          </button>
          {uniqueCategories.map((cat) => (
            <button
              key={cat.slug}
              className={`btn bg-white text-black border border-gray-200 whitespace-nowrap ${selectedCategory === cat.slug ? 'border-primary bg-primary border-2 text-primary' : ''}`}
              onClick={() => setSelectedCategory(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="mb-6">
          <h1
            className="font-medium break-words"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.375rem)',
              lineHeight: '1.1',
            }}
          >
            {pageTitle}
          </h1>
        </div>
        {/* Сетка проектов */}
        <ProjectGrid posts={filteredPosts} />
      </div>
    </div>
  )
}
