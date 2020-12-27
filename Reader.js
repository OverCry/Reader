/** */
let filePersistance = []; // functions for image processing
let imagePosition = 0;

//***/
let pages = document.getElementById("pages");
let backBtn = document.getElementById("backBtn");
let nextBtn = document.getElementById("nextBtn");

/****/ const imgStart = '<img src="';
let imgEnd = ' "width="60%">';

// last position
let lastBodyPosition = 0;
let lastElementPosition = 0;

document.getElementById("filepicker").addEventListener(
  "change",
  function (event) {
    // change file list to an array
    filePersistance = [].slice.call(event.target.files);
    // console.log(arrayForm);

    // sort array to natural sort
    filePersistance.sort(function (a, b) {
      return a.webkitRelativePath.localeCompare(
        b.webkitRelativePath,
        undefined,
        {
          numeric: true,
          sensitivity: "base",
        }
      );
    });
    populateImage();
    pageTurn();
  },
  false
);

function populateImage() {
  let innerInput = ""; //puts visually  in order stored

  if (pages.value == 0) {
    /****/
    for (let file of filePersistance) {
      innerInput += imgStart + URL.createObjectURL(file) + imgEnd;
    }
  } else {
    document.getElementById("pageSelection").style = "block";

    //todo dumb for loop maybe have something better
    for (i = 0; i < pages.value; i++) {
      if (filePersistance.length > imagePosition + i) {
        innerInput +=
          imgStart +
          URL.createObjectURL(filePersistance[imagePosition + i]) +
          imgEnd;
      } else {
        break;
      }
    }
    // imagePosition+= (pages.value*1);
  }
  /******/

  const iList = document.getElementById("imageList");
  iList.innerHTML = innerInput;
}

// document.getElementById("fileMulti").addEventListener(
//   "change",
//   function (event) {

//     // change file list to an array
//     const arrayForm = [].slice.call(event.target.files);
//     console.log(arrayForm);

//     // sort array to natural sort
//     arrayForm.sort(function (a, b) {
//       return a.name.localeCompare(b.name, undefined, {
//         numeric: true,
//         sensitivity: "base",
//       });
//     });

//     let innerInput = ""; //puts visually  in order stored

//     /****/ for (let file of arrayForm) {
//       innerInput += imgStart + URL.createObjectURL(file) + imgEnd;
//     }
//     /******/

//     const iList = document.getElementById("imageList");
//     iList.innerHTML = innerInput;
//   },
//   false
// );

// functions for button functionality

/****/
var topBtn = document.getElementById("topBtn");
var hideBtn = document.getElementById("hideBtn");
var saveBtn = document.getElementById("saveBtn");
var goBtn = document.getElementById("goBtn");
var removeBtn = document.getElementById("removeBtn");
let combo = document.getElementById("locations");
let description = document.getElementById("description");
const display = document.getElementById("display");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topBtn.style.display = "block";
    hideBtn.style.display = "block";
    saveBtn.style.display = "block";
    removeBtn.style.display = "block";
    description.style.display = "block";

    // console.log(combo.value);
    if (combo.value != "") {
      combo.style.display = "block";
      goBtn.style.display = "block";
    }
  } else {
    topBtn.style.display = "none";
    saveBtn.style.display = "none";
    combo.style.display = "none";
    goBtn.style.display = "none";
    removeBtn.style.display = "none";
    description.style.display = "none";

    // hideBtn.style.display = "none";
  }

  if (combo.value != "" && document.documentElement.scrollTop > 2000) {
    if (
      combo.options[combo.options.length - 1].text.includes("Last location")
    ) {
      combo.remove(combo.options.length - 1);
    }
  }
}

function next() {
  imagePosition += pages.value * 1;
  populateImage();
  pageTurn();
}

function back() {
  imagePosition += pages.value * -1;
  populateImage();
  pageTurn();
}

function pageTurn() {
  if (imagePosition == 0) {
    nextBtn.style.display = "block";
    backBtn.style.display = "none";
  } else if (imagePosition + pages.value * 1 < filePersistance.length) {
    nextBtn.style.display = "block";
    backBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
    backBtn.style.display = "block";
  }
}

//delete the selected location
function removeLocation() {
  combo.remove(combo.selectedIndex);
  if (combo.value == "") {
    combo.style.display = "none";
    goBtn.style.display = "none";
  }
}

//todo maybe change scroll; go to selected comboboxvalue
function goLocation() {
  document.documentElement.scrollTop = combo.value;
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  if (topBtn.innerText == "Top") {
    // storeLocation();
    addLocation("Last location");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}

// add location to combobox
function addLocation(content = description.value) {
  var today = new Date();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();
  var time =
    (hour < 10 ? "0" + hour : hour) +
    ":" +
    (minute < 10 ? "0" + minute : minute) +
    ":" +
    (second < 10 ? "0" + second : second);
  combo.options[combo.options.length] = new Option(
    time + " : " + content,
    document.documentElement.scrollTop
  );

  combo.style.display = "block";
  goBtn.style.display = "block";
}

// for 'hide'
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
function storeLocation() {
  lastBodyPosition = document.body.scrollTop;
  lastElementPosition = document.documentElement.scrollTop;
}
function returnLocation() {
  document.body.scrollTop = lastBodyPosition;
  document.documentElement.scrollTop = lastElementPosition;
}
