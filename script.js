var biggestIndex = 1;

var welcomeScreen = document.querySelector("#welcome");
var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");


var photosScreen = document.querySelector("#photos");
var photosScreenClose = document.querySelector("#photosclose");
var photosScreenOpen = document.querySelector("#photosScreenOpen");

var weather = document.querySelector("#weather");
var weatherClose = document.querySelector("#weatherClose");
var weatherOpen = document.querySelector("#weatherOpen");


var settings = document.querySelector("#settings");
var settingsClose = document.querySelector("#settingsClose");
var settingsOpen = document.querySelector("#settingsOpen");

var topBar = document.querySelector("#top");

var hour = 0;

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  const header = document.getElementById(elmnt.id + "header");
  if (header) {
    header.onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

window.onload = function () {
  dragElement(document.getElementById("welcome"));
  dragElement(document.getElementById("photos"));
  dragElement(document.getElementById("weather"));
  dragElement(document.getElementById("settings"));
};

function closeWindow(element) {
  element.style.display = "none";
}

function openWindow(element) {
  element.style.display = "block";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () => handleWindowTap(element));
}

addWindowTapHandling(welcomeScreen);
addWindowTapHandling(photosScreen);
addWindowTapHandling(weather);
addWindowTapHandling(settings);

welcomeScreenClose.addEventListener("click", function () {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function () {
  openWindow(welcomeScreen);
});

photosScreenClose.addEventListener("click", function () {
  closeWindow(photosScreen);
});

photosScreenOpen.addEventListener("click", function () {
  openWindow(photosScreen);
});

weatherClose.addEventListener("click", function () {
  closeWindow(weather);
});

weatherOpen.addEventListener("click", function () {
  openWindow(weather);
});

settingsClose.addEventListener("click", function () {
  closeWindow(settings);
});

settingsOpen.addEventListener("click", function () {
  openWindow(settings);
});



// Time
function updateTime() {
  if (hour == 0) {
    const currentTime = new Date().toLocaleString(undefined, { hour12: false });
    document.querySelector("#timeElement").innerHTML = currentTime;
  }
  else {
    const currentTime = new Date().toLocaleString(undefined, { hour12: true });
    document.querySelector("#timeElement").innerHTML = currentTime;
  }
}
setInterval(updateTime, 1000);



// Settings
const checkbox = document.getElementById("hour");

checkbox.addEventListener("change", function () {
  if (this.checked) {
    hour = 1;
    const currentTime = new Date().toLocaleString(undefined, { hour12: true });
    document.querySelector("#timeElement").innerHTML = currentTime;

  } else {
    hour = 0;
    const currentTime = new Date().toLocaleString(undefined, { hour12: false });
    document.querySelector("#timeElement").innerHTML = currentTime;

  }
});