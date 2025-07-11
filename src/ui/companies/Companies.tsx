'use client'

import FadeIn from '@/components/fadeIn/FadeIn'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { CompaniesProps } from './types'

export const Companies = ({ companies }: CompaniesProps) => {
  // Делим компании на два ряда
  const half = Math.ceil(companies.length / 2)
  const topRow = companies.slice(0, half)
  const bottomRow = companies.slice(half)

  // refs для анимации
  const topRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) return // только desktop
      const scrollY = window.scrollY
      // ширина контейнера (берём ширину родителя)
      const container = topRef.current?.parentElement
      const contWidth = container ? container.offsetWidth : window.innerWidth
      if (topRef.current) {
        // первая строка: немного заходит за правый край (например, на 10% ширины контейнера)
        const initial = contWidth * 0.1 // 10% вправо
        topRef.current.style.transform = `translateX(${-scrollY * 0.15 + initial}px)`
      }
      if (bottomRef.current) {
        // вторая строка: немного заходит за левый край (на 10% влево)
        const initial = -contWidth * 0.1 // 10% влево
        bottomRef.current.style.transform = `translateX(${scrollY * 0.15 + initial}px)`
      }
    }
    handleScroll() // выставить стартовое положение
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <FadeIn className=" flex flex-col gap-6">
      <div
        ref={topRef}
        className="cont-right flex gap-6 items-center overflow-auto justify-end pl-[var(--container-padding,theme(spacing.4))]"
        style={{ transition: 'transform 0.2s linear' }}
      >
        {topRow.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-box flex items-center justify-center"
            style={{ width: 205, height: 129 }}
          >
            <Image
              src={company.src}
              alt={company.alt}
              width={141}
              height={66}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        ))}
      </div>
      <div
        ref={bottomRef}
        className="cont-left flex gap-6 items-center overflow-auto justify-start pr-[var(--container-padding,theme(spacing.4))]"
        style={{ transition: 'transform 0.2s linear' }}
      >
        {bottomRow.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-box flex items-center justify-center"
            style={{ width: 205, height: 129 }}
          >
            <Image
              src={company.src}
              alt={company.alt}
              width={141}
              height={66}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        ))}
      </div>
    </FadeIn>
  )
}
