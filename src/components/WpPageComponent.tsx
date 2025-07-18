import AboutBlock from '@/components/aboutBlock/AboutBlock'
import ChildCategoriesBlock from '@/components/ChildCategoriesBlock'
import ContentBlock from '@/components/contentBlock/ContentBlock'
import FadeIn from '@/components/fadeIn/FadeIn'
import Hero from '@/components/hero/Hero'
import PageTitle from '@/components/PageTitle'
import { TypesOfContentChooseHeroLayout } from '@/graphql/types/pageSettingsTypes'
import { getApolloClient } from '@/lib/apollo-client'
import { fetchChildCategories } from '@/services/pageService'
import { ConditionalRenderer } from './conditional/ConditionalRenderer'

interface WpPageComponentProps {
  pageData: any
}

export default async function WpPageComponent({
  pageData,
}: WpPageComponentProps) {
  const typesOfContent = pageData.typesOfContent

  const heroBlock = typesOfContent?.choose?.find(
    (item: any) => item.fieldGroupName === 'TypesOfContentChooseHeroLayout',
  ) as TypesOfContentChooseHeroLayout | undefined

  const aboutBlock = typesOfContent?.choose?.find(
    (item: any) => item.fieldGroupName === 'TypesOfContentChooseAboutLayout',
  )

  // Получаем дочерние категории для страницы projects
  let childCategories: any[] = []
  if (pageData.slug === 'projects') {
    const apolloClient = getApolloClient()
    childCategories = await fetchChildCategories(apolloClient, 'projects')
  }

  return (
    <div>
      {heroBlock && (
        <Hero
          title={heroBlock.header}
          subtitle={heroBlock.sub}
          text1={heroBlock.text1}
          text2={heroBlock.text2}
          buttonText="Обсудить проект"
        />
      )}

      {/* Заголовок страницы под header */}
      <div className="cont">
        <PageTitle pageId={pageData.id} fallback={pageData.title} />
      </div>

      {aboutBlock && <AboutBlock block={aboutBlock} />}

      {/* Универсальный рендерер для условных блоков */}
      <ConditionalRenderer
        typesOfContent={typesOfContent}
        pagecontent={pageData.pagecontent}
        posts={pageData.posts}
      />

      {/* Дочерние категории для страницы projects */}
      {pageData.slug === 'projects' && childCategories.length > 0 && (
        <ChildCategoriesBlock
          categories={childCategories}
          parentSlug="projects"
        />
      )}

      {/* Стандартный контент из WordPress */}
      {pageData.content && (
        <FadeIn>
          <ContentBlock content={pageData.content} />
        </FadeIn>
      )}

      {/* Обработка других типов блоков */}
      {typesOfContent?.choose?.map((block: any, index: number) => {
        if (
          block.fieldGroupName === 'TypesOfContentChooseHeroLayout' ||
          block.fieldGroupName === 'TypesOfContentChooseAboutLayout' ||
          block.fieldGroupName === 'TypesOfContentChooseCustomersLayout'
        ) {
          return null // Эти блоки уже обработаны выше
        }

        return (
          <FadeIn key={index} className="cont">
            <div>
              {/* Здесь можно добавить рендеринг других типов блоков */}
              <p>Блок: {block.fieldGroupName}</p>
            </div>
          </FadeIn>
        )
      })}
    </div>
  )
}
