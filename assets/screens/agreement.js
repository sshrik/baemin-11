import * as $ from "../utils/$";

let checkBoxChecked = {};

let checkboxImages = $.qsa(".checkbox-input__img");
let checkBoxImageAll = document.getElementById("all");

for(let i=0; i < checkboxImages.length; i++) {
  checkBoxChecked[checkboxImages[i].id] = false;
  if(checkboxImages[i].id === "all") {
    checkboxImages[i].addEventListener("click", (e) => {
      let target = e.target;

      let targetBool = target.getAttribute("src") === "/resource/checkbox_F.png";
      for(let j=0; j < checkboxImages.length; j++) { 
        setSrc(checkboxImages[j], targetBool);
        checkBoxChecked[checkboxImages[j].id] = (target.getAttribute("src") === "/resource/checkbox_T.png");
      }

      console.log(checkAgree());
    });
  }
  else {
    checkboxImages[i].addEventListener("click", (e) => {
      let target = e.target;
      checkBoxChecked[checkboxImages[i].id] = toggleSrc(target);
      setSrc(checkBoxImageAll, allCheck());
      console.log(checkAgree());
    });
  }
}

function toggleSrc(dst) {
  if(dst.getAttribute("src") === "/resource/checkbox_F.png") {
    dst.setAttribute("src", "/resource/checkbox_T.png");
    return true;
  }
  else {
    dst.setAttribute("src", "/resource/checkbox_F.png");
    return false;
  }
}

function setSrc(dst, to) {
  if(to) {
    dst.setAttribute("src", "/resource/checkbox_T.png");
  }
  else {
    dst.setAttribute("src", "/resource/checkbox_F.png");
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