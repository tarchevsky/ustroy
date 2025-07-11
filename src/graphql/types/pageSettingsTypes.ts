export interface TypesOfContentChooseHeroLayout {
  fieldGroupName: string
  header: string
  sub: string
  text1: string
  text2: string
}

export interface TypesOfContentChooseFeaturedProjectsLayout {
  fieldGroupName: string
  list: {
    nodes: Array<{
      id: string
      slug: string
      uri: string
    }>
  }
}

export interface TypesOfContentChooseGridCenterLayout {
  fieldGroupName: string
  heading: string
  img: {
    node: {
      altText: string
      sourceUrl: string
    }
  }
  imgMiniOne: {
    node: {
      altText: string
      sourceUrl: string
    }
  }
  imgMiniTwo: {
    node: {
      altText: string
      sourceUrl: string
    }
  }
  subtitle: string
}

export interface TypesOfContentChooseGridLeftToRightLayout {
  fieldGroupName: string
  heading: string
  img: {
    node: {
      altText: string
      sourceUrl: string
    }
  }
  subtitle: string
}

export interface TypesOfContentChooseGridRightToLeftLayout {
  fieldGroupName: string
  heading: string
  subtitle: string
  img: {
    node: {
      altText: string
      sourceUrl: string
    }
  }
}

export type TypesOfContentChooseGrid =
  | TypesOfContentChooseGridCenterLayout
  | TypesOfContentChooseGridLeftToRightLayout
  | TypesOfContentChooseGridRightToLeftLayout

export interface TypesOfContentChooseAboutLayout {
  fieldGroupName: string
  grid: TypesOfContentChooseGrid[]
}

export interface TypesOfContentChooseCustomersLayout {
  fieldGroupName: string
  repeater: Array<{
    fieldGroupName: string
    kartinka: {
      node: {
        altText: string
        uri: string
      }
    }
  }>
}

export type TypesOfContentChoose =
  | TypesOfContentChooseHeroLayout
  | TypesOfContentChooseFeaturedProjectsLayout
  | TypesOfContentChooseAboutLayout
  | TypesOfContentChooseCustomersLayout

export interface TypesOfContent {
  choose: TypesOfContentChoose[]
}

export interface PageSettingsData {
  page: {
    id: string
    slug: string
    title: string
    content: string
    seo?: {
      title: string
      metaDesc: string
    }
    typesOfContent: TypesOfContent
  }
}

// Новые типы для полной страницы
export interface PageData {
  id: string
  slug: string
  title: string
  content: string
  seo?: {
    title: string
    metaDesc: string
  }
  typesOfContent: TypesOfContent
}

export interface PageBySlugData {
  pageBy: PageData
}
