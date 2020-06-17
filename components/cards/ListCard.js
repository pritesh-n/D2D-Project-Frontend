import LazyLoad from "react-lazyload";
import Image from "./Image";

const ListCard = ({ article }) => {
  return (
    <div className="list__card">
      <LazyLoad once height={200} offset={100}>
        <a
          href={`/${article.category.toLowerCase()}/${article.slug}/S1`}
          className="image__wrapper"
        >
          <Image name={article.image_url} size="small" />
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

export default ListCard;
