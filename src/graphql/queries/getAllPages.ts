import { gql } from '@apollo/client'

export const GET_ALL_PAGES = gql`
  query GetAllPages {
    pages(first: 100, where: { status: PUBLISH }) {
      nodes {
        id
        slug
        uri
        title
        seo {
          title
          metaDesc
        }
      }
    }
  }
`
