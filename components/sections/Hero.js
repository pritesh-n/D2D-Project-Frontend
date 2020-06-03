import map from "lodash/map";
import Slider from "react-slick";
import SmallCard from "../cards/SmallCard";

const Hero = ({ results }) => {
  return (
    <div className="hero__section">
      <Slider
        {...{
          dots: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          infinite: false,
        }}
      >
        {map(results, (article) => {
          return <SmallCard article={article} key={article.slug} />;
        })}
      </Slider>
    </div>
  );
};

export default Hero;
