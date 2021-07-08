const imgs = `
  <img src="/resource/cancel.png" alt="cancel button" class="cancleButton nonExist" />
  <img src="/resource/grayCheck.png" data-checked='/resource/mintCheck.png' data-unchecked='/resource/grayCheck.png' alt="Check button" class="checkButton" />
`

export const Input = ({ name, headerText, placeholder, type = "text", isIcon = false }) => `
<div class="input-container">
  <p class="header-text">${headerText}</p>
  <div class="input-container__body">
    <input name="${name}" type="${type}" class="input--not-filled" placeholder="${placeholder}" />
    ${isIcon ? imgs : ''}
  </div>
</div>`