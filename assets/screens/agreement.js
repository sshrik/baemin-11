import * as $ from "../utils/$";

const checkBoxChecked = {};

let checkboxImages = $.qsa(".checkbox-input__img");
let checkBoxImageAll = document.getElementById("all");

const falseCheckBox = "/resource/checkbox_F.png";
const trueCheckBox = "/resource/checkbox_T.png";

for(let i=0; i < checkboxImages.length; i++) {
  checkBoxChecked[checkboxImages[i].id] = false;
  if(checkboxImages[i].id === "all") {
    checkboxImages[i].addEventListener("click", (e) => {
      let target = e.target;

      let targetBool = target.getAttribute("src") === falseCheckBox;
      for(let j=0; j < checkboxImages.length; j++) { 
        setSrc(checkboxImages[j], targetBool);
        checkBoxChecked[checkboxImages[j].id] = (target.getAttribute("src") === trueCheckBox);
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
  if(dst.getAttribute("src") === falseCheckBox) {
    dst.setAttribute("src", trueCheckBox);
    return true;
  }
  else {
    dst.setAttribute("src", falseCheckBox);
    return false;
  }
}

function setSrc(dst, to) {
  if(to) {
    dst.setAttribute("src", trueCheckBox);
  }
  else {
    dst.setAttribute("src", falseCheckBox);
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

const disabledButton = "btn-disable";
const activeButton = "btn-primary";

function checkNext() {
  let bottomButton = document.getElementsByClassName("btn")[0];
  if(checkAgree() && checkAge()) {
    if(bottomButton.classList.contains(disabledButton)) {
      bottomButton.classList.remove(disabledButton);
      bottomButton.classList.add(activeButton);
    }
  }
  else {
    if(bottomButton.classList.contains(activeButton)) {
      bottomButton.classList.remove(activeButton);
      bottomButton.classList.add(disabledButton);
    }
  }
}

let radioButton1 = document.getElementById("radio1");
let radioButton2 = document.getElementById("radio2");

const uncheckedUpLabel = "radio__label__up";
const uncheckedDownLabel = "radio__label__down";
const checkedUpLabel = "radio__label__up--check";
const checkedDownLabel = "radio__label__down--check";

radioButton1.addEventListener("click", (e) => {
  if(e.target.classList.contains(uncheckedUpLabel)) {
    e.target.classList.remove(uncheckedUpLabel);
    e.target.classList.add(checkedUpLabel);
    radioButton2.classList.remove(checkedDownLabel);
    radioButton2.classList.add(uncheckedDownLabel);
    checkBoxChecked[radioButton1.id] = true;
    checkBoxChecked[radioButton2.id] = false;
  }
  else {
    e.target.classList.remove(checkedUpLabel);
    e.target.classList.add(uncheckedUpLabel);
    checkBoxChecked[radioButton1.id] = false;
  }
  checkNext();
});

radioButton2.addEventListener("click", (e) => {
  if(e.target.classList.contains(uncheckedDownLabel)) {
    e.target.classList.remove(uncheckedDownLabel);
    e.target.classList.add(checkedDownLabel);
    radioButton1.classList.remove(checkedUpLabel);
    radioButton1.classList.add(uncheckedUpLabel);
    checkBoxChecked[radioButton2.id] = true;
    checkBoxChecked[radioButton1.id] = false;
  }
  else {
    e.target.classList.remove(checkedDownLabel);
    e.target.classList.add(uncheckedDownLabel);
    checkBoxChecked[radioButton2.id] = false;
  }
  checkNext();
});

let bottomButton = document.getElementsByClassName("btn")[0];
bottomButton.addEventListener("click", (e) => {
  if(checkAgree() && checkAge()) {
    window.location.href = "/inputPhone";
  }
})
