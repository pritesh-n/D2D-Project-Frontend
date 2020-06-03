import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const toggleClass = (selector, { className, action }) => {
  let selectorClasses = document.querySelector(selector).classList;
  switch (action) {
    case "add":
      selectorClasses.add(className);
      break;
    case "remove":
      selectorClasses.remove(className);
      break;
    case "toggle":
      selectorClasses.contains(className)
        ? selectorClasses.remove(className)
        : selectorClasses.add(className);
      break;
    default:
      break;
  }
};

const onSearchSubmit = (searchTerm) => {
  if (searchTerm.trim() != "") {
    console.log(searchTerm);
  }
};

const Layout = ({ children, componentName }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <React.Fragment>
      <Header
        toggleClass={toggleClass}
        searchTerm={searchTerm}
        updateSearch={setSearchTerm}
        onSearchSubmit={(e) => {
          e.preventDefault();
          onSearchSubmit(searchTerm);
        }}
      />
      <div className={`main__wrapper ${componentName}__wrapper`}>
        {children}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
