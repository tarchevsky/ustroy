import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { Metadata } from 'next'

import { TypesOfContentChooseHeroLayout } from '@/graphql/types/pageSettingsTypes'
import { getApolloClient } from '@/lib/apollo-client'
import { fetchHomePageData } from '@/services/pageService'
import { fetchPageSettings } from '@/services/pageSettingsService'

import AboutBlock from '@/components/aboutBlock/AboutBlock'
import Hero from '@/components/hero/Hero'
import {
  transformCategories,
  transformCategoryPosts,
  transformCompanies,
  transformPosts,
  transformPostsByCategories,
} from '@/services/transformService'

export const revalidate = 3600

// ID константы для страницы projects
const PROJECTS_PAGE_ID = 'cG9zdDoyMA==' // Замените на реальный ID страницы projects
const CATEGORY_ID = 'dGVybToz'
const FEATURE_CATEGORY_IDS = ['dGVybTo1', 'dGVybTo0']
const CATEGORY_IDS = ['dGVybTo1', 'dGVybTo0', 'dGVybToxMA==', 'dGVybTo5']

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Проекты',
    description: 'Наши проекты и работы',
  }
}

const ProjectsPage = async () => {
  const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient()

  // Получаем typesOfContent
  const typesOfContent = await fetchPageSettings(apolloClient, PROJECTS_PAGE_ID)

  const {
    page,
    pagecontent,
    posts: postsData,
    category: categoryData,
    categoryPosts: categoryPostsData,
    categories: categoriesData,
  } = await fetchHomePageData(
    apolloClient,
    PROJECTS_PAGE_ID,
    CATEGORY_ID,
    FEATURE_CATEGORY_IDS,
    CATEGORY_IDS,
  )

  const posts = transformPosts(postsData)
  const categoryPosts = transformCategoryPosts(categoryData)
  const postsByCategories = transformPostsByCategories(categoryPostsData)
  const categories = transformCategories(categoriesData)
  const companies = transformCompanies(pagecontent?.companies || [])

  const heroBlock = typesOfContent.choose.find(
    (item: any) => item.fieldGroupName === 'TypesOfContentChooseHeroLayout',
  ) as TypesOfContentChooseHeroLayout | undefined

  const aboutBlock = typesOfContent.choose.find(
    (item: any) => item.fieldGroupName === 'TypesOfContentChooseAboutLayout',
  )

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
      {aboutBlock && <AboutBlock block={aboutBlock} />}
    </div>
  )
}

export default ProjectsPage
