import * as $ from "../utils/$";
import * as validator from "../utils/validator";
import { throttle } from "./throttle";

export function addEventInputBtns(selector, validator){
  const container = $.qs(selector);
  const checkBtns = $.qsa(".checkButton", container);
  const cancleBtns = $.qsa(".cancleButton", container);

  const showCancleBtnFn = (cancle, check) => () => {
    cancle.classList.remove("nonExist");
    check.classList.add("nonExist");
  }
  const hideCancleBtnFn = (cancle, check) => () => {
    cancle.classList.add("nonExist");
    check.classList.remove("nonExist");
  }

  const changeCheckBtnFn = (checkBtn) => ({ target }) => {
    const { checked, unchecked } = checkBtn.dataset;
    const { name } = target;
    const validate = validator[name] ? validator[name] : () => true;
    if(!validate(target.value)){
      checkBtn.src = unchecked;
      return;
    }
    checkBtn.src = checked;
  }

  const removeInputValueFn = (input) => () => {
    input.value = '';
    input.focus();
  }

  const removeInputFocusOutFn = (input, fn) => () => {
    input.removeEventListener('blur', fn);
  }

  const addInputFocusOutFn = (input, fn) => () => {
    input.addEventListener('blur', fn);
  }
  
  [...checkBtns].forEach(checkBtn => {
    const container = checkBtn.closest(".input-container__body");
    const input = $.qs('input', container);
    const throttledchangeCheckBtn = throttle(200, changeCheckBtnFn(checkBtn));
    input.addEventListener("input", throttledchangeCheckBtn);
  });

  [...cancleBtns].forEach(cancleBtn => {
    const container = cancleBtn.closest(".input-container__body");
    const checkBtn = $.qs(".checkButton", container);
    const input = $.qs('input', container);
    const showCancleBtn = showCancleBtnFn(cancleBtn, checkBtn);
    const hideCancleBtn = hideCancleBtnFn(cancleBtn, checkBtn);
    const removeInputValue = removeInputValueFn(input);

    cancleBtn.addEventListener("click", removeInputValue);
    cancleBtn.addEventListener("mouseenter", removeInputFocusOutFn(input, hideCancleBtn));
    cancleBtn.addEventListener("mouseleave", addInputFocusOutFn(input, hideCancleBtn));
    input.addEventListener("blur", hideCancleBtn);
    input.addEventListener("focus", showCancleBtn);
  });
}

export function allInputValid({ selector, validator, validCb, invalidCb }){
  return function ({ target }){
    const container = target.closest(selector);
    const inputs = $.qsa('input', container);
    const inputsValueWithName = [...inputs].map(({ name, value }) => ({ name, value}));
    if(inputsValueWithName.every(({ name, value }) => validator[name] ? validator[name](value) : false)){
      validCb(target);
      return;
    }else{
      invalidCb(target);
      return;
    }
  }
}

export function inputValidEventListener({ validator, validDangerText }){
  return function({ target }){
    const inputContainer = target.closest('.input-container__body');
    const { valid, span } = validInput({ 
      container: inputContainer,
      target,
      validator,
      validDangerText
    });
    if(!valid) return;  
    inputContainer.removeChild(span);
  }
}

const activeDanger = (target) => {
  target.classList.add("input--not-filled");
  target.classList.remove("input--filled");
  target.classList.add("input--danger");
}

const inactiveDanger = (target) => {
  target.classList.add("input--filled");
  target.classList.remove("input--not-filled");
}

export function validInput({ container, target, validator, validDangerText }){
  const { value } = target;
  let dangerSpan = $.qs('.danger-text', container);
  if(!dangerSpan){
    dangerSpan = $.createEl('span');
    dangerSpan.classList.add('danger-text');
    container.appendChild(dangerSpan);
  }

  if(!value){
    activeDanger(target);
    dangerSpan.innerText = "값을 입력해주세요.";
    return { valid: false, span: dangerSpan };
  }else{
    inactiveDanger(target);
  }
  const isValid = validator(value);
  if(!isValid){
    dangerSpan.innerText = validDangerText;
    target.classList.add("input--danger");
    return { valid: false, span: dangerSpan };
  }
  target.classList.remove("input--danger");
  return { valid: true, span: dangerSpan };
}