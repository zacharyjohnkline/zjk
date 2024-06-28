"use strict";
const containerHTML =
  siteOrientation === "landscape"
    ? `<div class="container">
    <div class="background-colorbar background-colorbar-ls"></div>
  </div>`
    : `<div class="container">
  <div class="background-colorbar"></div>
</div>`;

bodyHTML.insertAdjacentHTML("afterbegin", containerHTML);
const container = document.querySelector(".container");
container.style.backgroundImage = projectList[activeProjectIndex].bgColor;
let backgroundColorBar;
document.addEventListener("DOMContentLoaded", function () {
  backgroundColorBar = document.querySelector(".background-colorbar");
  backgroundColorBar.style.backgroundColor =
    projectList[activeProjectIndex].titleColor;
});
