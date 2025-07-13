import React from 'react'

interface ProjectGridProps {
  posts: Array<{
    slug: string
    title: string
    featuredImage?: { node?: { link?: string } }
    path?: string // Added path field
  }>
}

// Паттерн: 2-3-2-3
const pattern = [
  [
    { w: 450, h: 418 },
    { w: 738, h: 418 },
  ],
  [
    { w: 390, h: 418 },
    { w: 390, h: 418 },
    { w: 390, h: 418 },
  ],
  [
    { w: 738, h: 418 },
    { w: 450, h: 418 },
  ],
  [
    { w: 390, h: 418 },
    { w: 390, h: 418 },
    { w: 390, h: 418 },
  ],
]

// Функция для получения aspect-ratio
function getAspectRatio(w: number, h: number) {
  return w / h
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ posts }) => {
  // Мобильная сетка: по 2 в строке, gap 8px, высота 200px
  const mobileRows: React.ReactNode[] = []
  if (posts.length) {
    for (let i = 0; i < posts.length; i += 2) {
      mobileRows.push(
        <div key={i} className="flex gap-2 mb-2 md:hidden">
          {[0, 1].map((j) => {
            const post = posts[i + j]
            if (!post)
              return <div key={j} className="w-1/2" style={{ height: 200 }} />
            return (
              <a
                key={post.slug}
                href={
                  post.path
                    ? post.path.startsWith('/projects')
                      ? post.path
                      : `/projects${post.path}`
                    : `/projects/${post.slug}`
                }
                className="relative rounded-box overflow-hidden flex items-end bg-gray-200 w-1/2"
                style={{
                  aspectRatio: '1.5/1',
                  height: 200,
                  minWidth: 0,
                }}
              >
                {post.featuredImage?.node?.link && (
                  <img
                    src={post.featuredImage.node.link}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                )}
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background:
                      'linear-gradient(358deg, rgba(0,0,0,0.40) 23.98%, rgba(159,159,159,0.04) 98.03%)',
                  }}
                />
                <div
                  className="relative z-10 text-white font-semibold"
                  style={{
                    left: 8,
                    bottom: 8,
                    position: 'absolute',
                    fontFamily: 'Unbounded Variable, sans-serif',
                    fontSize: 'clamp(12px,4vw,14px)',
                  }}
                >
                  {post.title}
                </div>
              </a>
            )
          })}
        </div>,
      )
    }
  }
  // ... md+ сетка как раньше ...
  let postIdx = 0
  const rows: React.ReactNode[] = []
  while (postIdx < posts.length) {
    for (
      let rowIdx = 0;
      rowIdx < pattern.length && postIdx < posts.length;
      rowIdx++
    ) {
      const row = pattern[rowIdx]
      rows.push(
        <div key={rows.length} className="hidden md:flex gap-4 mb-4">
          {row.map((cell, cellIdx) => {
            const post = posts[postIdx]
            postIdx++
            if (!post) return <div key={cellIdx} className="flex-1" />
            return (
              <a
                key={post.slug}
                href={
                  post.path
                    ? post.path.startsWith('/projects')
                      ? post.path
                      : `/projects${post.path}`
                    : `/projects/${post.slug}`
                }
                className="relative rounded-box overflow-hidden flex items-end bg-gray-200 group"
                style={{
                  aspectRatio: `${cell.w} / ${cell.h}`,
                  width: `calc(${(cell.w / 1205) * 100}% - 8px)`,
                  minHeight: 120,
                  maxWidth: cell.w,
                }}
              >
                {post.featuredImage?.node?.link && (
                  <img
                    src={post.featuredImage.node.link}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background:
                      'linear-gradient(358deg, rgba(0,0,0,0.40) 23.98%, rgba(159,159,159,0.04) 98.03%)',
                  }}
                />
                <div
                  className="relative z-20 text-white font-semibold"
                  style={{
                    left: 32,
                    bottom: 32,
                    position: 'absolute',
                    fontFamily: 'Unbounded Variable, sans-serif',
                    fontSize: 'clamp(18px,2vw,28px)',
                  }}
                >
                  {post.title}
                </div>
              </a>
            )
          })}
        </div>,
      )
    }
  }
  return (
    <div className="w-full max-w-[1205px] mx-auto">
      {mobileRows}
      {rows}
    </div>
  )
}

export default ProjectGrid
