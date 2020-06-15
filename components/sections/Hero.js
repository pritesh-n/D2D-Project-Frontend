import map from "lodash/map";
import Slider from "react-slick";
import SmallCard from "../cards/SmallCard";
import { NextArrow, PrevArrow } from "../elements/Arrows";

const Hero = ({ results }) => {
  return (
    <div className="hslider__wrapper">
      <Slider
        {...{
          dots: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1.2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1200,
              arrows: false,
              settings: {
                slidesToShow: 2.1,
                slidesToScroll: 1,
              },
            },
          ],
        }}
      >
        {map(results, (article) => {
          return <SmallCard article={article} key={article.slug} showFull />;
        })}
      </Slider>
    </div>
  );
};

export default Hero;
