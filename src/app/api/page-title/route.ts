import { getApolloClient } from '@/lib/apollo-client'
import { fetchPageById } from '@/services/pageService'
import { fetchPageBySlug } from '@/services/pagesService'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const pageId = searchParams.get('pageId')
  const slug = searchParams.get('slug')

  if (!pageId && !slug) {
    return NextResponse.json(
      { error: 'Page ID or slug is required' },
      { status: 400 },
    )
  }

  try {
    const apolloClient = getApolloClient()
    let page = null
    if (pageId) {
      page = await fetchPageById(apolloClient, pageId)
    } else if (slug) {
      page = await fetchPageBySlug(apolloClient, slug)
    }
    return NextResponse.json({
      id: page?.id || null,
      title: page?.title || null,
    })
  } catch (error) {
    console.error('Error fetching page title:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page title' },
      { status: 500 },
    )
  }
}
