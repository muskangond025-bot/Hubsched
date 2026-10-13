document.addEventListener("DOMContentLoaded", () => { 
  // Parallax Layers
  document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "0% 0%",
        end: "100% 0%",
        scrub: 0
      }
    });

    const layers = [
       { layer: "-1", yPercent: -10 },
       { layer: "-2", yPercent: -20 },
       { layer: "-3", yPercent: -30 },
       { layer: "-4", yPercent: -40 },
       { layer: "-5", yPercent: -50 },
       { layer: "-6", yPercent: -60 },
       { layer: "-7", yPercent: -70 },
       { layer: "-8", yPercent: -80 },
       { layer: "-9", yPercent: -90 },
       { layer: "1", yPercent: 10 },
       { layer: "2", yPercent: 20 },
       { layer: "3", yPercent: 30 },
       { layer: "4", yPercent: 40 },
       { layer: "5", yPercent: 50 },
       { layer: "6", yPercent: 60 },
       { layer: "7", yPercent: 70 },
       { layer: "8", yPercent: 80 },
       { layer: "9", yPercent: 90 }
    ];

    layers.forEach((layerObj, idx) => {
      tl.to(
        triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
        {
          yPercent: layerObj.yPercent,
          ease: "none"
        },
        idx === 0 ? undefined : "<"
      );
    });
  });
});