import { getApolloClient } from '@/lib/apollo-client'
import { fetchSiteLogo } from '@/services/siteSettingsService'

export async function fetchHeaderLogo() {
  const apolloClient = getApolloClient()
  const result = await fetchSiteLogo(apolloClient)
  return result // { altText, sourceUrl }
}
