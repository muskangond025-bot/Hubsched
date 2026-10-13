if (window.innerWidth <= 991) {
    document.querySelectorAll('[data-gsap]').forEach(el => {
      el.removeAttribute('data-gsap'); // disables animation triggers
      el.style.opacity = '1'; // ensure fully visible
      el.style.transform = 'none'; // reset any transform states
    });
  }