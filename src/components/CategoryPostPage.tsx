import { GET_CATEGORIES } from '@/graphql/queries/getCategories'
import { GET_POST_BY_SLUG } from '@/graphql/queries/getPostBySlug'
import { GET_POSTS } from '@/graphql/queries/getPosts'
import type {
  TypesOfContentChooseCalculateLayout,
  TypesOfContentChooseProjectPicturesLayout,
} from '@/graphql/types/pageSettingsTypes'
import { getApolloClient } from '@/lib/apollo-client'
import Link from 'next/link'
import CategoryLinks from './categoryLinks/CategoryLinks'
import ProjectPicturesGrid from './projects/ProjectPicturesGrid'
import TextWithButton from './textWithButton/TextWithButton'

interface CategoryPostPageProps {
  category: string
  slug: string
}

export default async function CategoryPostPage({
  category,
  slug,
}: CategoryPostPageProps) {
  const apolloClient = getApolloClient()

  // Получаем данные поста
  const { data } = await apolloClient.query({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  })

  // Получаем все категории
  const { data: categoriesData } = await apolloClient.query({
    query: GET_CATEGORIES,
    variables: { categoryIds: null }, // null для получения всех категорий
  })

  // Получаем все посты для фильтрации категорий
  const { data: postsData } = await apolloClient.query({
    query: GET_POSTS,
    variables: { first: 1000 }, // Получаем много постов для полного списка категорий
  })

  const post = data?.postBy
  const categories =
    categoriesData?.categories?.edges?.map((edge: any) => edge.node) || []
  const posts = postsData?.posts?.edges?.map((edge: any) => edge.node) || []

  if (!post) {
    return <div>Пост не найден</div>
  }

  // Получаем имя и slug категории из поста, если доступно
  const categoryNode = post.categories?.edges[0]?.node
  const categoryName = categoryNode?.name || category
  const categorySlug = categoryNode?.slug || category

  // Получаем calculateBlock из typesOfContent
  const calculateBlock = post.typesOfContent?.choose?.find(
    (item: any) =>
      item.fieldGroupName === 'TypesOfContentChooseCalculateLayout',
  ) as TypesOfContentChooseCalculateLayout | undefined

  // Получаем блок с четырьмя картинками из typesOfContent
  const projectPicturesBlock = post.typesOfContent?.choose?.find(
    (item: any) =>
      item.fieldGroupName === 'TypesOfContentChooseProjectPicturesLayout',
  ) as TypesOfContentChooseProjectPicturesLayout | undefined

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

      <section className="ind mt-8">
        <div className="mr-[3vw] md:mr-[32vw]">
          <TextWithButton
            text={
              calculateBlock?.text || 'Заполните бриф на расчет Вашего проекта!'
            }
            btnText={calculateBlock?.btnText || 'Обсудить проект'}
          />
        </div>
      </section>

      <section className="ind mt-8">
        <CategoryLinks
          categories={categories}
          posts={posts}
          currentCategorySlug={categorySlug}
        />
      </section>
    </div>
  )
}
