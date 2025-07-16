import Link from 'next/link'

interface BreadcrumbItem {
  name: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="cont text-sm text-gray-500 py-4" aria-label="breadcrumbs">
      {items.map((item, idx) =>
        item.href ? (
          <span key={item.name}>
            <Link href={item.href} className="hover:underline">
              {item.name}
            </Link>
            {idx < items.length - 1 && ' | '}
          </span>
        ) : (
          <span key={item.name} className="text-primary font-semibold">
            {item.name}
          </span>
        ),
      )}
    </nav>
  )
}
