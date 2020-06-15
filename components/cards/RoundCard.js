import LazyLoad from "react-lazyload";
import Image from "./Image";

const RoundCard = ({ article, hideImage }) => {
  return (
    <div className="round__card">
      {hideImage ? null : (
        <LazyLoad once height={80} offset={100}>
          <a href={`/${article.category.toLowerCase()}/${article.slug}/S1`}>
            <Image name={article.image_url} size="thumb" />
          </a>
        </LazyLoad>
      )}

      <div className="card__info">
        <h3 className="category">{article.category}</h3>
        <h2 className="title">
          <a href={`/${article.category.toLowerCase()}/${article.slug}/S1`}>
            {article.title}
          </a>
        </h2>
      </div>
    </div>
  );
};

export default RoundCard;
