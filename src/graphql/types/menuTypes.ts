export interface MenuItemNode {
  id: string
  label: string
  uri: string
}

export interface MenuItemsData {
  menuItems: {
    edges: Array<{
      node: MenuItemNode
    }>
  }
}
