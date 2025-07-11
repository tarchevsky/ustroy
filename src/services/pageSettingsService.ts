import { GET_PAGE_SETTINGS } from '@/graphql/queries/getPageSettings'
import { PageSettingsData } from '@/graphql/types/pageSettingsTypes'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export async function fetchPageSettings(
  client: ApolloClient<NormalizedCacheObject>,
  pageId: string,
) {
  const { data } = await client.query<PageSettingsData>({
    query: GET_PAGE_SETTINGS,
    variables: { id: pageId },
  })
  return data.page.typesOfContent
}
