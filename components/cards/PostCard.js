import LazyLoad from "react-lazyload";
import Image from "./Image";

const PostCard = ({ title, image_url, credit, desc }) => {
  return (
    <div className="post__card">
      <LazyLoad once height={225} offset={50}>
        <Image name={image_url} />
      </LazyLoad>
      <div className="card__info">
        <p className="credit">{credit}</p>
        <h2 className="title">{title}</h2>
        <p className="desc">{desc}</p>
      </div>
    </div>
  );
};

export default PostCard;
