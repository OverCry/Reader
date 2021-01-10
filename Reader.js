/*** constants */
const imgStart = '<img src="';
const imgEnd = ' "width="80%">';

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
var widthPBtn = document.getElementById("widthPBtn");
var widthMBtn = document.getElementById("widthMBtn");

/** div */
var forPage = document.getElementById("forPage");
var settings = document.getElementById("settings");
var extraTools = document.getElementById("extraTools");
var imageList = document.getElementById("imageList");
var block = document.getElementById("block");


/** combo boxes */
var displayType = document.getElementById("displayType");
var locations = document.getElementById("locations");

/** searchbox */
var filepicker = document.getElementById("filepicker");

var drop = document.getElementById("drop");



//event listner to display updated files
drop.addEventListener(
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

    //display scalling
    widthPBtn.style.display="block";
    widthMBtn.style.display="block";

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

    if (displayType.value == "ALL") {
      extraTools.style.display="block";
    }


    //disable display method and/or pages
    displayType.disabled = true;
    pages.disabled = true;

    populateImage();
    pageTurn();
  },
  false
);

//event listner to check if page is being selected
//reset page value on change
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

//calculate the directory breakpoints
//for page mode
function calculateDirectory() {
  let compareDir = relative(filePersistance[0]);
  let index = 0;

  for (let file of filePersistance) {
    if (compareDir.localeCompare(relative(file)) != 0) {
      compareDir = relative(file);
      directoryStart.push(index);
    }
    index++;
  }
  directoryStart.push(filePersistance.length);
  console.log(directoryStart);
}

//populating the image on the screen, depending on the setting
function populateImage() {

  let innerInput = ""; 
  if (displayType.value == "ALL") {
    /****/
    for (let file of filePersistance) {
      innerInput += imgStart + URL.createObjectURL(file) + imgEnd;
    }
  } else if (displayType.value == "PAGE") {
    document.getElementById("pageSelection").style.display = "block";

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
  }

  iList.innerHTML = innerInput;
}

//private function used to calculate the relative path of the file
//used for directory mode
function relative(file) {
  return file.webkitRelativePath.replace(file.name, "");
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

// Resizing width of buttons depending on the size
window.onresize = function () {
  detectWidth();
}

//private function actiavted on scroll
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topBtn.style.display="block";
    if (displayType.value == "ALL") {
      saveBtn.disabled = false;
      topBtn.disabled = false;
    }

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

//setting function to open/close options
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

//go to selected comboboxvalue
function goLocation() {
  document.documentElement.scrollTop = locations.value;
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  
    addLocation("Last location");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  
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
//functions to store scroll distance
function storeLocation() {
  lastBodyPosition = document.body.scrollTop;
  lastElementPosition = document.documentElement.scrollTop;
}
//functions to return to stored scroll distance
function returnLocation() {
  document.body.scrollTop = lastBodyPosition;
  document.documentElement.scrollTop = lastElementPosition;
}

// for 'hide' all content
function hideFunction() {
  if (hideBtn.innerText != "S") {
    storeLocation();
    hideBtn.innerText = "S";
    display.style.display = "none";
    themeBtn.style.display = "none";
    block.style.display = "block";
  } else {
    hideBtn.innerText = "H";
    display.style.display = "block";
    themeBtn.style.display = "block";
    block.style.display = "none";
    returnLocation();
  }
}

// detecting users preferance
function checkDarkMode() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    darkMode();
  }
}

//toggling desired theme
function darkMode() {
  // toggle all relevant elemts-
  document.body.classList.toggle("dark-mode");
  themeBtn.classList.toggle("dark-mode");
  topBtn.classList.toggle("dark-mode");
  hideBtn.classList.toggle("dark-mode");
  saveBtn.classList.toggle("dark-mode");
  removeBtn.classList.toggle("dark-mode");
  goBtn.classList.toggle("dark-mode");
  widthMBtn.classList.toggle("dark-mode");
  widthPBtn.classList.toggle("dark-mode");
}

//functions to modify image displayed 
function increaseWidth(){
  widthMBtn.disabled=false;
  imageList.style.width = (Number(imageList.style.width.replace("%","")) + 5 )+ "%";
  if (imageList.style.width == "100%"){
    // imageList.style.width = "100%";
    widthPBtn.disabled=true;
  }
}
function decreaseWidth(){
  widthPBtn.disabled=false;
  imageList.style.width = (Number(imageList.style.width.replace("%","")) - 5 )+ "%";
  if (imageList.style.width == "40%"){
    // imageList.style.width = "5%";

    widthMBtn.disabled=true;
  }
}

// function when window is resized
function detectWidth() {
  var width = document.body.clientWidth;
  
  //smaller than some amount
  if (width>1800){
    themeBtn.innerText="Mode";
    topBtn.innerText="Top";
    saveBtn.innerText="Add";
    removeBtn.innerText="Del";
    goBtn.innerText="Go";
  } else if (width>1200) {
    themeBtn.innerText="M";
    topBtn.innerText="T";
    saveBtn.innerText="A";
    removeBtn.innerText="R";
    goBtn.innerText="G";
  } else {
    themeBtn.innerText="";
    topBtn.innerText="";
    saveBtn.innerText="";
    removeBtn.innerText="";
    goBtn.innerText="";
  }

}

function display(){
  var x = document.getElementById('entry_value')
  document.getElementById('fileName').innerHTML = x.value.split('\\').pop()
  alert()
}

//set dark mode theme if default
checkDarkMode();
detectWidth();