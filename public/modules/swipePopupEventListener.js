const swipePopupEventListener = (popup) => {
  let startPositionY;
  let finishPositionY;
  popup.addEventListener('touchstart', (e) => {
    startPositionY = e.touches[0].clientY;
  });
  popup.addEventListener('touchend', (e) => {
    finishPositionY = e.changedTouches[0].clientY;
    let result = startPositionY - finishPositionY;
    if (result < -100) {
      popup.classList.add('hide');
      document.body.style.overflow = 'visible';
    }
  });
};

export default swipePopupEventListener;
