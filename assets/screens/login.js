import * as $ from "../utils/$";
import * as validator from "../utils/validator";
import { throttle } from "../utils/throttle";
import { allInputValid, inputValidEventListener } from "../utils/validInput.js"
import { addEventSubHeaderLeftBtn } from "../components/subheader";

const form = $.qs('.loginForm');
const signInBtn = $.qs(".signin-submit");
const email = $.qs('input[name=email]', form);
const password = $.qs('input[name=loginPassword]', form);

const checkEmailInput = inputValidEventListener({ validator: validator.email, validDangerText: "올바른 이메일을 입력해주세요." });
const checkPasswordInput = inputValidEventListener({ validator: (_) => true, validDangerText: "올바른 패스워드를 입력해주세요." });

email.addEventListener("focusout", checkEmailInput);
password.addEventListener("focusout", checkPasswordInput);

function submitForm(){
  const emailValue = email.value;
  const passwordValue = password.value;
  if(!(emailValue && password)) return;
  if(validator.email(emailValue) && validator.loginPassword(passwordValue)){
    form.submit();
    return;
  }
}

signInBtn.addEventListener('click', submitForm);

const activeLoginBtn = (target) => {
  const loginFormContainer = target.closest('.loginForm__container');
  const loginBtn = $.qs(".signin-submit", loginFormContainer);
  loginBtn.classList.remove('btn-disable');
};

const inactiveLoginBtn = (target) => {
  const loginFormContainer = target.closest('.loginForm__container');
  const loginBtn = $.qs(".signin-submit", loginFormContainer);
  loginBtn.classList.add('btn-disable');
}

const allInputValidOptions = {
  selector: '.loginForm',
  validator,
  validCb: activeLoginBtn,
  invalidCb: inactiveLoginBtn
};

const throttledAllInputValid = throttle(200, allInputValid(allInputValidOptions));

email.addEventListener("input", throttledAllInputValid);
password.addEventListener("input", throttledAllInputValid);

setInterval(() => {
  allInputValid(allInputValidOptions)({target : email});
  allInputValid(allInputValidOptions)({target : password});
}, 200);

addEventSubHeaderLeftBtn({
  event:'click',
  listener: () => location.href = '/'
});
