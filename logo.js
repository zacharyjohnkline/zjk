"use strict";

const logoHTML =
  siteOrientation === "landscape"
    ? `<div class="logo-container logo-container-ls">
<img src="./images/zjkLogo.svg" alt="" id="zjk-logo" />
<div class="logo-words">
  <p id="logo-name">Zachary John Kline</p>
  <p id="logo-title">Front End Dev • Product • Print</p>
</div>
</div>`
    : `<div class="logo-container">
<img src="./images/zjkLogo.svg" alt="" id="zjk-logo" />
<div class="logo-words">
  <p id="logo-name">Zachary John Kline</p>
  <p id="logo-title">Front End Dev • Product • Print</p>
</div>
</div>`;

container.innerHTML += logoHTML;

let logoContainer;
document.addEventListener("DOMContentLoaded", function () {
  logoContainer = document.querySelector(".logo-container");
  if (siteOrientation === "landscape") {
    logoContainer.style.color = projectList[activeProjectIndex].titleColor;
  } else {
    logoContainer.style.color = "white";
  }
});
