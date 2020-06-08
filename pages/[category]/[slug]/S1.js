import { getGallery, getGalleries } from "../../../helpers/api";
import map from "lodash/map";
import LazyLoad from "react-lazyload";
import Section from "../../../components/sections/Section";
import PostCard from "../../../components/cards/PostCard";
import SmallCard from "../../../components/cards/SmallCard";
import RoundCard from "../../../components/cards/RoundCard";
import { DFPSlotsProvider, AdSlot } from "react-dfp";

const S1 = ({ data, others }) => {
  let others_articles = [...others];
  return (
    <DFPSlotsProvider
      dfpNetworkId="45361917"
      lazyLoad
      singleRequest={false}
      sizeMapping={[
        {
          viewport: [1024, 768],
          sizes: [[728, 90]],
        },
        {
          viewport: [900, 768],
          sizes: [[300, 250]],
        },
      ]}
    >
      <Section classes="container">
        <PostCard
          title={data.title}
          credit={data.image_credits}
          image_url={data.image_url}
          desc={data.desc}
          key={data.slug}
        />
      </Section>
      <LazyLoad once height={250} offset={50}>
        <div className="eds_abs_wrp">
          <AdSlot adUnit={`FAQs_Q1_300x250_rt`} sizes={[[300, 250]]} />
        </div>
      </LazyLoad>
      <Section classes="container post__container">
        {map(data.posts, (article, index) => {
          return (
            <PostCard
              title={article.title}
              credit={article.image_credit}
              image_url={article.image_url}
              desc={article.content}
              key={index}
            />
          );
        })}
      </Section>
      <Section title="Trending Now" classes="trending__section container">
        {map(others_articles.splice(0, 6), (article) => {
          return <SmallCard article={article} key={article.slug} />;
        })}
      </Section>
      <Section title="Editor's Pick" classes="latest__section container">
        {map(others_articles.splice(0, 4), (article) => {
          return <RoundCard article={article} key={article.slug} />;
        })}
        {map(others_articles.splice(0, 3), (article) => {
          return <RoundCard article={article} key={article.slug} hideImage />;
        })}
      </Section>
    </DFPSlotsProvider>
  );
};

export async function getServerSideProps({ query }) {
  const data = await getGallery(query.slug);
  const others = await getGalleries({
    params: {
      limit: 13,
      meta_info: true,
    },
  });
  return {
    props: { data: data, others: others },
  };
}

export default S1;
