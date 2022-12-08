const validateRegisterModal = (registrationPopup) => {
  const registerEmailForm = document.querySelector('#register_email');
  const registerPasswordForm = document.querySelector('#register_password');
  const registerPasswordRepeatForm = document.querySelector(
    '#register_repeat-password'
  );
  const removeAllParagraphs = () => {
    const allParagraphs = registrationPopup.querySelectorAll('p');
    allParagraphs.forEach((p) => {
      p.remove();
    });
  };
  const repeatPasswordInputBox = document.querySelector(
    '#repeat-password-input-box'
  );
  let validationError = false;
  const passwordInputBox = document.querySelector('#password-input-box');
  const validatePassword = () => {
    let errorText = document.createElement('p');
    errorText.innerHTML = 'Пароли должны совпадать';
    if (registerPasswordForm.value !== registerPasswordRepeatForm.value) {
      passwordInputBox.classList.add('error-input');
      repeatPasswordInputBox.classList.add('error-input');
      repeatPasswordInputBox.append(errorText);
      validationError = true;
    }
  };

  const registerNicknameForm = document.querySelector('#register_nickname');
  const emailInputBox = document.querySelector('#email-input-box');
  const validateAllInputValue = () => {
    const nicknameInputBox = document.querySelector('#nickname-input-box');
    const errorText = document.createElement('p');
    errorText.innerHTML = 'Все поля должны быть заполнены';
    if (
      !registerNicknameForm.value ||
      !registerEmailForm.value ||
      !registerPasswordForm.value ||
      !registerPasswordRepeatForm.value
    ) {
      nicknameInputBox.classList.add('error-input');
      emailInputBox.classList.add('error-input');
      passwordInputBox.classList.add('error-input');
      repeatPasswordInputBox.classList.add('error-input');
      repeatPasswordInputBox.append(errorText);
      validationError = true;
    }
  };
  const validateEmail = () => {
    const value = registerEmailForm.value;
    const indexOfAt = value.indexOf('@');
    const indexOfDot = value.indexOf('.');
    const strBeforeAt = value.slice(0, indexOfAt);
    const strAfterAt = value.slice(indexOfAt + 1, indexOfDot);
    const strAfterDot = value.slice(indexOfDot + 1);
    const errorText = document.createElement('p');
    errorText.innerHTML = 'Введите корректный Email';
    if (
      indexOfAt === -1 ||
      indexOfDot === -1 ||
      strBeforeAt.length < 1 ||
      strAfterAt.length < 1 ||
      strAfterDot < 1
    ) {
      validationError = true;
      emailInputBox.classList.add('error-input');
      emailInputBox.append(errorText);
    }
  };
  removeAllParagraphs();
  validatePassword();
  validateAllInputValue();
  validateEmail();
  const allInputs = document.querySelectorAll('input');
  const allInputBoxes = document.querySelectorAll('.input-box');
  if (!validationError) {
    alert(
      `${registerNicknameForm.value} ${registerEmailForm.value} ${registerPasswordForm.value} ${registerPasswordRepeatForm.value}`
    );
    allInputs.forEach((input) => {
      input.value = '';
    });
    allInputBoxes.forEach((box) => {
      box.classList.remove('error-input');
    });
  }
};

export default validateRegisterModal;
