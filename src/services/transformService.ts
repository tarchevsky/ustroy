import {
  CategoriesData,
  CategoryLinkProps,
} from '@/graphql/types/categoriesTypes'
import { CategoryData, CategoryPostProps } from '@/graphql/types/categoryTypes'
import { Content } from '@/graphql/types/pageTypes'
import { PostProps, PostsData } from '@/graphql/types/postTypes'

export function transformPosts(postsData: PostsData): PostProps[] {
  return (
    postsData?.posts.edges.map(({ node }) => {
      const mainCategory = node.categories?.edges[0]?.node
      return {
        ...node,
        path: mainCategory
          ? `/${mainCategory.slug}/${node.slug}`
          : `/posts/${node.slug}`,
      }
    }) || []
  )
}

export function transformCategoryPosts(
  categoryData: CategoryData['category'],
): CategoryPostProps[] {
  return (
    categoryData?.posts.edges.map(({ node }) => ({
      ...node,
      path: `/${categoryData.slug}/${node.slug}`,
    })) || []
  )
}

/**
 * Трансформация постов из категории, полученной по слагу
 */
export function transformCategoryBySlugPosts(
  categoryData: any,
): CategoryPostProps[] {
  if (!categoryData || !categoryData.posts || !categoryData.posts.edges) {
    return []
  }

  return categoryData.posts.edges.map(({ node }: any) => ({
    ...node,
    path: `/${categoryData.slug}/${node.slug}`,
  }))
}

export function transformPostsByCategories(
  categoryPostsData: any[],
): PostProps[] {
  return categoryPostsData.map(({ node }) => {
    const mainCategory = node.categories?.edges[0]?.node
    return {
      ...node,
      featuredImage: node.featuredImage
        ? {
            node: {
              link: node.featuredImage.node.sourceUrl,
              altText: node.featuredImage.node.altText || '',
            },
          }
        : undefined,
      path: mainCategory
        ? `/${mainCategory.slug}/${node.slug}`
        : `/posts/${node.slug}`,
    }
  })
}

export function transformCategories(
  categoriesData: CategoriesData['categories']['edges'],
): CategoryLinkProps[] {
  return categoriesData.map(({ node }) => ({
    ...node,
  }))
}

export function transformCompanies(
  companies?: Content['pagecontent']['companies'],
) {
  if (!companies) return []

  return companies.map((company) => ({
    id: company.name,
    src: company.src.node.link,
    alt: company.name,
    width: company.width,
    height: company.height,
  }))
}

export function transformCustomersFromPageSettings(
  repeater: Array<{
    fieldGroupName: string
    kartinka: { node: { altText: string; sourceUrl: string } }
  }>,
) {
  if (!repeater) return []
  return repeater.map((item, idx) => ({
    id: String(idx),
    src: item.kartinka.node.sourceUrl,
    alt: item.kartinka.node.altText || '',
    width: 141, // фиксированные размеры по макету
    height: 66, // фиксированные размеры по макету
  }))
}
