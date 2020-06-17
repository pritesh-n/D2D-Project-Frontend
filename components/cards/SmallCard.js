import LazyLoad from "react-lazyload";
import Image from "./Image";

const SmallCard = ({ article, showFull }) => {
  return (
    <div className="small__card">
      <LazyLoad once height={200} offset={100}>
        <a href={`/${article.category.toLowerCase()}/${article.slug}/S1`}>
          <Image name={article.image_url} showFull={showFull} />
        </a>
      </LazyLoad>
      <div className="card__info">
        <h3 className="category">
          <a href={`/${article.category.toLowerCase()}`}>{article.category}</a>
        </h3>
        <h2 className="title">
          <a href={`/${article.category.toLowerCase()}/${article.slug}/S1`}>
            {article.title}
          </a>
        </h2>
      </div>
    </div>
  );
};

export default SmallCard;
