import { gql } from '@apollo/client'

export const GET_MENU_ITEMS = gql`
  query MenuSettings {
    menuItems {
      edges {
        node {
          id
          label
          uri
        }
      }
    }
  }
`
