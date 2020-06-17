import { throttle, map } from "lodash";
import { DFPManager } from "react-dfp";
import { forceCheck } from "react-lazyload";

export const visibilityChecker = (selector) => {
  let elems = document.querySelectorAll(selector);
  let siblings = document.querySelectorAll(".post__container .post__card");
  let visibleSibling = document.querySelector(".post__container .post__card");
  let prevBodyHeight = document.body.clientHeight;
  let edTimeoutFlag = false;
  return () => {
    let prevVisibleSibling = visibleSibling;
    _.map(siblings, (sibling) => {
      if (isVisible(sibling)) {
        visibleSibling = sibling;
      }
    });
    if (prevVisibleSibling != visibleSibling) {
      if (!edTimeoutFlag) {
        DFPManager.refresh();
        edTimeoutFlag = true;
        setTimeout(() => {
          edTimeoutFlag = false;
        }, 4000);
      }
    }
    _.map(elems, (elem) => {
      if (!isVisible(elem)) {
        if (!visibleSibling.previousSibling.classList.contains("inuse")) {
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
      if (prevBodyHeight != document.body.clientHeight) {
        placeEdOverElem(
          elem,
          document.getElementById(elem.getAttribute("data-parent"))
        );
      }
    });
  };
};

export const checkEdRefresh = (self) => {
  if (isVisible(document.getElementById(self.slotId))) {
    return true;
  } else {
    return false;
  }
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
  window.addEventListener("load", (event) => {
    setTimeout(() => {
      DFPManager.load();
      visibilityCheckerCb(selector);
      enableListener(visibilityCheckerCb);
      forceCheck();
    }, 2000);
  });
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
