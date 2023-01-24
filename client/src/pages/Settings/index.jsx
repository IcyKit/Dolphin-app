import './Settings.css';
import { Alert, CircularProgress } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUpdateUser } from '../../store/slices/user';
import AttachToPost from '../../components/AttachToPost';

const Settings = () => {
  const dispatch = useDispatch();
  const {
    avatarphoto,
    nickname,
    name,
    description,
    website,
    location,
    birthday,
  } = useSelector((state) => state.user.userData);
  const { isSettingLoading, status } = useSelector(
    (state) => state.user.settings
  );

  const avatarChange = useRef();

  useEffect(() => {
    setNameForm(name);
    setNicknameForm(nickname);
    setDescriptionForm(description);
    setWebsiteForm(website);
    setLocationForm(location);
    setBirthdayForm(birthday);
  }, [avatarphoto, nickname, name, description, website, location, birthday]);

  const [nameForm, setNameForm] = useState(name);
  const [nicknameForm, setNicknameForm] = useState(nickname);
  const [descriptionForm, setDescriptionForm] = useState(description || '');
  const [locationForm, setLocationForm] = useState(location || '');
  const [websiteForm, setWebsiteForm] = useState(website || '');
  const [birthdayForm, setBirthdayForm] = useState(birthday || new Date());
  const [showBirthdayForm, setShowBirthdayForm] = useState(false);
  const [isModal, setIsModal] = useState(status.status);
  const [mouseEvent, setMouseEvent] = useState(false);

  useEffect(() => {
    setIsModal(status.status);
  }, [status]);

  const handleSubmit = async () => {
    const userData = {
      name: nameForm,
      nickname: nicknameForm,
      description: descriptionForm,
      location: locationForm,
      website: websiteForm,
      birthday: new Date(birthdayForm),
    };
    dispatch(fetchUpdateUser(userData));
  };

  return (
    <div className="container">
      <div className="main__box main__box-settings">
        {isModal && (
          <Alert severity={status?.status} onClose={() => setIsModal(false)}>
            {status?.message}
          </Alert>
        )}
        <section className="last-messages">
          <h1>Редактировать профиль</h1>
          <div className="settings-main">
            <div className="left-side">
              <div className="settings card-shadow">
                <div className="nick-and-photo">
                  <div className="photo">
                    <img
                      src={avatarphoto}
                      className="photo-avatar"
                      alt=""
                      onMouseEnter={() => setMouseEvent(true)}
                    />
                    {mouseEvent && (
                      // <div className="upload-avatar">
                      //   <img
                      //     src={'/change-avatar.png'}
                      //     onMouseOut={() => setMouseEvent(false)}
                      //   />
                      // </div>
                      <AttachToPost />
                    )}
                  </div>
                  <div className="nick">
                    <div className="input-box">
                      <label htmlFor="name">Ваше имя</label>
                      <input
                        id="name"
                        type="text"
                        placeholder={name}
                        value={nameForm}
                        onChange={(e) => setNameForm(e.target.value)}
                      />
                    </div>
                    <div className="input-box">
                      <label htmlFor="nickname">Никнейм</label>
                      <input
                        id="nickname"
                        type="text"
                        placeholder={nickname}
                        value={nicknameForm}
                        onChange={(e) => setNicknameForm(e.target.value)}
                      />
                      {/* <p>К сожалению, этот никнейм занят</p> */}
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
                    placeholder={description}
                    value={descriptionForm}
                    onChange={(e) => setDescriptionForm(e.target.value)}
                  ></textarea>
                </div>
                <div className="input-box">
                  <label htmlFor="geo">Геолокация</label>
                  <input
                    id="geo"
                    type="text"
                    placeholder={location}
                    value={locationForm}
                    onChange={(e) => setLocationForm(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="web">Веб-сайт</label>
                  <input
                    id="web"
                    type="url"
                    placeholder={website}
                    value={websiteForm}
                    onChange={(e) => setWebsiteForm(e.target.value)}
                  />
                </div>
                <div className="birthday">
                  <div className="birthday-left input-box">
                    <label htmlFor="birthday-date">Дата рождения</label>
                    <input
                      htmlFor="birthday-date"
                      type="date"
                      value={birthdayForm}
                      onChange={(e) => setBirthdayForm(e.target.value)}
                    />
                  </div>
                  <div className="birthday-right input-box">
                    <label htmlFor="show-birthday">
                      Показывать дату рождения
                    </label>
                    <select
                      name="show-birthday"
                      id="show-birthday"
                      value={birthday}
                    >
                      <option value="show-all">Показывать всем</option>
                      <option value="show-friends">Показывать друзьям</option>
                      <option value="show-nobody">Никому не показывать</option>
                    </select>
                  </div>
                </div>
                <div className="settings-button">
                  <button
                    className="btn btn-active"
                    onClick={() => handleSubmit()}
                  >
                    Сохранить
                  </button>
                  {isSettingLoading && <CircularProgress />}
                </div>
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
        </section>
      </div>
    </div>
  );
};

export default Settings;
