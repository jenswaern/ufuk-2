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

initMenu();
