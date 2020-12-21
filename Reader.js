/****/ // functions for image processing

const imgStart = '<img src="';
const imgEnd = ' "width="60%">';

// last position
let lastBodyPosition = 0;
let lastElementPosition = 0;

document.getElementById("filepicker").addEventListener(
  "change",
  function (event) {
    // change file list to an array
    const arrayForm = [].slice.call(event.target.files);

    // sort array to natural sort
    arrayForm.sort(function (a, b) {
      return a.name.localeCompare(b.name, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });

    let innerInput = ""; //puts visually  in order stored

    /****/ for (let file of arrayForm) {
      innerInput += imgStart + URL.createObjectURL(file) + imgEnd;
    }
    /******/

    const iList = document.getElementById("imageList");
    iList.innerHTML = innerInput;
  },
  false
);

// functions for button functionality

/****/ var topBtn = document.getElementById("topBtn");
var hideBtn = document.getElementById("hideBtn");
const display = document.getElementById("display");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topBtn.style.display = "block";
    hideBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
    // hideBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  if (topBtn.innerText=="Top"){
  storeLocation();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  topBtn.innerText = "Back";

  } else {
    topBtn.innerText = "Top";
    returnLocation();
  }
}

function hideFunction() {
  if (hideBtn.innerText != "Show") {
    storeLocation();

    hideBtn.innerText = "Show";
    display.style.display = "none";
  } else {
    hideBtn.innerText = "Hide";
    display.style.display = "block";

    returnLocation();
  }
}

function storeLocation(){
  lastBodyPosition = document.body.scrollTop;
  lastElementPosition = document.documentElement.scrollTop;
}

function returnLocation(){
  document.body.scrollTop = lastBodyPosition;
  document.documentElement.scrollTop = lastElementPosition;
}