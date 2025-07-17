import { gql } from '@apollo/client'

export const GET_POST_BY_SLUG = gql`
  query PostBySlug($slug: String!) {
    generalSettings {
      title
    }
    postBy(slug: $slug) {
      id
      date
      content
      title
      slug
      featuredImage {
        node {
          link
          altText
        }
      }
      seo {
        title
        metaDesc
      }
      typesOfContent {
        choose {
          fieldGroupName
          ... on TypesOfContentChooseCalculateLayout {
            text
            btnText
          }
          ... on TypesOfContentChooseProjectPicturesLayout {
            fieldGroupName
            img1 {
              node {
                altText
                sourceUrl
              }
            }
            img2 {
              node {
                altText
                sourceUrl
              }
            }
            img3 {
              node {
                altText
                sourceUrl
              }
            }
            img4 {
              node {
                altText
                sourceUrl
              }
            }
          }
          ... on TypesOfContentChooseCustomersLayout {
            fieldGroupName
            repeater {
              fieldGroupName
              kartinka {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
          ... on TypesOfContentChooseAboutLayout {
            fieldGroupName
            grid {
              ... on TypesOfContentChooseGridCenterLayout {
                fieldGroupName
                heading
                img {
                  node {
                    altText
                    sourceUrl
                  }
                }
                imgMiniOne {
                  node {
                    altText
                    sourceUrl
                  }
                }
                imgMiniTwo {
                  node {
                    altText
                    sourceUrl
                  }
                }
                subtitle
              }
              ... on TypesOfContentChooseGridLeftToRightLayout {
                fieldGroupName
                heading
                img {
                  node {
                    altText
                    sourceUrl
                  }
                }
                subtitle
              }
              ... on TypesOfContentChooseGridRightToLeftLayout {
                fieldGroupName
                heading
                subtitle
                img {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
            }
          }
          ... on TypesOfContentChooseProjectCarouselLayout {
            fieldGroupName
            projectcarousel
          }
        }
      }
      categories {
        edges {
          node {
            slug
            name
          }
        }
      }
    }
  }
`
