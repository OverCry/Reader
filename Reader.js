const imgStart = "<img src=\"";
const imgEnd = " \"width=\"80%\">";

let imageFile = null;


const View = () => {
    const input = document.getElementById("path").value;

    const images = document.getElementById("images");
    let photoString = "";

    var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    imageFile=imageFile.sort(collator.compare);

    for (let i=0; i<imageFile.length; i++) {
      photoString+=imgStart + input +"\\"+ imageFile[i]+imgEnd;
    };

    images.innerHTML=photoString;
}

document.getElementById("filepicker").addEventListener("change", function(event) {

    let output = document.getElementById("listing");
    let files = event.target.files;

    imageFile = [];

    // for (let i=0; i<files.length; i++) {
    //   imageFile[i] = files[i].name;
    // };

    let i=0;
    for (const file of files){
      imageFile[i]=file.name;
      i++;
    }

    const item = document.createElement("li");
    if (files.length>0){
      item.innerHTML = "Files has been successfully loaded";
    } else {
      item.innerHTML = "Files has failed to load";

    }
    output.appendChild(item);



  }, false);
