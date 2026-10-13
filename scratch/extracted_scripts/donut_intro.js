// DONUT IMG INTRO
gsap.registerPlugin(ScrollTrigger);
const donuts = [
  { el: ".donut--1", scale: 0.82 },
  { el: ".donut--2", scale: 0.85 },
  { el: ".donut--3", scale: 0.88 },
  { el: ".donut--4", scale: 0.91 },
  { el: ".donut--5", scale: 0.94 },
  { el: ".donut--6", scale: 0.97 }
 ];
  const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-intro",
    start: "top 50%",   // Starts when the top of the section reaches 90% of the viewport (≈10% visible)
    end: "bottom 10%",  // Ends when the bottom reaches 25% of the viewport (≈75% through)
    scrub: 1,
    invalidateOnRefresh: true
  }
  });
  donuts.forEach((donut, i) => {
   tl.to(donut.el, {
    borderWidth: 100,
    scale: donut.scale,
    ease: "none",
    duration: 1
  }, i * 0.06);
  });