import { useEffect } from "react";
import { useContext } from "react";
import AppContext from "../../../helpers/AppContext";
import Head from "next/head";
import { getGallery, getGalleries, getSlugs } from "../../../helpers/api";
import map from "lodash/map";
import { scrollAbsoluteEds, checkEdRefresh } from "../../../helpers/utility";
import LazyLoad from "react-lazyload";
import Section from "../../../components/sections/Section";
import PostCard from "../../../components/cards/PostCard";
import SmallCard from "../../../components/cards/SmallCard";
import RoundCard from "../../../components/cards/RoundCard";
import { DFPSlotsProvider, AdSlot } from "react-dfp";

const S1 = ({ data, others }) => {
  let others_articles = [...others];
  const { viewport_width } = useContext(AppContext);
  const incontent_edx_size =
    viewport_width < 1024
      ? { width: 300, height: 250 }
      : { width: 728, height: 90 };

  useEffect(() => {
    scrollAbsoluteEds(".eds_container");
  }, []);

  return (
    <>
      <Head>
        <link href={`/static/css/s1.css`} rel="stylesheet" />
      </Head>
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
        <div className="container">
          <div className="left__wrapper">
            <Section>
              <PostCard
                title={data.title}
                credit={data.image_credits}
                image_url={data.image_url}
                desc={data.desc}
                key={data.slug}
              />
            </Section>
            <Section classes="post__container">
              <div
                className="eds_abs_wrp"
                id="container_0"
                style={incontent_edx_size}
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
                      style={incontent_edx_size}
                    ></div>
                  </React.Fragment>
                );
              })}
            </Section>
            <Section title="Trending Now" classes="trending__section">
              {map(others_articles.splice(0, 6), (article) => {
                return <SmallCard article={article} key={article.slug} />;
              })}
            </Section>
          </div>
          <div className="right__wrapper">
            <Section title="Editor's Pick" classes="latest__section">
              {map(others_articles.splice(0, 4), (article) => {
                return <RoundCard article={article} key={article.slug} />;
              })}
              {map(others_articles.splice(0, 3), (article) => {
                return (
                  <RoundCard article={article} key={article.slug} hideImage />
                );
              })}
            </Section>
            {viewport_width > 1100 ? (
              <div className="ed__section">
                <LazyLoad
                  height={250}
                  offset={50}
                  throttle={1000}
                  once
                  placeholder={
                    <div
                      className="small__ed"
                      style={{ width: 300, height: 300 }}
                    ></div>
                  }
                >
                  <div className="small__ed">
                    <AdSlot
                      adUnit={`FAQs_Q3_300x250_rt`}
                      sizeMapping={[
                        {
                          viewport: [1024, 768],
                          sizes: [[300, 250]],
                        },
                      ]}
                      sizes={[[300, 250]]}
                      shouldRefresh={checkEdRefresh}
                    />
                  </div>
                </LazyLoad>
                <LazyLoad
                  height={250}
                  offset={50}
                  throttle={1000}
                  once
                  placeholder={
                    <div
                      className="small__ed"
                      style={{ width: 300, height: 300 }}
                    ></div>
                  }
                >
                  <div className="small__ed">
                    <AdSlot
                      adUnit={`FAQs_Q4_300x250_rt`}
                      sizeMapping={[
                        {
                          viewport: [1024, 768],
                          sizes: [[300, 250]],
                        },
                      ]}
                      sizes={[[300, 250]]}
                      shouldRefresh={checkEdRefresh}
                    />
                  </div>
                </LazyLoad>
              </div>
            ) : null}
          </div>
        </div>
        <LazyLoad
          height={250}
          offset={50}
          throttle={1000}
          once
          placeholder={
            <div className="eds_container" style={incontent_edx_size}></div>
          }
        >
          <div className="eds_container">
            <AdSlot
              adUnit={`FAQs_Q1_300x250_rt`}
              sizes={[[300, 250]]}
              shouldRefresh={checkEdRefresh}
            />
          </div>
        </LazyLoad>
        <LazyLoad
          height={250}
          offset={50}
          throttle={1000}
          once
          placeholder={
            <div className="eds_container" style={incontent_edx_size}></div>
          }
        >
          <div className="eds_container">
            <AdSlot
              adUnit={`FAQs_Q5_300x250_rt`}
              sizes={[[300, 250]]}
              shouldRefresh={checkEdRefresh}
            />
          </div>
        </LazyLoad>
      </DFPSlotsProvider>
    </>
  );
};

// export async function getServerSideProps({ query }) {
//   const data = await getGallery(query.slug);
//   const others = await getGalleries({
//     params: {
//       limit: 13,
//       meta_info: true,
//     },
//   });
//   return {
//     props: { data: data, others: others },
//   };
// }

export async function getStaticPaths() {
  const categories = await getSlugs();
  const pathsParams = map(categories, (category) => {
    return {
      params: {
        category: category.category_slug,
        slug: category.slug,
      },
    };
  });
  return {
    paths: [...pathsParams],
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const data = await getGallery(params.slug);
  const others = await getGalleries({
    params: {
      limit: 13,
      meta_info: true,
    },
  });
  return {
    props: { data: data, others: others }, // will be passed to the page component as props
  };
}

export default S1;
