import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header>
      <div className="container header__wrapper">
        <FontAwesomeIcon icon={faBars} />
        <a className="logo__head">
          <img src="/static/images/logo.svg" />
        </a>
        <ul className="menu__header">
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
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </header>
  );
};

export default Header;
