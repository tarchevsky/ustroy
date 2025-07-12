import { GET_POST_BY_SLUG } from '@/graphql/queries/getPostBySlug'
import { getApolloClient } from '@/lib/apollo-client'
import { formatDate } from '@/utils/formatDate'
import Link from 'next/link'

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

  const post = data?.postBy

  if (!post) {
    return <div>Пост не найден</div>
  }

  // Получаем имя и slug категории из поста, если доступно
  const categoryNode = post.categories?.edges[0]?.node
  const categoryName = categoryNode?.name || category
  const categorySlug = categoryNode?.slug || category

  // Хлебные крошки
  const breadcrumbs: Array<{ name: string; href?: string }> = [
    { name: 'Главная', href: '/' },
    { name: 'Проекты', href: '/projects' },
  ]
  if (categorySlug && categorySlug !== 'projects') {
    breadcrumbs.push({ name: categoryName, href: `/projects/${categorySlug}` })
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
          {post.featuredImage ? (
            <>
              <img
                src={post.featuredImage.node.link}
                alt={post.featuredImage.node.altText}
                className="h-[90svh] w-full object-cover brightness-50"
              />
              <div>
                <h1 className="text-3xl">{post.title}</h1>
                <div>
                  Дата: <span>{formatDate(post.date)}</span>
                </div>
                <div>
                  Рубрика: <Link href={`/${category}`}>{categoryName}</Link>
                </div>
              </div>
              <Link href={`/${category}`}>
                &lt; Назад к категории {categoryName}
              </Link>
            </>
          ) : (
            <>
              <div className="flex flex-col">
                <h1 className="text-3xl">{post.title}</h1>
                <div>
                  Дата: <span>{formatDate(post.date)}</span>
                </div>
                <div>
                  Рубрика: <Link href={`/${category}`}>{categoryName}</Link>
                </div>
              </div>
              <Link href={`/${category}`}>
                &lt; Назад к категории {categoryName}
              </Link>
            </>
          )}
        </main>
      </div>
      <div className="px-[16px]">
        <section className="prose m-auto">
          <div
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </section>
      </div>
    </div>
  )
}
