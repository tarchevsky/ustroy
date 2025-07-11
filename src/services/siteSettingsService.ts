import { GET_SITE_SETTINGS } from '@/graphql/queries/getSiteSettings'
import { SiteSettingsData } from '@/graphql/types/siteSettingsTypes'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export async function fetchSiteLogo(
  client: ApolloClient<NormalizedCacheObject>,
) {
  const { data } = await client.query<SiteSettingsData>({
    query: GET_SITE_SETTINGS,
  })
  return data.globalSiteSettings.siteSettingsGroup.logotip.node
}

export async function fetchSiteSettings(
  client: ApolloClient<NormalizedCacheObject>,
) {
  const { data } = await client.query<SiteSettingsData>({
    query: GET_SITE_SETTINGS,
  })
  return data.globalSiteSettings.siteSettingsGroup
}
