/*** constants */
const imgStart = '<img src="';
const imgEnd = ' "width="60%">';

/** variables */
let filePersistance = []; // functions for image processing
let imagePosition = 0;
let lastBodyPosition = 0;
let lastElementPosition = 0;

/*** image collection */
const iList = document.getElementById("imageList");

//*** input box*/
var pages = document.getElementById("pages");
var description = document.getElementById("description");

/*** buttons */
var backBtn = document.getElementById("backBtn");
var nextBtn = document.getElementById("nextBtn");
var topBtn = document.getElementById("topBtn");
var hideBtn = document.getElementById("hideBtn");
var saveBtn = document.getElementById("saveBtn");
var goBtn = document.getElementById("goBtn");
var removeBtn = document.getElementById("removeBtn");
var settingBtn = document.getElementById("settingBtn");

/** div */
var forPage = document.getElementById("forPage");
var settings = document.getElementById("settings");

/** combo boxes */
var displayType = document.getElementById("displayType");
var locations = document.getElementById("locations");

/** searchbox */
var filepicker = document.getElementById("filepicker");



//event listner to display updated files
filepicker.addEventListener(
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
    if (settingBtn.innerText!="Extra Settings"){
      extraSettings();
    }
    populateImage();
    pageTurn();
  },
  false
);

//event listner to check if page is being selected
displayType.addEventListener(
  "change",
  function (event) {
      //pages
      if (event.target.selectedIndex==2){
        forPage.style.display="block";
      } else {
        forPage.style.display="none";
      }
  },
  false
);

//populating the image on the screen, depending on the setting
function populateImage() {
  let innerInput = ""; //puts visually  in order stored

  //TODO CHANGE 
  if (displayType.value == "ALL") {
    /****/
    for (let file of filePersistance) {
      innerInput += imgStart + URL.createObjectURL(file) + imgEnd;
    }
   } else if (displayType.value=="PAGE"){
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
    // imagePosition+= (pages.value*1);
  }

  iList.innerHTML = innerInput;
}


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

//function actiavted on scroll
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topBtn.style.display = "block";
    hideBtn.style.display = "block";
    saveBtn.style.display = "block";
    removeBtn.style.display = "block";
    description.style.display = "block";

    // console.log(combo.value);
    if (locations.value != "") {
      locations.style.display = "block";
      goBtn.style.display = "block";
    }
  } else {
    topBtn.style.display = "none";
    saveBtn.style.display = "none";
    locations.style.display = "none";
    goBtn.style.display = "none";
    removeBtn.style.display = "none";
    description.style.display = "none";

    // hideBtn.style.display = "none";
  }

  if (locations.value != "" && document.documentElement.scrollTop > 2000) {
    if (
      locations.options[locations.options.length - 1].text.includes("Last location")
    ) {
      locations.remove(locations.options.length - 1);
    }
  }
}

//function for 'page' movement
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
  console.log(imagePosition);
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

//settings
function extraSettings(){
    if (settingBtn.innerText=="Extra Settings"){
      settingBtn.innerText="Hide Settings";
      settings.style.display="block";
    } else {
      settingBtn.innerText="Extra Settings";
      settings.style.display="none";
    }
}

//delete the selected location
function removeLocation() {
  locations.remove(locations.selectedIndex);
  if (locations.value == "") {
    locations.style.display = "none";
    goBtn.style.display = "none";
  }
}

//todo maybe change scroll; go to selected comboboxvalue
function goLocation() {
  document.documentElement.scrollTop = locations.value;
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
  locations.options[locations.options.length] = new Option(
    time + " : " + content,
    document.documentElement.scrollTop
  );

  locations.style.display = "block";
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
