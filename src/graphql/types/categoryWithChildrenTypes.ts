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
}

export interface CategoryWithChildrenData {
  category: CategoryWithChildren
}
