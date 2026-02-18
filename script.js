const siteHeader = document.querySelector(".site-header");
const navPill = document.querySelector(".nav-pill");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinkItems = document.querySelectorAll(".nav-links a");
const backToTopBtn = document.querySelector(".back-to-top");
const revealItems = document.querySelectorAll(".reveal");
const aboutCarousel = document.querySelector("[data-about-carousel]");

const SCROLL_THRESHOLD = 18;
const BACK_TO_TOP_THRESHOLD = 520;
const MOBILE_BREAKPOINT = 900;

function updateNavOnScroll() {
  if (!navPill) return;
  navPill.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
}

function toggleMobileMenu(forceClose = false) {
  if (!navLinks || !navToggle || !siteHeader) return;

  const shouldOpen = forceClose ? false : !navLinks.classList.contains("open");
  navLinks.classList.toggle("open", shouldOpen);
  navToggle.setAttribute("aria-expanded", String(shouldOpen));
  siteHeader.classList.toggle("menu-open", shouldOpen);
}

function handleOutsideClick(event) {
  if (!navLinks || !siteHeader) return;
  if (!navLinks.classList.contains("open")) return;
  if (!siteHeader.contains(event.target)) {
    toggleMobileMenu(true);
  }
}

function handleEscClose(event) {
  if (event.key === "Escape") {
    toggleMobileMenu(true);
  }
}

function handleBackToTopVisibility() {
  if (!backToTopBtn) return;
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
  const shouldShow = isMobile && window.scrollY > BACK_TO_TOP_THRESHOLD;
  backToTopBtn.classList.toggle("show", shouldShow);
}

function setupReveal() {
  if (!("IntersectionObserver" in window) || !revealItems.length) {
    revealItems.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupAboutCarousel() {
  if (!aboutCarousel) return;

  const track = aboutCarousel.querySelector("[data-carousel-track]");
  const prevBtn = aboutCarousel.querySelector("[data-carousel-prev]");
  const nextBtn = aboutCarousel.querySelector("[data-carousel-next]");
  const dotContainer = document.querySelector("[data-carousel-dots]");
  const dots = dotContainer ? Array.from(dotContainer.querySelectorAll("[data-slide]")) : [];

  if (!track) return;

  const getIndex = () => Math.round(track.scrollLeft / track.clientWidth);
  const maxIndex = dots.length ? dots.length - 1 : Math.max(0, track.children.length - 1);

  const updateDots = () => {
    const active = getIndex();
    dots.forEach((dot, idx) => {
      dot.classList.toggle("is-active", idx === active);
      dot.setAttribute("aria-current", idx === active ? "true" : "false");
    });
  };

  const goToSlide = (index) => {
    const safeIndex = Math.max(0, Math.min(index, maxIndex));
    track.scrollTo({
      left: safeIndex * track.clientWidth,
      behavior: "smooth",
    });
  };

  if (prevBtn) {
    prevBtn.addEventListener("click", () => goToSlide(getIndex() - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => goToSlide(getIndex() + 1));
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.getAttribute("data-slide"));
      goToSlide(index);
    });
  });

  track.addEventListener("scroll", updateDots, { passive: true });
  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToSlide(getIndex() - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToSlide(getIndex() + 1);
    }
  });

  window.addEventListener("resize", updateDots);
  updateDots();
}

window.addEventListener("scroll", () => {
  updateNavOnScroll();
  handleBackToTopVisibility();
});

window.addEventListener("resize", () => {
  handleBackToTopVisibility();
  if (window.innerWidth > 859) {
    toggleMobileMenu(true);
  }
});

document.addEventListener("click", handleOutsideClick);
document.addEventListener("keydown", handleEscClose);

if (navToggle) {
  navToggle.addEventListener("click", () => toggleMobileMenu(false));
}

if (navLinkItems.length) {
  navLinkItems.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 860) {
        toggleMobileMenu(true);
      }
    });
  });
}

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

updateNavOnScroll();
handleBackToTopVisibility();
setupReveal();
setupAboutCarousel();
