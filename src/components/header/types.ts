import { MenuItemNode } from '@/graphql/types/menuTypes'

export interface HeaderProps {
  logoData?: { altText: string; sourceUrl: string } | null
  highlighting?: boolean
  telefon?: string
  telegram?: string
  email?: string
  instagram?: string
  vk?: { title: string; url: string; target: string }[]
  menuItems: MenuItemNode[]
  sticky?: boolean
}

export interface MobileMenuProps {
  isActive: boolean
  menuItems: MenuItemNode[]
  highlighting: boolean
  pathname: string
  handleMenuItemClick: (path: string) => void
  telefon?: string
  telegram?: string
  email?: string
  instagram?: string
  vk?: { title: string; url: string; target: string }[]
  sticky?: boolean
}
