export interface ChildCategoryNode {
  id: string
  name: string
  slug: string
  description: string
  count: number
  uri: string
}

export interface ChildCategoriesData {
  categories: {
    nodes: ChildCategoryNode[]
  }
}
