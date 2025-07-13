'use client'
import { useMemo, useState } from 'react'
import FadeIn from '../fadeIn/FadeIn'
import styles from './PostsCarousel.module.scss'

interface Post {
  slug: string
  title: string
  featuredImage?: { node?: { link?: string } }
  path?: string
  categories?: {
    edges: Array<{
      node: {
        slug: string
        name: string
      }
    }>
  }
}

interface PostsCarouselProps {
  posts: Post[]
}

const PostsCarousel: React.FC<PostsCarouselProps> = ({ posts }) => {
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

  // Фильтрация постов
  const filteredPosts = selectedCategory
    ? posts.filter((post: any) =>
        post.categories?.edges.some(
          (edge: any) => edge.node.slug === selectedCategory,
        ),
      )
    : posts

  return (
    <div className="ind">
      {/* Карусель постов */}
      <div className={styles.carouselContainer}>
        <FadeIn
          className={`cont carousel carousel-center gap-4 pb-6 w-full ${styles.carousel}`}
        >
          {filteredPosts.map((post, id) => (
            <a
              key={post.slug}
              href={
                post.path
                  ? post.path.startsWith('/projects')
                    ? post.path
                    : `/projects${post.path}`
                  : `/projects/${post.slug}`
              }
              className={`carousel-item relative rounded-box overflow-hidden flex items-end bg-gray-200 ${styles.carouselItem} group`}
            >
              {post.featuredImage?.node?.link && (
                <img
                  src={post.featuredImage.node.link}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover z-0  transition-transform duration-300"
                />
              )}
              <div
                className="absolute inset-0 z-10"
                style={{
                  background:
                    'linear-gradient(358deg, rgba(0, 0, 0, 0.40) 23.98%, rgba(159, 159, 159, 0.04) 98.03%)',
                }}
              />
              <div
                className="relative z-20 text-white font-semibold"
                style={{
                  left: 32,
                  bottom: 32,
                  position: 'absolute',
                  fontFamily: 'Unbounded Variable, sans-serif',
                  fontSize: 'clamp(18px, 2vw, 28px)',
                }}
              >
                {post.title}
              </div>
            </a>
          ))}
        </FadeIn>
      </div>

      {/* Фильтры */}
      <div className="cont">
        <div
          className={`flex gap-2 mt-6 overflow-x-auto pb-2 ${styles.filtersContainer}`}
        >
          <button
            className={`btn btn-primary text-white whitespace-nowrap ${
              selectedCategory
                ? 'btn-outline bg-white border-white text-black'
                : ''
            }`}
            onClick={() => setSelectedCategory(null)}
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
              onClick={() => setSelectedCategory(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostsCarousel
