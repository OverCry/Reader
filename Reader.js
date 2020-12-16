const imgStart = "<img src=\"";
const imgEnd = " \"width=\"60%\">";

document.getElementById("filepicker").addEventListener("change", function(event) {

    // change file list to an array
    const arrayForm = [].slice.call(event.target.files);

    // sort array to natural sort
    arrayForm.sort(function(a,b){
      return (a.name).localeCompare(b.name, undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    });


      /****/ //puts visually  in order stored
      for (let file of arrayForm){

        let img = new Image;
        img.src = URL.createObjectURL(file);
        img.title = file.name;
    
        document.getElementById('list').appendChild(img);

        console.log(file);
      }
      /******/

  }, false);



var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}