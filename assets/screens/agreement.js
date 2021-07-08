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
      checkNext();
    });
  }
  else {
    checkboxImages[i].addEventListener("click", (e) => {
      let target = e.target;
      checkBoxChecked[checkboxImages[i].id] = toggleSrc(target);
      setSrc(checkBoxImageAll, allCheck());
      checkNext();
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

function checkAge() {
  return checkBoxChecked.radio1 || checkBoxChecked.radio2;
}

function checkNext() {
  let bottomButton = document.getElementsByClassName("btn")[0];
  if(checkAgree() && checkAge()) {
    if(bottomButton.classList.contains("btn-disable")) {
      bottomButton.classList.remove("btn-disable");
      bottomButton.classList.add("btn-primary");
    }
  }
  else {
    if(bottomButton.classList.contains("btn-primary")) {
      bottomButton.classList.remove("btn-primary");
      bottomButton.classList.add("btn-disable");
    }
  }
}

let radioButton1 = document.getElementById("radio1");
let radioButton2 = document.getElementById("radio2");

radioButton1.addEventListener("click", (e) => {
  if(e.target.classList.contains("radio__label__up")) {
    e.target.classList.remove("radio__label__up");
    e.target.classList.add("radio__label__up--check");
    radioButton2.classList.remove("radio__label__down--check");
    radioButton2.classList.add("radio__label__down");
    checkBoxChecked[radioButton1.id] = true;
    checkBoxChecked[radioButton2.id] = false;
  }
  else {
    e.target.classList.remove("radio__label__up--check");
    e.target.classList.add("radio__label__up");
    checkBoxChecked[radioButton1.id] = false;
  }
  checkNext();
});

radioButton2.addEventListener("click", (e) => {
  if(e.target.classList.contains("radio__label__down")) {
    e.target.classList.remove("radio__label__down");
    e.target.classList.add("radio__label__down--check");
    radioButton1.classList.remove("radio__label__up--check");
    radioButton1.classList.add("radio__label__up");
    checkBoxChecked[radioButton2.id] = true;
    checkBoxChecked[radioButton1.id] = false;
  }
  else {
    e.target.classList.remove("radio__label__down--check");
    e.target.classList.add("radio__label__down");
    checkBoxChecked[radioButton2.id] = false;
  }
  checkNext();
});


