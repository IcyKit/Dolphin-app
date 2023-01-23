const validateRegisterModal = async (registrationPopup) => {
  let spinner = document.querySelector("#spinnerReg");
  spinner.classList.remove("spinner-hide");
  spinner.classList.add("spinner-show");
  const registerEmailForm = document.querySelector("#register_email");
  const registerPasswordForm = document.querySelector("#register_password");
  const registerPasswordRepeatForm = document.querySelector(
    "#register_repeat-password"
  );
  const removeAllParagraphs = () => {
    const allParagraphs = registrationPopup.querySelectorAll("p");
    allParagraphs.forEach((p) => {
      p.remove();
    });
  };
  const repeatPasswordInputBox = document.querySelector(
    "#repeat-password-input-box"
  );
  let validationError = false;
  const passwordInputBox = document.querySelector("#password-input-box");
  const validatePassword = () => {
    let errorText = document.createElement("p");
    errorText.innerHTML = "Пароли должны совпадать";
    if (registerPasswordForm.value !== registerPasswordRepeatForm.value) {
      passwordInputBox.classList.add("error-input");
      repeatPasswordInputBox.classList.add("error-input");
      repeatPasswordInputBox.append(errorText);
      validationError = true;
    }
  };

  const registerNicknameForm = document.querySelector("#register_nickname");
  const emailInputBox = document.querySelector("#email-input-box");
  const validateAllInputValue = () => {
    const nicknameInputBox = document.querySelector("#nickname-input-box");
    const errorText = document.createElement("p");
    errorText.innerHTML = "Все поля должны быть заполнены";
    if (
      !registerNicknameForm.value ||
      !registerEmailForm.value ||
      !registerPasswordForm.value ||
      !registerPasswordRepeatForm.value
    ) {
      nicknameInputBox.classList.add("error-input");
      emailInputBox.classList.add("error-input");
      passwordInputBox.classList.add("error-input");
      repeatPasswordInputBox.classList.add("error-input");
      repeatPasswordInputBox.append(errorText);
      validationError = true;
    }
  };
  const validateEmail = () => {
    const value = registerEmailForm.value;
    const indexOfAt = value.indexOf("@");
    const indexOfDot = value.indexOf(".");
    const strBeforeAt = value.slice(0, indexOfAt);
    const strAfterAt = value.slice(indexOfAt + 1, indexOfDot);
    const strAfterDot = value.slice(indexOfDot + 1);
    const errorText = document.createElement("p");
    errorText.innerHTML = "Введите корректный Email";
    if (
      indexOfAt === -1 ||
      indexOfDot === -1 ||
      strBeforeAt.length < 1 ||
      strAfterAt.length < 1 ||
      strAfterDot < 1
    ) {
      validationError = true;
      emailInputBox.classList.add("error-input");
      emailInputBox.append(errorText);
    }
  };

  const postData = async (nickname, password, email) => {
    const data = {
      nickname,
      password,
      email,
    };
    const req = await fetch("/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return req;
  };

  removeAllParagraphs();
  validatePassword();
  validateAllInputValue();
  validateEmail();
  const allInputs = registrationPopup.querySelectorAll("input");
  const allInputBoxes = registrationPopup.querySelectorAll(".input-box");
  if (!validationError) {
    allInputBoxes.forEach((box) => {
      box.classList.remove("error-input");
    });
    const result = await postData(
      registerNicknameForm.value,
      registerPasswordForm.value,
      registerEmailForm.value
    );
    const resultData = await result.json();
    const el = document.createElement("p");
    if (result.status === 400) {
      el.classList.add("auth-error");
    } else {
      el.classList.add("auth-success");
      window.location.href = "/index.html";
    }
    el.innerHTML = resultData.message;
    const form = document.querySelector(".sign-up__form");
    form.append(el);
    spinner.classList.remove("spinner-show");
    spinner.classList.add("spinner-hide");
    allInputs.forEach((input) => {
      input.value = "";
    });
  }
};

export default validateRegisterModal;
