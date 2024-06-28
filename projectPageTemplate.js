"use strict";

const projectPagesHTML =
  siteOrientation === "landscape"
    ? `
<div class="gallery-container gallery-container-ls"></div>
<div class="info-container info-container-ls">
  <p class="project-title"></p>
  <p class="project-date"></p>
  <p class="project-info"></p>
</div>`
    : `
<div class="gallery-container"></div>
<div class="info-container">
  <p class="project-title"></p>
  <p class="project-date"></p>
  <p class="project-info"></p>
</div>`;

//INITIALIZE PAGE
pageContainer.innerHTML += projectPagesHTML;

//CAPTURE DOM ELEMENTS
const galleryContainer = document.querySelector(".gallery-container");
const infoContainer = document.querySelector(".info-container");
const projectTitle = document.querySelector(".project-title");
const projectDate = document.querySelector(".project-date");
const projectInfo = document.querySelector(".project-info");
