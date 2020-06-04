import { useContext } from "react";
import AppContext from "../../helpers/AppContext";

const defaultSrc =
  "data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

const Image = ({ name, size }) => {
  const { screen_size } = useContext(AppContext);
  const imgBase = `${process.env.REACT_APP_IMAGE_URL}/${name}`;
  const imageSrc = size
    ? `${imgBase}_${size}.jpg`
    : screen_size
    ? `${imgBase}_${screen_size}.jpg`
    : defaultSrc;

  return <img src={imageSrc} className="image" />;
};

export default Image;
