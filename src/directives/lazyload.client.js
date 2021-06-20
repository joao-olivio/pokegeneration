import { debounce } from "lodash";

const ROOT_MARGIN = "150px 150px 150px 150px";
const DEFAULT_THRESHOLD = [0.006];

export const getMatchingImageToMedia = (
  backgroundList,
  viewportWidth = document.documentElement.clientWidth
) => {
  if (typeof backgroundList === "string") return backgroundList;

  const breakpoints = Object.keys(backgroundList).reverse();

  const matching = breakpoints
    .filter((breakpoint) => viewportWidth >= breakpoint)
    .shift();

  return backgroundList[matching];
};

export const lazyload = {
  name: "lazyload",
  inserted: (el, binding) => {
    const updateCurrentImage = () => {
      const url = getMatchingImageToMedia(binding.value);
      el.src = url;
    };

    const imageIntersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            updateCurrentImage();
            el.resizeListener = debounce(updateCurrentImage, 300);
            window.addEventListener("resize", el.resizeListener);
            imageIntersectionObserver.unobserve(entry.target);
          }
        });
      },
      { ROOT_MARGIN, DEFAULT_THRESHOLD }
    );

    imageIntersectionObserver.observe(el);
  },
  unbind: (el) => {
    if (el.resizeListener)
      window.removeEventListener("resize", el.resizeListener);
  },
};
