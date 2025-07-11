import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Metrika from '@/components/metrika/Metrika'
import ScrollToTop from '@/components/scrollToTop/ScrollToTop'
import { SITE_NAME } from '@/constants/site.constants'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'
// Supports weights 100-900
import { fetchHeaderLogo } from '@/components/header/fetchHeaderLogo'
import { getApolloClient } from '@/lib/apollo-client'
import { fetchMenuItems } from '@/services/menuService'
import { fetchSiteSettings } from '@/services/siteSettingsService'
// Шрифт заголовков
import '@fontsource-variable/unbounded'
// Шрифт текста
import '@fontsource-variable/commissioner'

const yId = process.env.NEXT_PUBLIC_YID // id яндекс метрики

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s`,
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const logoData = await fetchHeaderLogo()
  const apolloClient = getApolloClient()
  const siteSettings = await fetchSiteSettings(apolloClient)
  const menuItems = await fetchMenuItems(apolloClient)
  return (
    <html lang="ru">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body>
        <Header
          logoData={logoData}
          highlighting={true}
          telefon={siteSettings.telefon}
          telegram={siteSettings.telegram}
          email={siteSettings.email}
          vk={siteSettings.vk}
          instagram={siteSettings.instagram}
          menuItems={menuItems}
        />
        {children}
        <ScrollToTop />
        <Footer
          logoData={logoData}
          vk={siteSettings.vk}
          telegram={siteSettings.telegram}
          instagram={siteSettings.instagram}
          telefon={siteSettings.telefon}
          email={siteSettings.email}
        />
        {yId ? <Metrika yId={yId} /> : null}
      </body>
    </html>
  )
}
