import * as $ from "../utils/$";
import * as validator from "../utils/validator";
import { allInputValid, inputValidEventListener, addEventInputBtns } from "../utils/validInput.js"
import { throttle } from "../utils/throttle";
import * as Tmpl from "../utils/tmpl";
import { autoFillDot } from "../utils/inputUtils";

const email = $.qs("input[name=email]");
const checkDuplicateBtn = $.qs(".duplicate-btn");

const checkEmailInput = inputValidEventListener({ validator: validator.email, validDangerText: "올바른 이메일을 입력해주세요." });

email.addEventListener("focusout", checkEmailInput);
addEventInputBtns('#inputEmail__inputButtonContainer__left', validator);

const activeDuplicateBtn = () => {
  checkDuplicateBtn.classList.add('subButton__container--active');
};

const inactiveDuplicateBtn = () => {
  checkDuplicateBtn.classList.remove('subButton__container--active');
}

const emailValidOptions = {
  selector:'#inputEmail__inputButtonContainer__left',
  validator: {
    email: validator.email
  },
  validCb: activeDuplicateBtn,
  invalidCb: inactiveDuplicateBtn
};

const throttledEmailValid = throttle(200, allInputValid(emailValidOptions));
email.addEventListener('input', throttledEmailValid);
checkDuplicateBtn.addEventListener('click', () => {
  const emailValue = email.value;
  if(!validator.email(emailValue)) return;
  fetch('/api/checkDup', {
    method:"POST",
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      id: emailValue
    })
  })
  .then(res => res.json())
  .then(({ result, msg }) => {
    if(result){
      alert(msg);
      appendSignUpForm();
      return;
    }
    alert(msg);
    return;
  })

})

function appendSignUpForm(){
  const inputEmailContainer = $.qs('#inputEmail__container');
  const inputsContainer = $.createEl("div");
  if($.qs('.inputEmail__anothor__inputs')) return;
  inputsContainer.classList.add("inputEmail__anothor__inputs")
  const nicknameInputHTML = Tmpl.Input({ 
    name: "nickname", 
    headerText: "닉네임", 
    placeholder: "닉네임을 입력해주세요", 
    isIcon: true }); 
  const passwordInput = Tmpl.Input({ 
    name: "password", 
    headerText: "비밀번호", 
    placeholder: "비밀번호을 입력해주세요", 
    type: "password",
    isIcon: true }); 
  const birthInput = Tmpl.Input({ 
    name: "birth", 
    headerText: "생년월일", 
    placeholder: "예) 2000.01.01", 
    isIcon: true });  

  const checkNicknameInput = inputValidEventListener({ validator: validator.nickname, validDangerText: "올바른 닉네임을 입력해주세요." });
  const checkPasswordInput = inputValidEventListener({ validator: validator.password, validDangerText: "10자 이상 영어 대문자, 소문자, 숫자, 특수문자 중 2종류를 조합해야 합니다." });
  const checkBirthInput = inputValidEventListener({ validator: validator.birth, validDangerText: "올바른 생년월일을 입력해주세요." });

  inputsContainer.innerHTML += nicknameInputHTML + passwordInput + birthInput;
  inputEmailContainer.appendChild(inputsContainer);

  const nickNameEl = $.qs("input[name=nickname]");
  const passwordEl = $.qs("input[name=password]");
  const birthEl = $.qs("input[name=birth]");

  const activeFinishBtn = (target) => {
    const container = target.closest('.container');
    const finishBtn = $.qs(".finish-btn", container);
    finishBtn.classList.add('active');
  };
  
  const inactiveFinishBtn = (target) => {
    const container = target.closest('.container');
    const finishBtn = $.qs(".finish-btn", container);
    finishBtn.classList.remove('active');
  }
  
  const allInputValidOptions = {
    selector: '.container',
    validator,
    validCb: activeFinishBtn,
    invalidCb: inactiveFinishBtn
  };
  
  const throttledAllInputValid = throttle(200, allInputValid(allInputValidOptions));

  email.addEventListener("input", throttledAllInputValid)
  nickNameEl.addEventListener("input", throttledAllInputValid);
  passwordEl.addEventListener("input", throttledAllInputValid);
  birthEl.addEventListener("input", throttledAllInputValid);

  nickNameEl.addEventListener("blur", checkNicknameInput);
  passwordEl.addEventListener("blur", checkPasswordInput);

  const autoFillDotInput = ({ target }) => {
    const { value } = target;
    target.value = autoFillDot(value);
  }

  birthEl.addEventListener("blur", checkBirthInput);
  birthEl.addEventListener("input", autoFillDotInput);

  addEventInputBtns('.inputEmail__anothor__inputs', validator);

  const finishBtn = $.qs(".finish-btn");
  const submitSignUpForm = () => {
    const container = $.qs(".container");
    const inputs = $.qsa('input', container);
    const inputsValueWithName = [...inputs].map(({ name, value }) => ({ name, value}));
    if(!inputsValueWithName.every(({ name, value }) => validator[name] ? validator[name](value) : false)) return;
    const emailValue = email.value;
    const password = passwordEl.value;
    
    fetch("/api/signUp",{
      method: "POST",
      headers:{
        'Content-type':'application/json',
      },
      body: JSON.stringify({
        id: emailValue,
        pw: password
      })
    })
    .then(res => res.json())
    .then(res => {
      const { result, msg } = res;
      if(result === "sucess"){
        alert(msg);
        location.href = '/login';
        return;
      }
      alert(msg);
      return;
    });
  }
  finishBtn.addEventListener("click", submitSignUpForm);
}