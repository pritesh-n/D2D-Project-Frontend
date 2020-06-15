import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export const NextArrow = ({ className, style, onClick }) => {
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <FontAwesomeIcon icon={faAngleRight} />
    </div>
  );
};

export const PrevArrow = ({ className, style, onClick }) => {
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <FontAwesomeIcon icon={faAngleLeft} />
    </div>
  );
};
