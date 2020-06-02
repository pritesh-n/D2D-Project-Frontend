import { getGalleries } from "../helpers/api";

const Home = ({ name }) => {
  return (
    <div>
      {name}
      <span>sdawdawdd</span>
    </div>
  );
};

Home.getInitialProps = async ({ req, query }) => {
  const data = await getGalleries({
    params: {
      limit: 1,
      meta_info: true,
    },
  });
  return { data: data };
};

export default Home;
