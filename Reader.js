/*** constants */
const imgStart = '<img src="';
const imgEnd = ' "width="60%">';

/** variables */
let filePersistance = []; // functions for image processing
let imagePosition = 0;
let lastBodyPosition = 0;
let lastElementPosition = 0;
let darkTheme = false;

let currentDir = "";
let directoryStart = [0];

/*** image collection */
const iList = document.getElementById("imageList");

//*** input box*/
var pages = document.getElementById("pages");
// var description = document.getElementById("description");

/*** buttons */
var backBtn = document.getElementById("backBtn");
var nextBtn = document.getElementById("nextBtn");
var topBtn = document.getElementById("topBtn");
var hideBtn = document.getElementById("hideBtn");
var saveBtn = document.getElementById("saveBtn");
var goBtn = document.getElementById("goBtn");
var removeBtn = document.getElementById("removeBtn");
var settingBtn = document.getElementById("settingBtn");
var themeBtn = document.getElementById("themeBtn");

/** div */
var forPage = document.getElementById("forPage");
var settings = document.getElementById("settings");

/** combo boxes */
var displayType = document.getElementById("displayType");
var locations = document.getElementById("locations");

/** searchbox */
var filepicker = document.getElementById("filepicker");

//todo
/**
 *
 *
 * styling
 *
 *
 * maybe turn settings into a alert box?
 *
 * allow button for themes? on side
 *
 *  * fix button scalling
 * ctrl k - > 0(zero) to collapse all
 *
 */

//event listner to display updated files
filepicker.addEventListener(
  "change",
  function (event) {
    // change file list to an array
    filePersistance = [].slice.call(event.target.files);

    //check if appropriate files exist
    if (filePersistance.length == 0) {
      backBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

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

    //hide extra settings if needed
    if (settingBtn.innerText != "Extra Settings") {
      extraSettings();
    }

    //calculate directory breaks if required
    if (displayType.value == "DIRECTORY") {
      calculateDirectory();
    }

    //disable display method and/or pages
    displayType.disabled = true;
    pages.disabled = true;

    populateImage();
    pageTurn();
  },
  false
);

//calculate the directory breakpoints
function calculateDirectory() {
  let compareDir = relative(filePersistance[0]);

  let index = 0;

  // console.log(filePersistance);
  for (let file of filePersistance) {
    // file.index = index;
    if (compareDir.localeCompare(relative(file)) != 0) {
      // console.log(file);
      // console.log(filePersistance.findIndex(index));
      compareDir = relative(file);
      directoryStart.push(index);
    }
    index++;
  }
  directoryStart.push(filePersistance.length);
  console.log(directoryStart);
}

//event listner to check if page is being selected
displayType.addEventListener(
  "change",
  function (event) {
    //pages
    if (event.target.selectedIndex == 2) {
      forPage.style.display = "block";
    } else {
      forPage.style.display = "none";
      pages.value = "1";
    }
  },
  false
);

//populating the image on the screen, depending on the setting
function populateImage() {
  let innerInput = ""; //puts visually  in order stored
  // console.log(filePersistance.length==0);
  //TODO CHANGE
  if (displayType.value == "ALL") {
    /****/
    for (let file of filePersistance) {
      innerInput += imgStart + URL.createObjectURL(file) + imgEnd;
    }
  } else if (displayType.value == "PAGE") {
    document.getElementById("pageSelection").style.display = "block";

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
  } else if (displayType.value == "DIRECTORY") {
    document.getElementById("pageSelection").style.display = "block";

    //calculate dir starts

    //lastElementLocation
    let start = directoryStart[imagePosition];
    let end = directoryStart[imagePosition + 1];

    for (i = start; i < end; i++) {
      innerInput += imgStart + URL.createObjectURL(filePersistance[i]) + imgEnd;
    }

    // let currentDir = relative(filePersistance[0]);
    // for (let file of filePersistance) {
    //   // check if the same
    //     if (currentDir.localeCompare(relative(file))==0){
    //       innerInput += imgStart + URL.createObjectURL(file) + imgEnd;
    //     } else {
    //       break;
    //     }
    // }
  }

  iList.innerHTML = innerInput;
}

function relative(file) {
  return file.webkitRelativePath.replace(file.name, "");
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

//function actiavted on scroll
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    if (displayType.value == "ALL") {
      saveBtn.disabled = false;
      topBtn.disabled = false;
    }

    // console.log(combo.value);
    if (locations.value != "") {
      locations.style.display = "block";
      goBtn.style.display = "block";
      removeBtn.disabled = false;
      goBtn.disabled = false;
      locations.disabled = false;
    }
  } else {
    saveBtn.disabled = true;
    topBtn.disabled = true;
    removeBtn.disabled = true;
    locations.disabled = true;
    goBtn.disabled = true;
  }

  if (locations.value != "" && document.documentElement.scrollTop > 2000) {
    if (
      locations.options[locations.options.length - 1].text.includes(
        "Last location"
      )
    ) {
      //todo use remove function method
      locations.selectedIndex = locations.options.length - 1;
      removeLocation();
    }
  }
}

//function for 'page' movement
function next() {
  imagePosition += pages.value * 1;
  populateImage();
  pageTurn();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function back() {
  imagePosition += pages.value * -1;
  populateImage();
  pageTurn();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function pageTurn() {
  // console.log(imagePosition);
  if (imagePosition == 0) {
    nextBtn.style.display = "block";
    backBtn.style.display = "none";
  } else if (
    (displayType.value == "PAGE" &&
      imagePosition + pages.value * 1 < filePersistance.length) ||
    (displayType.value == "DIRECTORY" &&
      imagePosition < directoryStart.length - 2)
  ) {
    nextBtn.style.display = "block";
    backBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
    backBtn.style.display = "block";
  }
}

//settings
function extraSettings() {
  if (settingBtn.innerText == "Extra Settings") {
    settingBtn.innerText = "Hide Settings";
    settings.style.display = "block";
  } else {
    settingBtn.innerText = "Extra Settings";
    settings.style.display = "none";
  }
}

//delete the selected location
function removeLocation() {
  locations.remove(locations.selectedIndex);
  if (locations.value == "") {
    locations.disabled = true;
    goBtn.disabled = true;
    removeBtn.disabled = true;
  }
}

//todo maybe change scroll; go to selected comboboxvalue
function goLocation() {
  document.documentElement.scrollTop = locations.value;
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  if (topBtn.innerText == "Top") {
    addLocation("Last location");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}

// add location to combobox
function addLocation(content = "") {
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
  locations.options[locations.options.length] = new Option(
    time + ": " + content,
    document.documentElement.scrollTop
  );

  locations.style.display = "block";
  goBtn.style.display = "block";
  removeBtn.disabled = false;
  locations.disabled = false;
  goBtn.disabled = false;
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

function isDarkModeEnabled() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    darkMode();
  }
}

function darkMode() {
  // toggle all relevant elemts-
  document.body.classList.toggle("dark-mode");
  themeBtn.classList.toggle("dark-mode");
  topBtn.classList.toggle("dark-mode");
  hideBtn.classList.toggle("dark-mode");
  saveBtn.classList.toggle("dark-mode");
  removeBtn.classList.toggle("dark-mode");
  goBtn.classList.toggle("dark-mode");
}

isDarkModeEnabled();
