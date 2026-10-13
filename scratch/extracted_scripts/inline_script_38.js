gsap.from(".heading-style-display, .heading-style-display.is--next", {
  y: 100,
  opacity: 0,
  duration: 1,
  stagger: 0.05,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".section-footer",
    start: "top 75%",
    toggleActions: "restart pause resume pause",
    once: false,
  },
});