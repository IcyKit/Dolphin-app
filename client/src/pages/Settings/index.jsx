import "./Settings.css";
const Settings = () => {
  return (
    <div className="container">
      <div className="main__box">
        <h1>Редактировать профиль</h1>
        <div className="settings-main">
          <div className="left-side">
            <div className="settings card-shadow">
              <div className="nick-and-photo">
                <div className="photo">
                  <img src="/resources/trump.png" alt="" />
                </div>
                <div className="nick">
                  <div className="input-box">
                    <label htmlFor="name">Ваше имя</label>
                    <input id="name" type="text" />
                  </div>
                  <div className="input-box error-input">
                    <label htmlFor="nickname">Никнейм</label>
                    <input id="nickname" type="text" />
                    <p>К сожалению, этот никнейм занят</p>
                  </div>
                </div>
              </div>
              <div className="input-box">
                <label htmlFor="about">О себе</label>
                <textarea
                  name="about"
                  id="about"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="input-box">
                <label htmlFor="geo">Геолокация</label>
                <input id="geo" type="text" />
              </div>
              <div className="input-box">
                <label htmlFor="web">Веб-сайт</label>
                <input id="web" type="url" />
              </div>
              <div className="birthday">
                <div className="birthday-left input-box">
                  <label htmlFor="birthday-date">Дата рождения</label>
                  <input htmlFor="birthday-date" type="date" />
                </div>
                <div className="birthday-right input-box">
                  <label htmlFor="show-birthday">
                    Показывать дату рождения
                  </label>
                  <select name="show-birthday" id="show-birthday">
                    <option value="show-all">Показывать всем</option>
                    <option value="show-friends">Показывать друзьям</option>
                    <option value="show-nobody">Никому не показывать</option>
                  </select>
                </div>
              </div>
              <button className="btn btn-active">Сохранить</button>
            </div>
          </div>
          <div className="right-side card-shadow aside__card">
            <h2>Настройки</h2>
            <div className="side-links">
              <div className="side-links__box side-links__box-active">
                <a href="/">Настройки профиля</a>
              </div>
              <div className="side-links__box">
                <a href="/">Сменить пароль</a>
              </div>
              <div className="side-links__box">
                <a href="/">Сменить e-mail</a>
              </div>
              <div className="side-links__box">
                <a href="/">Конфиденциальность</a>
              </div>
              <div className="side-links__box">
                <a href="/">Удалить профиль</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
