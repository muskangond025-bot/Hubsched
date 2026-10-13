document.addEventListener("DOMContentLoaded", function () {
    // Only run transition if NOT on homepage
    if (window.location.pathname !== "/") {
    // page load
    let tl = gsap.timeline();
    tl.to(".transition-column", { yPercent: -100, stagger: 0.1 });
    tl.set(".transition-wrapper", { display: "none" });

    // link click
    $("a:not(.excluded-class)").on("click", function (e) {
      let currentUrl = $(this).attr("href");
      if (
        $(this).prop("hostname") === window.location.host &&
        !currentUrl.includes("#") &&
        $(this).attr("target") !== "_blank"
      ) {
        e.preventDefault();
        let tl = gsap.timeline({
          onComplete: () => (window.location.href = currentUrl)
        });
        tl.set(".transition-wrapper", { display: "flex" });
        tl.fromTo(".transition-column", { yPercent: 100 }, { yPercent: 0, stagger: 0.1 });
      }
    });

    // On Back Button Tap
    window.onpageshow = function (event) {
      if (event.persisted) window.location.reload();
    };
  }
});