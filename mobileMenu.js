"use strict";
const bodyHTML = document.querySelector("body");

const mobileMenuHTML = `
<div class="mobile-menu">
<div class="bars-container">
  <div id="top-bar" class="bars"></div>
  <div id="middle-bar" class="bars"></div>
  <div id="bottom-bar" class="bars"></div>
</div>
</div>`;

bodyHTML.insertAdjacentHTML("afterbegin", mobileMenuHTML);

const mobileMenu = document.querySelector(".mobile-menu");
