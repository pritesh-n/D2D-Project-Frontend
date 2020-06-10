import { throttle, map } from "lodash";

export const visibilityChecker = (selector) => {
  let elems = document.querySelectorAll(selector);
  let siblings = document.querySelectorAll(".post__container .post__card");
  return () => {
    let visibleSibling = document.querySelector(".post__container .post__card");
    _.map(siblings, (sibling) => {
      if (isVisible(sibling)) {
        visibleSibling = sibling;
      }
    });
    _.map(elems, (elem) => {
      if (!isVisible(elem)) {
        if (!visibleSibling.previousSibling.classList.contains("inuse")) {
          console.log(elem);
          placeEdOverElem(elem, visibleSibling.previousSibling);
          visibleSibling.previousSibling.classList.add("inuse");
          if (elem.getAttribute("data-parent")) {
            document
              .getElementById(elem.getAttribute("data-parent"))
              .classList.remove("inuse");
          }
          elem.setAttribute(
            "data-parent",
            visibleSibling.previousSibling.getAttribute("id")
          );
        } else if (!visibleSibling.nextSibling.classList.contains("inuse")) {
          placeEdOverElem(elem, visibleSibling.nextSibling);
          visibleSibling.nextSibling.classList.add("inuse");
          if (elem.getAttribute("data-parent")) {
            document
              .getElementById(elem.getAttribute("data-parent"))
              .classList.remove("inuse");
          }
          elem.setAttribute(
            "data-parent",
            visibleSibling.nextSibling.getAttribute("id")
          );
        }
      }
    });
  };
};

export const placeEdOverElem = (elem, visibleParent) => {
  var big_coordinates = getXYpos(visibleParent);
  var bp_x = big_coordinates["x"];

  var bp_y = big_coordinates["y"];

  elem.style.position != "absolute" ? (elem.style.position = "absolute") : null;

  elem.style.left = bp_x + "px";

  elem.style.top = bp_y + "px";
};

export const isVisible = (element) => {
  let top = element.getBoundingClientRect().top;
  let bottom = element.getBoundingClientRect().bottom;
  let vHeight = window.innerHeight || document.documentElement.clientHeight;
  return (top > 0 || bottom > 0) && top < vHeight;
};

export const enableListener = (callback) => {
  window.addEventListener("scroll", _.throttle(callback, 400));
};

export const scrollAbsoluteEds = (selector) => {
  let visibilityCheckerCb = visibilityChecker(selector);
  visibilityCheckerCb(selector);
  enableListener(visibilityCheckerCb);
};

const getXYpos = (elem) => {
  if (!elem) {
    return { x: 0, y: 0 };
  }
  var xy = { x: elem.offsetLeft, y: elem.offsetTop };
  var par = getXYpos(elem.offsetParent);
  for (var key in par) {
    xy[key] += par[key];
  }
  return xy;
};
