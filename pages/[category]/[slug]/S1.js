import { useEffect } from "react";
import { getGallery, getGalleries } from "../../../helpers/api";
import map from "lodash/map";
import { scrollAbsoluteEds } from "../../../helpers/utility";
import LazyLoad from "react-lazyload";
import Section from "../../../components/sections/Section";
import PostCard from "../../../components/cards/PostCard";
import SmallCard from "../../../components/cards/SmallCard";
import RoundCard from "../../../components/cards/RoundCard";
import { DFPSlotsProvider, AdSlot, DFPManager } from "react-dfp";

const S1 = ({ data, others }) => {
  let others_articles = [...others];

  useEffect(() => {
    scrollAbsoluteEds(".eds_container");
  }, []);

  return (
    <DFPSlotsProvider
      dfpNetworkId="45361917"
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
      {/* <LazyLoad
        height={250}
        offset={50}
        throttle={2000}
        placeholder={
          <div
            className="eds_abs_wrp"
            style={{ width: 300, height: 250 }}
          ></div>
        }
        children={absEd}
      /> */}
      {/* <LazyLoad
        height={250}
        offset={50}
        throttle={2000}
        placeholder={
          <div
            className="eds_abs_wrp"
            style={{ width: 300, height: 250 }}
          ></div>
        }
        children={absEd}
      /> */}
      <Section classes="container post__container">
        <div
          className="eds_abs_wrp"
          id="container_0"
          style={{ width: 300, height: 250 }}
        ></div>
        {map(data.posts, (article, index) => {
          return (
            <React.Fragment key={index}>
              <PostCard
                title={article.title}
                credit={article.image_credit}
                image_url={article.image_url}
                desc={article.content}
              />
              <div
                className="eds_abs_wrp"
                id={`container_${index + 1}`}
                style={{ width: 300, height: 250 }}
              ></div>
            </React.Fragment>
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
      <div className="eds_container">
        <AdSlot adUnit={`FAQs_Q1_300x250_rt`} sizes={[[300, 250]]} />
      </div>
      <div className="eds_container">
        <AdSlot adUnit={`FAQs_Q5_300x250_rt`} sizes={[[300, 250]]} />
      </div>
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
