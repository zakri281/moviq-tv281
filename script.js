// MOVIQ TV — настройка плеера и мобильного меню
const STREAM_PAGE_URL = "https://vkvideo.ru/live-231787809_456239198";

// Вставь сюда именно URL iframe из меню VK «Поделиться» → «Код для вставки».
// Не вставляй сюда ссылку на страницу трансляции, если VK выдал отдельный embed URL.
const VK_EMBED_URL = ""; // Пример формата зависит от типа трансляции VK.

const loadButton = document.getElementById("load-player");
const playerFrame = document.getElementById("player-frame");
const placeholder = document.getElementById("player-placeholder");

function loadPlayer() {
  if (!VK_EMBED_URL.trim()) {
    window.open(STREAM_PAGE_URL, "_blank", "noopener,noreferrer");
    const note = placeholder.querySelector(".placeholder-note");
    if (note) note.textContent = "Открыли эфир VK Видео в новой вкладке. Чтобы встроить его сюда, добавь VK_EMBED_URL в script.js.";
    return;
  }
  const iframe = document.createElement("iframe");
  iframe.src = VK_EMBED_URL;
  iframe.title = "Прямой эфир MOVIQ TV — VK Видео";
  iframe.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.loading = "lazy";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.setAttribute("frameborder", "0");
  playerFrame.replaceChildren(iframe);
}
if (loadButton) loadButton.addEventListener("click", loadPlayer);

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
}
document.getElementById("year").textContent = new Date().getFullYear();
