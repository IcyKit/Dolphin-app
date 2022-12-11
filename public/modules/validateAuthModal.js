const validateAuthModal = async (authPopup) => {
  const validationError = false;
  const authNicknameOrEmailForm = document.querySelector(
    "#auth_nickname_email"
  );
  const authPasswordForm = document.querySelector("#auth_password");
  const removeAllParagraphs = () => {
    const allParagraphs = authPopup.querySelectorAll("p");
    allParagraphs.forEach((p) => {
      p.remove();
    });
  };

  const validateAllInputValue = () => {
    const nicknameOrEmailInputBox = document.querySelector(
      "#auth_nickname_input-box"
    );
    const passwordInputBox = document.querySelector("#auth_password_input-box");
    const errorText = document.createElement("p");
    errorText.innerHTML = "Все поля должны быть заполнены";
    if (!authNicknameOrEmailForm.value || !authPasswordForm.value) {
      nicknameOrEmailInputBox.classList.add("error-input");
      passwordInputBox.classList.add("error-input");
      passwordInputBox.append(errorText);
      inputError = true;
    }
  };
  const authUser = async (nickname, password) => {
    const data = {
      nickname,
      password,
    };
    const req = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return req;
  };

  removeAllParagraphs();
  validateAllInputValue();
  const allInputs = document.querySelectorAll("input");
  const allInputBoxes = document.querySelectorAll(".input-box");

  if (!validationError) {
    const result = await authUser(
      authNicknameOrEmailForm.value.trim(),
      authPasswordForm.value.trim()
    );
    if (result.status === 400) {
      const el = document.createElement("p");
      el.classList.add("isUser");
      el.innerHTML = "Пользователь не найден";
      const form = document.querySelector(".sign-in__form");
      form.append(el);
    } else {
      alert("Успешная авторизация");
    }
    allInputs.forEach((input) => {
      input.value = "";
    });
    allInputBoxes.forEach((box) => {
      box.classList.remove("error-input");
    });
  }
};

export default validateAuthModal;
