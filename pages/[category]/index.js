import Head from "next/head";
import { getGalleries, getSlugs } from "../../helpers/api";
import map from "lodash/map";
import ListCard from "../../components/cards/ListCard";
import RoundCard from "../../components/cards/RoundCard";
import Section from "../../components/sections/Section";

const Category = ({ data, others, category }) => {
  let other_articles = [...others];
  return (
    <>
      <Head>
        <link href={`/static/css/category.css`} rel="stylesheet" />
      </Head>
      <div className="container">
        <div className="left__wrapper">
          <Section
            title={`Results for '${category.replace(/-/g, " ")}'`}
            classes="results__section"
          >
            {map(data, (article) => {
              return <ListCard article={article} key={article.slug} />;
            })}
          </Section>
        </div>
        <div className="right__wrapper">
          <Section title="Editor's Pick" classes="latest__section">
            {map(other_articles.splice(0, 4), (article) => {
              return <RoundCard article={article} key={article.slug} />;
            })}
          </Section>
          <Section title="Trending Posts" classes="latest__section">
            {map(other_articles.splice(0, 3), (article) => {
              return (
                <RoundCard article={article} key={article.slug} hideImage />
              );
            })}
          </Section>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const categories = await getSlugs();
  const pathsParams = map(categories, (category) => {
    return {
      params: {
        category: category.category_slug,
      },
    };
  });
  return {
    paths: [...pathsParams],
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const data = await getGalleries({
    params: {
      meta_info: true,
      filter: {
        category_slug: params.category,
      },
    },
  });
  const others = await getGalleries({
    params: {
      limit: 7,
      meta_info: true,
    },
  });
  return {
    props: { data: data, others: others, category: params.category }, // will be passed to the page component as props
  };
}

export default Category;
