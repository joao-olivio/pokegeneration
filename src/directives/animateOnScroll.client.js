export const animateOnScrollObserver = new IntersectionObserver(
  (entries, animateOnScrollObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("enter");
        entry.target.classList.remove("before-enter");
        animateOnScrollObserver.unobserve(entry.target);
      }
    });
  }
);

export const animateOnScroll = {
  name: "animate-on-scroll",
  bind: (el) => {
    el.classList.add("before-enter");
    animateOnScrollObserver.observe(el);
  },
};
