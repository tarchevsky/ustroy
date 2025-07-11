export interface SiteSettingsVk {
  title: string
  url: string
  target: string
}

export interface SiteSettingsLogotipNode {
  altText: string
  sourceUrl: string
}

export interface SiteSettingsLogotip {
  node: SiteSettingsLogotipNode
}

export interface SiteSettingsGroup {
  email: string
  logotip: SiteSettingsLogotip
  siteName: string
  telefon: string
  telegram: string
  vk: SiteSettingsVk[]
  instagram?: string
}

export interface GlobalSiteSettings {
  siteSettingsGroup: SiteSettingsGroup
}

export interface SiteSettingsData {
  globalSiteSettings: GlobalSiteSettings
}
