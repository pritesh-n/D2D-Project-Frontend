import { getGalleries } from "../helpers/api";
import Hero from "../components/sections/Hero";

const Home = ({ data }) => {
  const articles = [...data];
  return (
    <>
      <Hero results={articles.splice(0, 3)} />
    </>
  );
};

Home.getInitialProps = async ({ req, query }) => {
  const data = await getGalleries({
    params: {
      limit: 40,
      meta_info: true,
    },
  });
  return { data: data };
};

export default Home;
