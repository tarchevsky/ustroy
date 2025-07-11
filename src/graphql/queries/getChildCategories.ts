import { gql } from '@apollo/client'

export const GET_CHILD_CATEGORIES = gql`
  query GetChildCategories($parentSlug: String!) {
    categories(where: { parent: $parentSlug }) {
      nodes {
        id
        name
        slug
        description
        count
        uri
      }
    }
  }
`
