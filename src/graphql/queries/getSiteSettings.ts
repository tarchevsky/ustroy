import { gql } from '@apollo/client'

export const GET_SITE_SETTINGS = gql`
  query SiteSettings {
    globalSiteSettings {
      siteSettingsGroup {
        email
        logotip {
          node {
            altText
            sourceUrl
          }
        }
        siteName
        telefon
        telegram
        vk {
          title
          url
          target
        }
        instagram
      }
    }
  }
`
