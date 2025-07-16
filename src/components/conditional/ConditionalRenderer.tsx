'use client'

import { TypesOfContentChooseCustomersLayout } from '@/graphql/types/pageSettingsTypes'
import { transformCustomersFromPageSettings } from '@/services/transformService'
import { Companies } from '@/ui/companies/Companies'

interface ConditionalRendererProps {
  typesOfContent?: {
    choose?: any[]
  }
  pagecontent?: {
    companies?: any[]
  }
}

export const ConditionalRenderer = ({
  typesOfContent,
  pagecontent,
}: ConditionalRendererProps) => {
  if (!typesOfContent?.choose) return null

  return (
    <>
      {/* Companies блок */}
      <ConditionalCompanies
        typesOfContent={typesOfContent}
        pagecontent={pagecontent}
      />

      {/* Здесь можно добавить другие условные блоки */}
      {/* <ConditionalHero typesOfContent={typesOfContent} /> */}
      {/* <ConditionalAbout typesOfContent={typesOfContent} /> */}
      {/* <ConditionalCalculate typesOfContent={typesOfContent} /> */}
    </>
  )
}

// Компонент для Companies
const ConditionalCompanies = ({
  typesOfContent,
  pagecontent,
}: ConditionalRendererProps) => {
  // Проверяем наличие блока customers в typesOfContent
  const customersBlock = typesOfContent?.choose?.find(
    (item: any) =>
      item.fieldGroupName === 'TypesOfContentChooseCustomersLayout',
  ) as TypesOfContentChooseCustomersLayout | undefined

  // Проверяем наличие companies в pagecontent
  const companiesFromPageContent = pagecontent?.companies

  // Если есть данные из typesOfContent, используем их
  if (customersBlock?.repeater && customersBlock.repeater.length > 0) {
    return (
      <Companies
        companies={transformCustomersFromPageSettings(customersBlock.repeater)}
      />
    )
  }

  // Если есть данные из pagecontent, используем их
  if (companiesFromPageContent && companiesFromPageContent.length > 0) {
    return <Companies companies={companiesFromPageContent} />
  }

  // Если данных нет, не рендерим компонент
  return null
}
