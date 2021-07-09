import { addEventSubHeaderLeftBtn } from "../components/subheader";
import * as $ from "../utils/$";
import { autoFillDash } from "../utils/inputUtils";
import { throttle } from "../utils/throttle";
import * as validator from "../utils/validator";
import { inputValidEventListener, validInput, addEventInputBtns, allInputValid } from "../utils/validInput";

const phoneInput = $.qs('input[name=phone]');
const verifyBtn = $.qs('.verify-btn');

const autoFillDashInput = ({ target }) => {
  const { value } = target;
  target.value = autoFillDash(value);
}

phoneInput.addEventListener('input', autoFillDashInput);
addEventInputBtns('.input-container', validator);

const validInputOptions = {
  validator: validator.phone,
  validDangerText: '올바른 핸드폰 번호를 입력해주세요.'
};

const checkPhone = inputValidEventListener(validInputOptions);

phoneInput.addEventListener('focusout', checkPhone);

const getVerifyNum = ({ target }) => {
  const phoneInputContainer = phoneInput.closest(".input-container__body");
  const { valid, span } = validInput({
    container: phoneInputContainer,
    target: phoneInput,
    ...validInputOptions
  });
  if(!valid) return;
  appendVerifyNumInput(verifyBtn);
}

verifyBtn.addEventListener("click", getVerifyNum);

function appendVerifyNumInput(target){
  const verifyNumInputContainer = target.closest("#inputPhone__buttonContainer");
  verifyNumInputContainer.removeChild(target);
  const verifyNumInputElements = $.el(`
    <div class="input-container">
      <p class="header-text">인증번호</p>
      <div class="input-container__body">
        <input name="verify-num" type="text" class="input--not-filled" placeholder="인증번호를 입력해주세요" />
      </div>
      <div id="inputPhone__textButtonContainer">
        <div class="textButton__container">
          <p class="textButton__contents textButton-mint refresh-verify-num">
            인증번호 다시받기
          </p>
        </div>
      </div>
    </div>`);
  const verifyNumInput = $.qs('input[name="verify-num"]', verifyNumInputElements);
  const refreshBtn = $.qs(".refresh-verify-num", verifyNumInputElements);

  const activeNextBtn = () => {    
    const nextBtn = $.qs(".next-btn");
    nextBtn.classList.add('active');
  };
  
  const inactiveNextBtn = () => {
    const nextBtn = $.qs(".next-btn");
    nextBtn.classList.remove('active');
  }
  
  const allInputValidOptions = {
    selector: '#inputPhone__buttonContainer',
    validator: {
      'verify-num': (str) => str.length === 4
    },
    validCb: activeNextBtn,
    invalidCb: inactiveNextBtn
  };
  
  const throttledAllInputValid = throttle(200, allInputValid(allInputValidOptions));

  const checkVerifyNum = inputValidEventListener({ validator: (str) => str.length === 4, validDangerText: '' });

  verifyNumInput.addEventListener('input', ({ target }) => {
    target.value = target.value.replace(/[^0-9]/g, "").slice(0, 4);
  });
  verifyNumInput.addEventListener('input', checkVerifyNum);
  verifyNumInput.addEventListener('input', throttledAllInputValid);

  refreshBtn.addEventListener('click', e => alert("인증번호 다시 받기!"));

  verifyNumInputContainer.appendChild(verifyNumInputElements);

  const nextBtn = $.qs(".next-btn");
  const nextStep = () => {
    const { value } = verifyNumInput;
    if(value.length < 4) return;
    alert("다음단계로 고");
  };

  nextBtn.addEventListener("click", nextStep);
}

addEventSubHeaderLeftBtn({
  event:'click',
  listener: () => location.href = '/agreement'
})