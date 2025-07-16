import { GET_CATEGORIES } from '@/graphql/queries/getCategories'
import { GET_POST_BY_SLUG } from '@/graphql/queries/getPostBySlug'
import { GET_POSTS } from '@/graphql/queries/getPosts'
import { getApolloClient } from '@/lib/apollo-client'
import CategoryPostPageClient from './CategoryPostPageClient'

interface CategoryPostPageProps {
  category: string
  slug: string
}

export default async function CategoryPostPage({
  category,
  slug,
}: CategoryPostPageProps) {
  const apolloClient = getApolloClient()

  // SSR: получаем данные для initialData
  const { data } = await apolloClient.query({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  })
  const { data: categoriesData } = await apolloClient.query({
    query: GET_CATEGORIES,
    variables: { categoryIds: null },
  })
  const { data: postsData } = await apolloClient.query({
    query: GET_POSTS,
    variables: { first: 1000 },
  })

  const initialData = {
    post: data?.postBy || null,
    categories:
      categoriesData?.categories?.edges?.map((edge: any) => edge.node) || [],
    posts: postsData?.posts?.edges?.map((edge: any) => edge.node) || [],
  }

  return (
    <CategoryPostPageClient
      initialData={initialData}
      category={category}
      slug={slug}
    />
  )
}
