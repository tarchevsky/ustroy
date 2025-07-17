'use client'

import {
  TypesOfContentChooseAboutLayout,
  TypesOfContentChooseCalculateLayout,
  TypesOfContentChooseCustomersLayout,
} from '@/graphql/types/pageSettingsTypes'
import { transformCustomersFromPageSettings } from '@/services/transformService'
import { Companies } from '@/ui/companies/Companies'
import AboutBlock from '../aboutBlock/AboutBlock'
import TextWithButton from '../textWithButton/TextWithButton'

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
      {/* Рендерим компоненты в порядке добавления в WordPress */}
      {typesOfContent.choose.map((block, index) => {
        switch (block.fieldGroupName) {
          case 'TypesOfContentChooseCustomersLayout':
            return (
              <ConditionalCompanies
                key={index}
                block={block}
                pagecontent={pagecontent}
              />
            )
          case 'TypesOfContentChooseCalculateLayout':
            return <ConditionalTextWithButton key={index} block={block} />
          case 'TypesOfContentChooseAboutLayout':
            return <ConditionalAboutBlock key={index} block={block} />
          default:
            return null
        }
      })}

      {/* Проверяем pagecontent для Companies (если нет в typesOfContent) */}
      {!typesOfContent.choose.some(
        (block) =>
          block.fieldGroupName === 'TypesOfContentChooseCustomersLayout',
      ) &&
        pagecontent?.companies &&
        pagecontent.companies.length > 0 && (
          <ConditionalCompaniesFromPageContent pagecontent={pagecontent} />
        )}
    </>
  )
}

// Компонент для Companies из typesOfContent
const ConditionalCompanies = ({
  block,
  pagecontent,
}: {
  block: TypesOfContentChooseCustomersLayout
  pagecontent?: any
}) => {
  if (block?.repeater && block.repeater.length > 0) {
    return (
      <Companies
        companies={transformCustomersFromPageSettings(block.repeater)}
      />
    )
  }
  return null
}

// Компонент для Companies из pagecontent
const ConditionalCompaniesFromPageContent = ({
  pagecontent,
}: {
  pagecontent: any
}) => {
  if (pagecontent?.companies && pagecontent.companies.length > 0) {
    return <Companies companies={pagecontent.companies} />
  }
  return null
}

// Компонент для TextWithButton
const ConditionalTextWithButton = ({
  block,
}: {
  block: TypesOfContentChooseCalculateLayout
}) => {
  if (block) {
    return <TextWithButton text={block.text} btnText={block.btnText} />
  }
  return null
}

// Компонент для AboutBlock
const ConditionalAboutBlock = ({
  block,
}: {
  block: TypesOfContentChooseAboutLayout
}) => {
  if (
    block?.grid &&
    block.grid.some(
      (row) =>
        row &&
        typeof row.heading === 'string' &&
        typeof row.subtitle === 'string' &&
        row.img &&
        row.img.node &&
        typeof row.img.node.sourceUrl === 'string' &&
        row.img.node.sourceUrl.length > 0,
    )
  ) {
    return <AboutBlock block={block} />
  }
  return null
}
