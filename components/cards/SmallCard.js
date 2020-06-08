import LazyLoad from "react-lazyload";
import Image from "./Image";

const SmallCard = ({ article }) => {
  return (
    <div className="small__card">
      <LazyLoad once height={200} offset={100}>
        <Image name={article.image_url} />
      </LazyLoad>
      <div className="card__info">
        <h3 className="category">{article.category}</h3>
        <h2 className="title">
          <a href={`/${article.category.toLowerCase()}/${article.slug}`}>
            {article.title}
          </a>
        </h2>
      </div>
    </div>
  );
};

export default SmallCard;
