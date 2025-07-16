import { GET_CATEGORIES } from '@/graphql/queries/getCategories'
import { GET_POST_BY_SLUG } from '@/graphql/queries/getPostBySlug'
import { GET_POSTS } from '@/graphql/queries/getPosts'
import { getApolloClient } from '@/lib/apollo-client'
import { useEffect, useState } from 'react'

interface UseCategoryPostDataProps {
  initialData: {
    post: any
    categories: any[]
    posts: any[]
  }
  category: string
  slug: string
}

export function useCategoryPostData({
  initialData,
  category,
  slug,
}: UseCategoryPostDataProps) {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialData.post && initialData.post.slug === slug) return
    let cancelled = false
    async function fetchData() {
      setLoading(true)
      try {
        const apolloClient = getApolloClient()
        const { data: postData } = await apolloClient.query({
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
        if (!cancelled) {
          setData({
            post: postData?.postBy || null,
            categories:
              categoriesData?.categories?.edges?.map(
                (edge: any) => edge.node,
              ) || [],
            posts: postsData?.posts?.edges?.map((edge: any) => edge.node) || [],
          })
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchData()
    return () => {
      cancelled = true
    }
  }, [slug, category])

  return { data, loading }
}
