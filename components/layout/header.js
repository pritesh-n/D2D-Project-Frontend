import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header = ({ toggleClass, searchTerm, updateSearch, onSearchSubmit }) => {
  return (
    <header>
      <div className="container header__wrapper">
        <FontAwesomeIcon
          icon={faBars}
          className="menu__icon"
          onClick={() =>
            toggleClass(".menu__header", {
              className: "open",
              action: "add",
            })
          }
        />
        <a className="logo__head">
          <img src="/static/images/logo.svg" />
        </a>
        <ul className="menu__header">
          <FontAwesomeIcon
            icon={faTimes}
            className="close__icon"
            onClick={() =>
              toggleClass(".menu__header", {
                className: "open",
                action: "remove",
              })
            }
          />
          <li className="heading">Categories</li>
          <li>
            <a href="/entertainment">Entertainment</a>
          </li>
          <li>
            <a href="/travel">Travel</a>
          </li>
          <li>
            <a href="/featured">Featured</a>
          </li>
          <li>
            <a href="/lifestyle">Lifestyle</a>
          </li>
        </ul>
        <FontAwesomeIcon
          icon={faSearch}
          className="search__icon"
          onClick={(e) => {
            toggleClass(".search__form", {
              className: "open",
              action: "toggle",
            });
            document.querySelector(".search__form").classList.contains("open")
              ? document.querySelector(".search__input").focus()
              : document.querySelector(".search__input").blur();
          }}
        />
      </div>
      <form
        className="search__form"
        id="search__form"
        onSubmit={onSearchSubmit}
      >
        <input
          name="search"
          className="search__input"
          value={searchTerm}
          onChange={(e) => updateSearch(e.target.value)}
          placeholder="Search..."
        />
      </form>
    </header>
  );
};

export default Header;
