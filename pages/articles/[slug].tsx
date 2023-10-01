import Image from "next/image"
import React from "react"
import Layout from "../../components/Layout"
import ArticleMeta from "@/components/ArticleMeta"
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next"
import { ArticleProps, Params } from "@/types/types"
import { sampleCards } from "@/utils/sample"
import { fetchBlocksByPageId, fetchPages } from "@/utils/notion"
import { getText } from "@/utils/property"

export const getStaticPaths: GetStaticPaths =async () => {
  const { results } = await fetchPages({})
  const paths = results.map((page: any) => {
    return {
      params: {
        slug: getText(page.properties.slug.rich_text)
      }
    }
  })
  return {
    paths: paths,
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params

  const { results } = await fetchPages({ slug: slug })
  const page = results[0]
  const pageId = page.id
  const { results: blocks } = await fetchBlocksByPageId(pageId)

  return {
    props: {
      page: page,
      blocks
    },
    revalidate: 10,
  }
}
 
const Article: NextPage<ArticleProps> = ({ page, blocks }) => {
  console.log("page", page)
  console.log("blocks", blocks)
  return <></>
  return (
    <Layout>
      <article className="w-full">
        {/* meta section */}
        <div className="my-12">
          <ArticleMeta page={page}/>
        </div>
 
        {/* article */}
        <div className="my-12">article {page.content}</div>
      </article>
    </Layout>
  );
};
 
export default Article;
 
