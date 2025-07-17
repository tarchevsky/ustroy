import { gql } from '@apollo/client'

export const GET_CATEGORY_WITH_CHILDREN = gql`
  query GetCategoryWithChildren($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      id
      name
      slug
      description
      seo {
        title
        metaDesc
      }
      children {
        nodes {
          id
          name
          slug
          description
          count
          ... on TypesOfContentChooseProjectCarouselLayout {
            fieldGroupName
            projectcarousel
          }
        }
      }
      posts {
        edges {
          node {
            id
            title
            slug
            excerpt
            date
            featuredImage {
              node {
                link
                altText
              }
            }
          }
        }
      }
    }
  }
`
