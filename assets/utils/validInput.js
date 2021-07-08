import * as $ from "../utils/$";

export function allInputValid({ selector = document, validator, validCb, invalidCb }){
  return function ({ target }){
    const container = target.closest(selector);
    const inputs = $.qsa('input', container);
    const inputsValueWithName = [...inputs].map(({ name, value }) => ({ name, value}));
    if(inputsValueWithName.every(({ name, value }) => validator[name](value))){
      validCb(target);
      return;
    }else{
      invalidCb(target);
      return;
    }
  }
}

export function inputValidEventListener({ validator, validDangerText }){
  return function({target}){
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

export function validInput({container, target, validator, validDangerText }){
  const { value } = target;
  let dangerSpan = $.qs('.danger-text', container);
  if(!dangerSpan){
    dangerSpan = $.createEl('span');
    dangerSpan.classList.add('danger-text');
    container.appendChild(dangerSpan);
  }
  if(!value){
    target.classList.add("input--not-filled");
    target.classList.remove("input--filled");
    dangerSpan.innerText = "값을 입력해주세요.";
    return { valid: false, span: dangerSpan };
  }else{
    target.classList.add("input--filled");
    target.classList.remove("input--not-filled");
  }
  const isValid = validator(value);
  if(!isValid){
    dangerSpan.innerText = validDangerText;
    return { valid: false, span: dangerSpan };
  } 
  return { valid: true, span: dangerSpan };
}