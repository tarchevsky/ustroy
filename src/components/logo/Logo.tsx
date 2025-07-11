'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  width?: number
  height?: number
  className?: string
  href?: string
  type?: 'file' | 'text'
  logo?: string

  logoAlt?: string
}

const Logo = ({
  width = 150,
  height = 150,
  className = '',
  href = '/',
  type = 'text',
  logo = 'logo',

  logoAlt = 'Логотип компании',
}: LogoProps) => {
  // Удалены состояния и функции, связанные с темой

  return (
    <Link href={href}>
      {type === 'text' ? (
        <div
          {...(className ? { className } : {})}
          dangerouslySetInnerHTML={{ __html: logo }}
        />
      ) : logo && (logo.startsWith('/') || logo.startsWith('http')) ? (
        <Image
          src={logo}
          alt={logoAlt}
          width={width}
          height={height}
          priority
          {...(className ? { className } : {})}
        />
      ) : null}
    </Link>
  )
}

export default Logo
