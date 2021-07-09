import * as $ from "../utils/$";


const els = $.qsa("input");
const numberPad = $.qsa(".numberPad");
const padContainer = $.qsa(".pad--container");
const engPad = $.qsa(".englishPad");
const engButton = $.qsa(".englishPad > .pad--row > .dialBtn");
const numButton = $.qsa(".numberPad-dial");

let nowTyping = false;
let focusElement = null;
let isShift = false;
let nowPad = false;

for(let i = 0; i < padContainer.length; i++) {
  padContainer[i].addEventListener("mouseenter", (e) => {
    nowTyping = true;
  });
  padContainer[i].addEventListener("mouseleave", (e) => {
    nowTyping = false;
  });
}

for(let i = 0; i < engButton.length; i++) {
  engButton[i].addEventListener("click", (e) => {
    if(focusElement) {
      focusElement.focus();
      let clickedValue = e.target.getAttribute("data-dial-value");
      
      if(clickedValue == null) {
        clickedValue = e.target.innerText;
      }
      
      if(clickedValue.length === 1){
        if(isShift) clickedValue = clickedValue.toUpperCase();
        focusElement.value += clickedValue;
        isShift = false;
      }
      else if(clickedValue === "shift") {
        isShift = true;
      }
      else if(clickedValue === "back") {
        focusElement.value = focusElement.value.slice(0, -1);
      }
      else if(clickedValue === "toNum") {
        nowPad = numberPad;
        togglePad(numberPad);
        togglePad(engPad);
      }
    }
  });
}

for(let i = 0; i < numButton.length; i++) {
  numButton[i].addEventListener("click", (e) => {
    if(focusElement) {
      focusElement.focus();
      let clickedValue = e.target.getAttribute("data-dial-value");
      if(clickedValue == null) {
        clickedValue = e.target.innerText;
      }
      if(clickedValue.length === 1){
        focusElement.value += clickedValue;
      }
      else if(clickedValue === "back") {
        focusElement.value = focusElement.value.slice(0, -1);
      }
      else if(clickedValue === "toEng") {
        nowPad = engPad;
        togglePad(engPad);
        togglePad(numberPad);
      }
    }
  });
}

for(let i = 0 ; i < els.length; i++) {
  els[i].addEventListener("focusin", (e) => {
    if(!focusElement) {
      focusElement = e.target;
      nowPad = engPad;
      togglePad(nowPad);
    }
  });
  els[i].addEventListener("focusout", (e) => {
    if(nowTyping) {
      e.target.focus();
    }
    else {
      focusElement = null;
      togglePad(nowPad);
    }
  });
}

function togglePad(pad) {
  pad[0].classList.toggle("nonExist");
  pad[1].classList.toggle("nonExist");
}
