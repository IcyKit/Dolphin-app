import swipePopupEventListener from './modules/swipePopupEventListener.js';
import blueBgStatistic from './modules/blueBgStatistic.js';
import validateRegisterModal from './modules/validateRegisterModal.js';
import createFeed from './modules/createFeed.js';
import createActual from './modules/createActual.js';
import createBlogs from './modules/createBlogs.js';

document.addEventListener('DOMContentLoaded', () => {
  const registrationPopup = document.querySelector('#register_popup');
  const registrationBtn = document.querySelector('#register_btn');
  // Открытие окна регистрации
  registrationBtn.addEventListener('click', () => {
    registrationPopup.classList.remove('hide');
    document.body.style.overflow = 'hidden';
  });

  const registrationBtnDown = document.querySelector('#register_btn_down');
  registrationBtnDown.addEventListener('click', () => {
    registrationPopup.classList.remove('hide');
    document.body.style.overflow = 'hidden';
  });

  const authPopup = document.querySelector('#auth_popup');
  const authBtn = document.querySelector('#auth_btn');
  // Открытие окна авторизации
  authBtn.addEventListener('click', () => {
    authPopup.classList.remove('hide');
    document.body.style.overflow = 'hidden';
  });

  const authBtnDown = document.querySelector('#auth_btn_down');
  authBtnDown.addEventListener('click', () => {
    authPopup.classList.remove('hide');
    document.body.style.overflow = 'hidden';
  });

  // Закрытие окна регистрации на десктопе
  const registrationCloseBtn = document.querySelector('#register_close_btn');
  registrationCloseBtn.addEventListener('click', () => {
    registrationPopup.classList.add('hide');
    document.body.style.overflow = 'visible';
  });

  // Закрытие окна авторизации на десктопе
  const authCloseBtn = document.querySelector('#auth_close_btn');
  authCloseBtn.addEventListener('click', () => {
    authPopup.classList.add('hide');
    document.body.style.overflow = 'visible';
  });

  // Закрытие окна регистрации и авторизации по свайпу вниз
  swipePopupEventListener(authPopup);
  swipePopupEventListener(registrationPopup);

  // Форма регистрации
  const submitRegistrationBtn = document.querySelector('#submit_register_btn');
  submitRegistrationBtn.addEventListener('click', () => {
    validateRegisterModal(registrationPopup);
  });

  // Форма авторизации
  let authNicknameOrEmailForm = document.querySelector('#auth_nickname_email');
  let authPasswordForm = document.querySelector('#auth_password');
  let submitAuthBtn = document.querySelector('#submit_auth_btn');
  submitAuthBtn.addEventListener('click', () => {
    alert(`${authNicknameOrEmailForm.value} ${authPasswordForm.value}`);
  });

  // Статистика для синего экрана в начале
  blueBgStatistic();

  // Формирование ленты
  createFeed();

  // Создание блока актуальные темы
  createActual();

  // Создание Интересные блогеры
  createBlogs();
});
