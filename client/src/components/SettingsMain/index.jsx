import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUpdateUser,
  fetchUploadAvatar,
  fetchUser,
} from '../../store/slices/user';
import AttachToPost from '../../components/AttachToPost';
import { Modal, Alert, Box } from '@mui/material';

const SettingsMain = () => {
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
  const { isSettingLoading, status, nicknameError } = useSelector(
    (state) => state.user.settings
  );

  useEffect(() => {
    setNameForm(name);
    setNicknameForm(nickname);
    setDescriptionForm(description);
    setWebsiteForm(website);
    setLocationForm(location);
    setBirthdayForm(
      String(new Date(birthday).toLocaleDateString())
        .split('.')
        .reverse()
        .join('-')
    );
    setImg(avatarphoto);
  }, [avatarphoto, nickname, name, description, website, location, birthday]);

  const [nameForm, setNameForm] = useState(name);
  const [nicknameForm, setNicknameForm] = useState(nickname);
  const [descriptionForm, setDescriptionForm] = useState(description || '');
  const [locationForm, setLocationForm] = useState(location || '');
  const [websiteForm, setWebsiteForm] = useState(website || '');
  const [birthdayForm, setBirthdayForm] = useState(birthday || '');
  const [showBirthdayForm, setShowBirthdayForm] = useState(false);
  const [open, setOpen] = useState(status?.status);
  const [img, setImg] = useState(avatarphoto);

  useEffect(() => {
    setOpen(status?.status);
  }, [status]);

  const uploadImg = (url) => {
    setImg(url);
    dispatch(fetchUploadAvatar(url));
    dispatch(fetchUser());
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    let userData = {};
    if (nicknameForm === nickname) {
      userData = {
        name: nameForm,
        description: descriptionForm,
        location: locationForm,
        website: websiteForm,
        birthday: new Date(birthdayForm),
      };
    } else {
      userData = {
        name: nameForm,
        nickname: nicknameForm,
        description: descriptionForm,
        location: locationForm,
        website: websiteForm,
        birthday: new Date(birthdayForm),
      };
    }

    dispatch(fetchUpdateUser(userData));
    dispatch(fetchUser());
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="error-modal">
          <Alert severity="success" onClose={handleClose}>
            {status.message}
          </Alert>
        </Box>
      </Modal>
      <div className="nick-and-photo">
        <div className="photo">
          <img
            src={img ? img : '/default-avatar.png'}
            className="photo-avatar"
            alt=""
          />
          <AttachToPost setImg={uploadImg} />
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
          <div className={`input-box ${nicknameError ? 'error-input' : ''}`}>
            <label htmlFor="nickname">Никнейм</label>
            <input
              id="nickname"
              type="text"
              placeholder={nickname}
              value={nicknameForm}
              onChange={(e) => setNicknameForm(e.target.value)}
            />
            {nicknameError && <p>К сожалению, этот никнейм занят</p>}
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
          <label htmlFor="show-birthday">Показывать дату рождения</label>
          <select name="show-birthday" id="show-birthday" value={birthday}>
            <option value="show-all">Показывать всем</option>
            <option value="show-friends">Показывать друзьям</option>
            <option value="show-nobody">Никому не показывать</option>
          </select>
        </div>
      </div>
      <div className="settings-button">
        <button className="btn btn-active" onClick={() => handleSubmit()}>
          Сохранить
        </button>
        {isSettingLoading && <CircularProgress />}
      </div>
    </>
  );
};

export default SettingsMain;
