"use strict";
//DEFINE LIST TO PULL FROM
let activeList = projectList;

//DEFINE ACTIVE PROJECT INDEX
let activeProjectIndex = 0;
let ticker = 0;
let interval, profession, professionPhrase;
let initialY = null;

//DEFINE ORIENTATION VARIABLE
let siteOrientation;
let listeningToWheel = true;

//CAPTURE DOM ELEMENTS
const startingScreen = document.querySelector(".starting-screen");

//FUNCTION TO START PROFESSIONAL INTERVAL
function startInterval() {
  profession = document.getElementById("profession");
  professionPhrase = document.getElementById("profession-phrase");
  profession.style.color = `teal`;
  profession.style.fontSize = `calc(20px + 5 * ((100vw - 320px) / 680))`;
  profession.style.fontFamily = `Quicksand-Bold`;
  interval = setInterval(() => {
    ticker++;
    if (ticker >= professionArticles.length) {
      ticker = 0;
    }
    profession.innerText = professionList[ticker];
    professionPhrase.innerText = professionArticles[ticker];
  }, 2000);
}

function initialOrientation() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  if (width >= height * 1.25) {
    siteOrientation = "landscape";
  } else {
    siteOrientation = "portrait";
  }
  // console.log("initial orientation", siteOrientation);
}
//INITIALIZE PAGE READING TO DISCERN ORIENTATION
initialOrientation();

//ADD LANDSCAPE CLASS TO LAYOUT ELEMENTS
function landscapeSwitch() {
  updateImages(projectList);
  updateColors(projectList);
  logoContainer.classList.add("logo-container-ls");
  backgroundColorBar.classList.add("background-colorbar-ls");
  galleryContainer.classList.add("gallery-container-ls");
  infoContainer.classList.add("info-container-ls");
  projectInfo.classList.add("project-info-ls");
  mobileMenu.classList.remove("mobile-menu");
  mobileMenu.classList.add("mobile-menu-ls");
  pageContainer.classList.add("page-container-ls");
  siteOrientation = "landscape";
}
//REMOVE LANDSCAPE CLASS FROM LAYOUT ELEMENTS
function portraitSwitch() {
  updateImages(projectList);
  updateColors(projectList);
  logoContainer.classList.remove("logo-container-ls");
  backgroundColorBar.classList.remove("background-colorbar-ls");
  galleryContainer.classList.remove("gallery-container-ls");
  infoContainer.classList.remove("info-container-ls");
  projectInfo.classList.remove("project-info-ls");
  mobileMenu.classList.add("mobile-menu");
  mobileMenu.classList.remove("mobile-menu-ls");
  pageContainer.classList.remove("page-container-ls");
  siteOrientation = "portrait";
}

// RESPONSIVE DESIGN LISTENERS
// CAPTURE ORIENTATION ON PAGE LOAD
window.addEventListener("load", () => {
  let width = window.innerWidth;
  let height = window.innerHeight;
  profession = document.getElementById("profession");
  professionPhrase = document.getElementById("profession-phrase");
  startInterval();
  if (width >= height * 1.25) {
    landscapeSwitch();
  } else {
    portraitSwitch();
  }
});

//RE-EVALUTE ORIENTATION ON WINDOW RESIZE
window.addEventListener("resize", () => {
  imageArray.forEach((el) => {
    el.style.transition = "0s";
  });
  let width = window.innerWidth;
  let height = window.innerHeight;
  if (width >= height * 1.25) {
    // initGallery("landscape");
    landscapeSwitch();
  } else {
    // initGallery("portrait");
    portraitSwitch();
  }
  setTimeout(() => {
    imageArray.forEach((el) => {
      el.style.transition = ".1s";
    });
  }, 250);
});

//SWITCH LAYOUT BASED ON MOBILE SCREEN ORIENTATION
window.addEventListener("orientationchange", () => {
  const orientation = screen.orientation;
  if (orientation.type === "landscape-primary") {
    landscapeSwitch();
    // console.log(siteOrientation);
  } else if (orientation.type === "portrait-primary") {
    portraitSwitch();
    // console.log(siteOrientation);
  }
});

function toggleImageTransition(time) {
  if (leftImage) {
    leftImage.style.transition = time;
  }
  if (rightImage) {
    rightImage.style.transtion = time;
  }
  primaryImg.style.transition = time;
}

function listenEvent(event) {
  let yPos = event.wheelDeltaY;
  //   console.log(yPos);
  if (yPos > 130 && listeningToWheel && activeProjectIndex > 0) {
    listeningToWheel = false;
    toggleImageTransition(".1s");
    activeProjectIndex--;
    updateImages(activeList);
    populateDescription(activeList);
    if (activeList === projectList && activeProjectIndex === 0) {
      startInterval();
    } else {
      clearInterval(interval);
    }
    updateColors(activeList);
    setTimeout(() => {
      toggleImageTransition("0s");
      listeningToWheel = true;
    }, 500);
  } else if (
    yPos < -130 &&
    listeningToWheel &&
    activeProjectIndex < activeList.length - 1
  ) {
    listeningToWheel = false;
    toggleImageTransition(".1s");
    activeProjectIndex++;
    updateImages(activeList);
    populateDescription(activeList);
    if (activeList === projectList && activeProjectIndex === 0) {
      startInterval();
    } else {
      clearInterval(interval);
    }
    updateColors(activeList);
    setTimeout(() => {
      toggleImageTransition("0s");
      listeningToWheel = true;
    }, 500);
  }
}

function handleTouchStart(event) {
  initialY = event.touches[0].clientY; // Store initial Y position
  // console.log(initialY);
}

function listenEventMobile(event) {
  console.log("hello");
  if (initialY !== null) {
    const currentY = event.touches[0].clientY;
    const yPos = currentY - initialY;
    // console.log(yPos);
    // Use deltaY for your scrolling logic here
    if (leftImage) {
      leftImage.style.transition = ".1s";
    }
    if (rightImage) {
      rightImage.style.transition = ".1s";
    }
    primaryImg.style.transition = ".1s";
    //   console.log(yPos);
    if (yPos > 0 && listeningToWheel && activeProjectIndex > 0) {
      toggleImageTransition(".1s");
      listeningToWheel = false;
      activeProjectIndex--;
      updateImages(projectList);
      populateDescription(projectList);
      if (activeProjectIndex === 0) {
        startInterval();
      } else {
        clearInterval(interval);
      }
      updateColors(projectList);
      setTimeout(() => {
        toggleImageTransition("0s");
        listeningToWheel = true;
      }, 500);
    } else if (
      yPos < 0 &&
      listeningToWheel &&
      activeProjectIndex < projectList.length - 1
    ) {
      toggleImageTransition(".1s");
      listeningToWheel = false;
      activeProjectIndex++;
      updateImages(projectList);
      populateDescription(projectList);
      if (activeProjectIndex === 0) {
        startInterval();
      } else {
        clearInterval(interval);
      }
      updateColors(projectList);
      setTimeout(() => {
        toggleImageTransition("0s");
        listeningToWheel = true;
      }, 500);
    }

    initialY = currentY; // Update for next touchmove
  }
}

function listener() {
  window.addEventListener("wheel", listenEvent);
  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("touchmove", listenEventMobile);
}

listener();
