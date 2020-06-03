import LazyLoad from "react-lazyload";

const SmallCard = ({ article }) => {
  return (
    <div className="small__card">
      <img
        key={article.image_url}
        src={`http://localhost:5001/images/${article.image_url}_small.jpg`}
        className="image"
      />
      <h3 className="category">{article.category}</h3>
      <h2 className="title">{article.title}</h2>
    </div>
  );
};

export default SmallCard;
