import * as $ from "../utils/$";

let checkBoxChecked = {};

let checkboxImages = $.qsa(".checkbox-input__img");
let checkBoxImageAll = document.getElementById("all");

for(let i=0; i < checkboxImages.length; i++) {
  checkBoxChecked[checkboxImages[i].id] = false;
  if(checkboxImages[i].id === "all") {
    checkboxImages[i].addEventListener("click", (e) => {
      let target = e.target;
      if(target.getAttribute("src") === "/resource/checkbox_F.png") {
        for(let j=0; j < checkboxImages.length; j++) { 
          checkboxImages[j].setAttribute("src", "/resource/checkbox_T.png");
          checkBoxChecked[checkboxImages[j].id] = true;
        }
      }
      else {
        for(let j=0; j < checkboxImages.length; j++) { 
          checkboxImages[j].setAttribute("src", "/resource/checkbox_F.png");
          checkBoxChecked[checkboxImages[j].id] = false;
        }
      }
      console.log(checkAgree());
    });
  }
  else {
    checkboxImages[i].addEventListener("click", (e) => {
      let target = e.target;
      if(target.getAttribute("src") === "/resource/checkbox_F.png") {
        target.setAttribute("src", "/resource/checkbox_T.png");
        checkBoxChecked[checkboxImages[i].id] = true;
      }
      else {
        target.setAttribute("src", "/resource/checkbox_F.png");
        checkBoxChecked[checkboxImages[i].id] = false;
      }
      if(allCheck()) {
        checkBoxImageAll.setAttribute("src", "/resource/checkbox_T.png");
      }
      else {
        checkBoxImageAll.setAttribute("src", "/resource/checkbox_F.png");
      }
      console.log(checkAgree());
    });
  }
}

function allCheck() {
  return checkBoxChecked.agree1 && checkBoxChecked.agree2 && checkBoxChecked.agree3 && checkBoxChecked.agree4 && checkBoxChecked.agree5;
}

function checkAgree() {
  if(checkBoxChecked.all) return true;
  else if(checkBoxChecked.agree1 && checkBoxChecked.agree2 && checkBoxChecked.agree3) return true;
  else return false;
}