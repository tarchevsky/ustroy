'use client'

import Burger from '@/components/burger/Burger'
import Logo from '@/components/logo/Logo'
import Socials from '@/components/socials/Socials'
import { MenuItemNode } from '@/graphql/types/menuTypes'
import cn from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import styles from './Header.module.scss'

interface HeaderProps {
  logoData?: { altText: string; sourceUrl: string } | null
  highlighting?: boolean
  telefon?: string
  telegram?: string
  email?: string
  instagram?: string
  vk?: { title: string; url: string; target: string }[]
  menuItems: MenuItemNode[]
}

const Header: FC<HeaderProps> = ({
  logoData,
  highlighting = false,
  telefon,
  telegram,
  email,
  instagram,
  vk,
  menuItems,
}) => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // const menuItems = [
  //   { path: '/', label: 'Главная' },
  //   { path: '/contacts', label: 'Контакты' },
  // ]

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive)
  }

  useEffect(() => {
    if (isMenuActive) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuActive])

  const pathname = usePathname()

  const handleMenuItemClick = (path: string) => {
    if (path === pathname) {
      setIsMenuActive(false)
    }
  }

  useEffect(() => {
    setIsMenuActive(false)
  }, [pathname])

  return (
    <header className="cont relative flex justify-between items-center">
      <div className="flex items-center gap-8">
        <Logo
          className="my-6 flex flex-col justify-center z-20 md:h-[84px] md:w-[84px]"
          type="file"
          logo={logoData?.sourceUrl}
          logoAlt={logoData?.altText}
          width={44}
          height={44}
        />
        <nav className={cn('hidden md:block')}>
          <ul className="flex gap-6">
            {menuItems.map((item, index) => (
              <li key={index} className={cn(styles.item, 'md:text-center')}>
                <Link
                  className={cn(
                    'font-medium text-lg md:text-xl p-0 hover:text-base-200',
                    {
                      'text-primary': highlighting && item.uri === pathname,
                    },
                  )}
                  href={item.uri}
                  onClick={() => handleMenuItemClick(item.uri)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* overlay для мобильного меню */}
      {isMenuActive && (
        <div
          className="fixed inset-0 bg-[#393939]/50 z-10 md:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
      {/* Мобильное меню */}
      <nav
        className={cn(
          { [styles.active]: isMenuActive },
          'fixed md:hidden z-20 w-1/2 h-full end-0 top-0 translate-x-full opacity-0 transition-all duration-300 ease-out',
          'rounded-tl-2xl rounded-bl-2xl',
        )}
      >
        <ul
          tabIndex={0}
          className="absolute p-0 flex-col flex-nowrap gap-5 top-24 left-4"
        >
          {menuItems.map((item, index) => (
            <li key={index} className={cn(styles.item, 'block')}>
              <Link
                className={cn('font-medium text-lg p-0 hover:text-base-200', {
                  'text-primary': highlighting && item.uri === pathname,
                })}
                href={item.uri}
                onClick={() => handleMenuItemClick(item.uri)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Кнопка и телефон внизу мобильного меню */}
        <div className="absolute bottom-6 left-0 w-full flex flex-col gap-2 px-4">
          <button className="btn btn-sm btn-block font-medium text-base-100 btn-primary hover:bg-base-100 hover:text-primary border-primary border-2 text-sm px-1 whitespace-nowrap">
            Обсудить проект
          </button>
          {telefon && (
            <a
              href={`tel:${telefon}`}
              className="flex items-center gap-1 font-medium hover:underline mt-2"
            >
              <img src="/phone.svg" alt="Телефон" width={20} height={20} />
              {telefon}
            </a>
          )}
          <div className="mt-2">
            <Socials
              telegram={telegram}
              email={email}
              vk={vk}
              instagram={instagram}
            />
          </div>
        </div>
      </nav>
      <div className="flex items-center gap-4 md:gap-6">
        <button className="hidden md:block btn font-medium text-base-100 btn-primary hover:bg-base-100 hover:text-primary border-primary border-2">
          Обсудить проект
        </button>
        {telefon && (
          <a
            href={`tel:${telefon}`}
            className="hidden md:inline-block text-lg font-medium hover:underline"
          >
            {telefon}
          </a>
        )}
        {telefon && (
          <Link
            href={`tel:${telefon}`}
            className="p-[5px] mt-2 mr-[47px] md:hidden"
          >
            <img src="/phone.svg" alt="Телефон" width={24} height={24} />
          </Link>
        )}
        <Burger toggleMenu={toggleMenu} isActive={isMenuActive} />
      </div>
    </header>
  )
}

export default Header
