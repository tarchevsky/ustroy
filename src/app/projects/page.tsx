import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { Metadata } from 'next'

import { ChildCategoryNode } from '@/graphql/types/childCategoriesTypes'
import { TypesOfContentChooseHeroLayout } from '@/graphql/types/pageSettingsTypes'
import { getApolloClient } from '@/lib/apollo-client'
import {
  fetchChildCategories,
  fetchHomePageData,
  fetchPageById,
} from '@/services/pageService'
import { fetchPageSettings } from '@/services/pageSettingsService'
import {
  transformCategories,
  transformCategoryPosts,
  transformCompanies,
  transformPosts,
  transformPostsByCategories,
} from '@/services/transformService'

import ProjectPageClient from '@/components/projects/ProjectPageClient'

export const revalidate = 5

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

  // Получаем данные страницы
  const page = await fetchPageById(apolloClient, PROJECTS_PAGE_ID)

  // Получаем typesOfContent
  const typesOfContent = await fetchPageSettings(apolloClient, PROJECTS_PAGE_ID)

  const {
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

  const heroBlock = typesOfContent.choose?.find(
    (item: any) => item.fieldGroupName === 'TypesOfContentChooseHeroLayout',
  ) as TypesOfContentChooseHeroLayout | undefined

  const aboutBlock = typesOfContent.choose?.find(
    (item: any) => item.fieldGroupName === 'TypesOfContentChooseAboutLayout',
  )

  // Категории для фильтра
  const projectCategories = categories.filter((cat: any) => cat.count > 0)

  // Получаем slug основной категории ("Проекты")
  const mainCategorySlug = categoryData?.slug
  let childCategories: ChildCategoryNode[] = []
  if (mainCategorySlug) {
    childCategories = await fetchChildCategories(apolloClient, mainCategorySlug)
  }

  return (
    <>
      <ProjectPageClient
        heroBlock={heroBlock}
        aboutBlock={aboutBlock}
        posts={posts}
        companies={companies}
      />
    </>
  )
}

export default ProjectsPage
