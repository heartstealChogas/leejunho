"use strict";

const photos = [
  ["kodak-collection.webp", "트레이더스 매대에 크기와 색상별로 진열한 코닥캐리어", "트레이더스 팝업 · 캐리어 진열"],
  ["kodak-popup.webp", "노란 코닥 간판 아래 캐리어를 진열한 트레이더스 매장 전경", "트레이더스 팝업 · 매장 전경"],
  ["kodak-detail.webp", "프로모션 매대에 놓인 코닥 여행 소품과 제품별 가격표", "트레이더스 팝업 · 여행 소품"],
];
const fieldImage = document.getElementById("field-photo");
const fieldCaption = document.getElementById("field-caption");
const fieldCount = document.getElementById("field-count");
let photoIndex = 0;

function changePhoto(offset) {
  photoIndex = (photoIndex + offset + photos.length) % photos.length;
  const [filename, description, title] = photos[photoIndex];
  fieldImage.src = "portfolio-assets/" + filename;
  fieldImage.alt = description;
  fieldCaption.textContent = title;
  fieldCount.textContent = (photoIndex + 1) + " / " + photos.length;
}

document.getElementById("field-prev").addEventListener("click", () => changePhoto(-1));
document.getElementById("field-next").addEventListener("click", () => changePhoto(1));
document.querySelector(".photo-nav").hidden = false;

const nav = [...document.querySelectorAll(".nav-links a")];
const sections = nav.map(link => document.querySelector(link.hash));
let updatePending = false;

function updateNav() {
  const threshold = Math.min(innerHeight * .32, 260);
  let current = 0;
  for (const [index, section] of sections.entries()) {
    if (section.getBoundingClientRect().top <= threshold) current = index;
  }
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) current = nav.length - 1;
  for (const [index, link] of nav.entries()) {
    link.classList.toggle("active", index === current);
    if (index === current) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
  updatePending = false;
}

function scheduleNavUpdate() {
  if (updatePending) return;
  updatePending = true;
  requestAnimationFrame(updateNav);
}

addEventListener("scroll", scheduleNavUpdate, {passive: true});
addEventListener("resize", scheduleNavUpdate);
updateNav();
