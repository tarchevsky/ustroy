'use client'

import { useEffect, useState } from 'react'

interface PageTitleProps {
  pageId: string
  className?: string
  fallback?: string
}

export default function PageTitle({
  pageId,
  className = '',
  fallback,
}: PageTitleProps) {
  const [title, setTitle] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPageTitle = async () => {
      try {
        const response = await fetch(
          `/api/page-title?pageId=${encodeURIComponent(pageId)}`,
        )
        if (response.ok) {
          const data = await response.json()
          setTitle(data.title)
        }
      } catch (error) {
        console.error('Error fetching page title:', error)
      } finally {
        setLoading(false)
      }
    }

    if (pageId) {
      fetchPageTitle()
    }
  }, [pageId])

  if (loading) {
    return null
  }

  const displayTitle = title || fallback

  if (!displayTitle) {
    return null
  }

  return (
    <div className={`mb-6 ${className}`}>
      <h1
        className="font-medium break-words"
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.375rem)', // от 24px до 38px на мобильных
          lineHeight: '1.1',
        }}
      >
        {displayTitle}
      </h1>
    </div>
  )
}
