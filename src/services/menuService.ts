import { GET_MENU_ITEMS } from '@/graphql/queries/getMenuItems'
import { MenuItemsData } from '@/graphql/types/menuTypes'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export async function fetchMenuItems(
  client: ApolloClient<NormalizedCacheObject>,
) {
  const { data } = await client.query<MenuItemsData>({
    query: GET_MENU_ITEMS,
  })
  return data.menuItems.edges.map(({ node }) => node)
}
