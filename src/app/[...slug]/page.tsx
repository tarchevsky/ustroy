import { Metadata } from 'next'

import { renderPage } from './components/PageRenderer'
import { REVALIDATE_TIME } from './constants'
import { PageProps } from './types'
import { generatePageMetadata } from './utils/metadata'
import { generateStaticParams } from './utils/staticParams'

export const revalidate = REVALIDATE_TIME

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return generatePageMetadata({ slug: params.slug })
}

const DynamicPage = async ({ params }: PageProps) => {
  return renderPage({ slug: params.slug })
}

export default DynamicPage

// Генерация статических маршрутов
export { generateStaticParams }
