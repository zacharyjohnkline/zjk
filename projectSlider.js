"use strict";
//DEFINE LEFT, RIGHT, LEFTHIDDEN, RIGHTHIDDEN
let leftHideImage,
  leftImage,
  primaryImg,
  rightImage,
  rightHideImage,
  imageArray;

function loadImages(array) {
  //ADD DOM IMAGES FOR EACH PROJECT IN THE PROJECTLIST ARRAY
  for (let i = 0; i < array.length; i++) {
    if (siteOrientation === "landscape") {
      galleryContainer.innerHTML += `<div class="gallery-img secondary-img gallery-hide-ls"><div class="tint" id="${array[i].id}"></div><img src="${array[i].image}"/></div>`;
    } else {
      galleryContainer.innerHTML += `<div class="gallery-img secondary-img gallery-hide"><div class="tint" id="${array[i].id}"></div><img src="${array[i].image}"/></div>`;
    }
  }
  //CAPTURE DOM IMAGES INTO AN ARRAY
  imageArray = Array.from(document.querySelectorAll(".gallery-img"));
}

function updateImages(array) {
  //ASSIGN PRIMARY IMAGE VARIABLE TO DOM ELEMENT
  primaryImg = imageArray[activeProjectIndex];

  //ASSIGN LEFT AND RIGHT IMAGE VARIABLES TO DOM ELEMENTS
  let lImage, rImage, leftHiddenImage, rightHiddenImage;
  if (siteOrientation === "landscape") {
    imageArray.forEach(
      (el) => (el.classList = "gallery-img secondary-img gallery-hide-ls")
    );
  } else {
    imageArray.forEach(
      (el) => (el.classList = "gallery-img secondary-img gallery-hide")
    );
  }
  lImage = imageArray[activeProjectIndex - 1];
  rImage = imageArray[activeProjectIndex + 1];
  leftHiddenImage = imageArray[activeProjectIndex - 2];
  rightHiddenImage = imageArray[activeProjectIndex + 2];

  //DEFINE CLASSES ON RIGHT AND LEFT IMAGES DEPENDING ON ORIENTATION
  if (siteOrientation === "landscape") {
    if (leftHiddenImage) {
      leftHiddenImage.classList =
        "gallery-img secondary-img left-hidden-image left-hidden-image-ls";
    }
    if (rightHiddenImage) {
      rightHiddenImage.classList =
        "gallery-img secondary-img right-hidden-image right-hidden-image-ls";
    }

    if (lImage) {
      lImage.classList = "gallery-img secondary-img left-image left-image-ls";
      lImage.firstChild.style.backgroundColor =
        array[activeProjectIndex].bgBlockColor;
      lImage.firstChild.style.mixBlendMode = "color";
      lImage.removeEventListener("click", gotoProject);
    }
    if (rImage) {
      rImage.classList = "gallery-img secondary-img right-image right-image-ls";
      rImage.firstChild.style.backgroundColor =
        array[activeProjectIndex].bgBlockColor;
      rImage.firstChild.style.mixBlendMode = "color";
      rImage.removeEventListener("click", gotoProject);
    }
    //ADD PRIMARY CLASS TO PRIMARY IMAGE
    primaryImg.classList = "";
    primaryImg.classList =
      "gallery-img secondary-img primary-img primary-img-ls";
    primaryImg.firstChild.style.backgroundColor = "";
    primaryImg.addEventListener("click", gotoProject);
  } else {
    if (leftHiddenImage) {
      leftHiddenImage.classList = "gallery-img secondary-img left-hidden-image";
    }
    if (rightHiddenImage) {
      rightHiddenImage.classList =
        "gallery-img secondary-img right-hidden-image";
    }
    if (lImage) {
      lImage.classList = "gallery-img secondary-img left-image";
      lImage.firstChild.style.backgroundColor =
        array[activeProjectIndex].bgBlockColor;
      lImage.firstChild.style.mixBlendMode = "color";
      lImage.removeEventListener("click", gotoProject);
    }
    if (rImage) {
      rImage.classList = "gallery-img secondary-img right-image";
      rImage.firstChild.style.backgroundColor =
        array[activeProjectIndex].bgBlockColor;
      rImage.firstChild.style.mixBlendMode = "color";
      rImage.removeEventListener("click", gotoProject);
    }
    //ADD PRIMARY CLASS TO PRIMARY IMAGE
    primaryImg.classList = "";
    primaryImg.classList = "gallery-img secondary-img primary-img";
    primaryImg.firstChild.style.backgroundColor = "";
    primaryImg.addEventListener("click", gotoProject);
  }

  leftImage = lImage;
  rightImage = rImage;
  leftHideImage = leftHiddenImage;
  rightHideImage = rightHiddenImage;

  //   console.log(leftHiddenImage, rightHiddenImage, lImage, rImage, primaryImg);
}

function populateDescription(array) {
  projectTitle.innerText = array[activeProjectIndex].title;
  projectDate.innerText = array[activeProjectIndex].date;
  projectInfo.innerHTML = array[activeProjectIndex].paragraph;
}

function updateColors(array) {
  const backgroundColorBar = document.querySelector(".background-colorbar");
  const logoContainer = document.querySelector(".logo-container");
  if (siteOrientation === "landscape") {
    logoContainer.style.color = array[activeProjectIndex].titleColor;
    projectTitle.style.textAlign = "left";
    container.style.backgroundImage = array[activeProjectIndex].bgColorLS;
  } else {
    logoContainer.style.color = "white";
    projectTitle.style.textAlign = "center";
    container.style.backgroundImage = array[activeProjectIndex].bgColor;
  }
  projectTitle.style.color = array[activeProjectIndex].titleColor;
  projectDate.style.color = array[activeProjectIndex].infoColor;
  projectInfo.style.color = array[activeProjectIndex].infoColor;
  backgroundColorBar.style.backgroundColor =
    array[activeProjectIndex].titleColor;
}
//DEFINE HTML OF PAGE
function populatePage(array) {
  loadImages(array);
  updateImages(array);
  populateDescription(array);
  updateColors(array);
}

function gotoProject(event) {
  window.removeEventListener("touchstart", handleTouchStart);
  window.removeEventListener("touchmove", listenEventMobile);
  startingScreen.style.backgroundColor =
    projectList[activeProjectIndex].bgBlockColor;
  startingScreen.classList.remove("hidden-screen");
  startingScreen.classList.add("visible-screen");
  startingScreen.classList.remove("screen-animation");
  setTimeout(() => {
    startingScreen.classList.add("hidden-screen");
  }, 750);
  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("touchmove", listenEventMobile);
}

populatePage(projectList);
