export interface ChildCategory {
  id: string
  name: string
  slug: string
  description: string
  count: number
}

export interface CategoryPost {
  id: string
  title: string
  slug: string
  excerpt: string
  date: string
  featuredImage?: {
    node: {
      link: string
      altText: string
    }
  }
}

export interface TypesOfContentChooseProjectCarouselLayout {
  fieldGroupName: 'TypesOfContentChooseProjectCarouselLayout'
  projectcarousel: boolean
}

export type TypesOfContentChoose = TypesOfContentChooseProjectCarouselLayout // можно расширить, если появятся другие блоки

export interface TypesOfContent {
  choose: TypesOfContentChoose[]
}

export interface CategoryWithChildren {
  id: string
  name: string
  slug: string
  description: string
  seo: {
    title: string
    metaDesc: string
  }
  children: {
    nodes: ChildCategory[]
  }
  posts: {
    edges: Array<{
      node: CategoryPost
    }>
  }
  typesOfContent?: TypesOfContent
}

export interface CategoryWithChildrenData {
  category: CategoryWithChildren
}
