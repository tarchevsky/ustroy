import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { Metadata } from 'next'

import { TypesOfContentChooseHeroLayout } from '@/graphql/types/pageSettingsTypes'
import { getApolloClient } from '@/lib/apollo-client'
import { fetchSeoMetadata } from '@/lib/seo'
import { fetchHomePageData } from '@/services/pageService'
import { fetchPageSettings } from '@/services/pageSettingsService'

import AboutBlock from '@/components/aboutBlock/AboutBlock'
import Hero from '@/components/hero/Hero'
import PostsCarousel from '@/components/postsCarousel/PostsCarousel'
import TextWithButton from '@/components/textWithButton/TextWithButton'
import {
  transformCategories,
  transformCategoryPosts,
  transformCompanies,
  transformCustomersFromPageSettings,
  transformPosts,
  transformPostsByCategories,
} from '@/services/transformService'
import { Companies } from '@/ui/companies/Companies'

export const revalidate = 5 // Ревалидация каждый час (3600 секунд)

// ID константы
const PAGE_ID = 'cG9zdDoxNQ=='
const CATEGORY_ID = 'dGVybToz'
const FEATURE_CATEGORY_IDS = ['dGVybTo1', 'dGVybTo0']
const CATEGORY_IDS = ['dGVybTo1', 'dGVybTo0', 'dGVybToxMA==', 'dGVybTo5']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeoMetadata(PAGE_ID)

  return {
    title: seo.title,
    description: seo.description,
  }
}

const HomePage = async () => {
  const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient()

  // Получаем typesOfContent
  const typesOfContent = await fetchPageSettings(apolloClient, PAGE_ID)

  // Временный debug-вывод
  // eslint-disable-next-line react/display-name
  const TypesOfContentDebug = ({ data }: { data: any }) => (
    <pre
      style={{
        background: '#f5f5f5',
        padding: 16,
        marginBottom: 24,
        overflow: 'auto',
      }}
    >
      {JSON.stringify(data, null, 2)}
    </pre>
  )

  const {
    page,
    pagecontent,
    posts: postsData,
    category: categoryData,
    categoryPosts: categoryPostsData,
    categories: categoriesData,
  } = await fetchHomePageData(
    apolloClient,
    PAGE_ID,
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

  const customersBlock = typesOfContent.choose.find(
    (item: any) =>
      item.fieldGroupName === 'TypesOfContentChooseCustomersLayout',
  ) as
    | import('@/graphql/types/pageSettingsTypes').TypesOfContentChooseCustomersLayout
    | undefined

  const calculateBlock = typesOfContent.choose.find(
    (item: any) =>
      item.fieldGroupName === 'TypesOfContentChooseCalculateLayout',
  ) as
    | import('@/graphql/types/pageSettingsTypes').TypesOfContentChooseCalculateLayout
    | undefined

  return (
    <div>
      {/* <TypesOfContentDebug data={typesOfContent} /> */}
      {heroBlock && (
        <Hero
          title={heroBlock.header}
          subtitle={heroBlock.sub}
          text1={heroBlock.text1}
          text2={heroBlock.text2}
          buttonText="Обсудить проект"
        />
      )}
      {posts && posts.length > 0 && <PostsCarousel posts={posts} />}
      {aboutBlock && <AboutBlock block={aboutBlock} />}
      {customersBlock && (
        <section className="ind py-8 mt-8 overflow-x-hidden">
          <div className="cont">
            <h2 className="text-4xl font-bold mb-8 text-[#333]">
              НАШИ ЗАКАЗЧИКИ
            </h2>
            <Companies
              companies={transformCustomersFromPageSettings(
                customersBlock.repeater,
              )}
            />
          </div>
        </section>
      )}
      {calculateBlock && (
        <section className="ind mt-8">
          <div className="mr-[3vw] md:mr-[32vw]">
            <TextWithButton
              text={calculateBlock.text}
              btnText={calculateBlock.btnText}
            />
          </div>
        </section>
      )}
    </div>
  )
}

export default HomePage
