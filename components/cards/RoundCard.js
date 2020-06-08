import LazyLoad from "react-lazyload";

const RoundCard = ({ article, hideImage }) => {
  return (
    <div className="round__card">
      {hideImage ? null : (
        <LazyLoad once height={80} offset={100}>
          <img
            key={article.image_url}
            src={`${process.env.REACT_APP_IMAGE_URL}/${article.image_url}_thumb.jpg`}
            className="image"
          />
        </LazyLoad>
      )}

      <div className="card__info">
        <h3 className="category">{article.category}</h3>
        <h2 className="title">{article.title}</h2>
      </div>
    </div>
  );
};

export default RoundCard;
