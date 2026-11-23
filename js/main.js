/* ---------------------------------------------------------------
 * Mobilmeny
 * <dialog> ger fokusfälla, Esc-stängning och top layer gratis.
 * ------------------------------------------------------------- */

function initMenu() {
  const menu = document.querySelector("[data-menu]");
  const openButton = document.querySelector("[data-menu-open]");
  if (!menu || !openButton || typeof menu.showModal !== "function") return;

  const closeButton = menu.querySelector("[data-menu-close]");
  const desktop = window.matchMedia("(min-width: 768px)");

  openButton.addEventListener("click", () => {
    menu.showModal();
    openButton.setAttribute("aria-expanded", "true");
  });

  closeButton.addEventListener("click", () => menu.close());

  menu.addEventListener("close", () => {
    openButton.setAttribute("aria-expanded", "false");
  });

  // Stäng menyn när man väljer en länk – sidan scrollar sedan till ankaret.
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.close());
  });

  // Stäng menyn om fönstret blir desktop-brett medan den är öppen.
  desktop.addEventListener("change", (event) => {
    if (event.matches && menu.open) menu.close();
  });
}

/* ---------------------------------------------------------------
 * Gallery Slider
 * Bildraden är en vanlig scrollyta (svepbar utan JS).
 * Pilarna scrollar ett kort i taget och gråas ut vid ändarna.
 * ------------------------------------------------------------- */

function initSlider(slider) {
  const track = slider.querySelector("[data-slider-track]");
  const prev = slider.querySelector("[data-slider-prev]");
  const next = slider.querySelector("[data-slider-next]");
  if (!track || !prev || !next) return;

  const step = () => {
    const slide = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return slide ? slide.getBoundingClientRect().width + gap : track.clientWidth;
  };

  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    prev.setAttribute("aria-disabled", String(track.scrollLeft <= 1));
    next.setAttribute("aria-disabled", String(track.scrollLeft >= max - 1));
  };

  const go = (direction) => (event) => {
    if (event.currentTarget.getAttribute("aria-disabled") === "true") return;
    track.scrollBy({ left: direction * step() });
  };

  prev.addEventListener("click", go(-1));
  next.addEventListener("click", go(1));
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

document.documentElement.classList.add("js");
initMenu();
document.querySelectorAll("[data-slider]").forEach(initSlider);
