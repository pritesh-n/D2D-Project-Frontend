import { getGalleries } from "../helpers/api";
import Head from "next/head";
import map from "lodash/map";
import Hero from "../components/sections/Hero";
import SmallCard from "../components/cards/SmallCard";
import RoundCard from "../components/cards/RoundCard";
import Section from "../components/sections/Section";

const Home = ({ data }) => {
  const articles = [...data];
  return (
    <>
      <Head>
        <link href={`../static/css/home.css`} rel="stylesheet" />
      </Head>
      <Section title="Top Picks" classes="hero__section">
        <Hero results={articles.splice(0, 5)} />
      </Section>
      <Section title="Trending Articles" classes="trending__section container">
        {map(articles.splice(0, 4), (article) => {
          return <SmallCard article={article} key={article.slug} />;
        })}
      </Section>
      <Section title="Latest Posts" classes="latest__section container">
        {map(articles.splice(0, 4), (article) => {
          return <RoundCard article={article} key={article.slug} />;
        })}
      </Section>
      <Section title="Popular Posts" classes="popular__section container">
        {map(articles.splice(0, 6), (article) => {
          return <SmallCard article={article} key={article.slug} />;
        })}
        {map(articles.splice(0, 4), (article) => {
          return <RoundCard article={article} key={article.slug} hideImage />;
        })}
      </Section>
    </>
  );
};

export async function getStaticProps({ query }) {
  const data = await getGalleries({
    params: {
      limit: 30,
      meta_info: true,
    },
  });
  return {
    props: { data: data },
  };
}

export default Home;
