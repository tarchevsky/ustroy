'use client'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CategoryLinks from './categoryLinks/CategoryLinks'
import { ConditionalRenderer } from './conditional/ConditionalRenderer'
import { useCategoryPostData } from './hooks/useCategoryPostData'
import ProjectPicturesGrid from './projects/ProjectPicturesGrid'
import { Breadcrumbs } from './ui/Breadcrumbs'

interface CategoryPostPageClientProps {
  initialData: {
    post: any
    categories: any[]
    posts: any[]
  }
  category: string
  slug: string
}

export default function CategoryPostPageClient({
  initialData,
  category,
  slug,
}: CategoryPostPageClientProps) {
  const { data, loading } = useCategoryPostData({ initialData, category, slug })
  const { post, categories, posts } = data

  if (loading && !post) return <div>Загрузка...</div>
  if (!post) return notFound()

  // Получаем имя и slug категории из поста, если доступно
  const categoryNode = post.categories?.edges[0]?.node
  const categoryName = categoryNode?.name || category
  const categorySlug = categoryNode?.slug || category

  // Получаем блок с четырьмя картинками из typesOfContent
  const projectPicturesBlock = post.typesOfContent?.choose?.find(
    (item: any) =>
      item.fieldGroupName === 'TypesOfContentChooseProjectPicturesLayout',
  )

  // Хлебные крошки
  const breadcrumbs: Array<{ name: string; href?: string }> = [
    { name: 'Главная', href: '/' },
    { name: 'Проекты', href: '/projects' },
  ]
  if (categorySlug && categorySlug !== 'projects') {
    breadcrumbs.push({ name: categoryName, href: `/${categorySlug}` })
  }
  breadcrumbs.push({ name: post.title })

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      <div className="cont mb-8">
        <main>
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
              <h1 className="text-3xl">{post.title}</h1>
              <Link
                href={`/${category}`}
                className="btn btn-primary text-white border-2 hover:bg-white hover:text-primary text-xl font-normal btn-wide"
              >
                {categoryName}
              </Link>
            </div>
            <div>
              <span>({new Date(post.date).getFullYear()})</span>
            </div>
          </div>
        </main>
      </div>

      {/* Универсальный рендерер для условных блоков */}
      <ConditionalRenderer
        typesOfContent={post.typesOfContent}
        pagecontent={undefined}
      />

      <div className="cont px-[16px]">
        <section className="prose max-w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </section>
        {projectPicturesBlock && (
          <ProjectPicturesGrid
            img1={projectPicturesBlock.img1}
            img2={projectPicturesBlock.img2}
            img3={projectPicturesBlock.img3}
            img4={projectPicturesBlock.img4}
          />
        )}
      </div>

      <section className="ind">
        <CategoryLinks
          categories={categories}
          posts={posts}
          currentCategorySlug={categorySlug}
        />
      </section>
    </div>
  )
}
