import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateUserPassword } from '../../store/slices/user';
import { Modal, Alert, Box } from '@mui/material';

const SettingsPassword = () => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
  const [repeatError, setRepeatError] = useState(false);
  const [open, setOpen] = useState(false);
  const { status, oldPasswordError } = useSelector(
    (state) => state.user.settings
  );

  useEffect(() => {
    setOpen(status?.status);
  }, [status]);

  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    if (newPassword !== newPasswordRepeat) {
      return setRepeatError('Пароли должны совпадать');
    } else if (newPassword.length <= 3 || newPasswordRepeat.length <= 3) {
      return setRepeatError('Пароль должен быть не меньше трех символов');
    }
    dispatch(fetchUpdateUserPassword({ newPassword, oldPassword }));
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
      <div className="settings-password">
        <div className={`input-box ${oldPasswordError ? 'error-input' : ''}`}>
          <label htmlFor="oldPassword">Текущий пароль</label>
          <input
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {oldPasswordError && <p>Текущий пароль неверный</p>}
        </div>
        <div className={`input-box ${repeatError ? 'error-input' : ''}`}>
          <label htmlFor="newPassword">Новый пароль</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {repeatError && <p>{repeatError}</p>}
        </div>
        <div className={`input-box ${repeatError ? 'error-input' : ''}`}>
          <label htmlFor="newPasswordRepeat">Новый пароль еще раз</label>
          <input
            id="newPasswordRepeat"
            type="password"
            value={newPasswordRepeat}
            onChange={(e) => setNewPasswordRepeat(e.target.value)}
          />
          {repeatError && <p>{repeatError}</p>}
        </div>
      </div>
      <div className="settings-button">
        <button className="btn btn-active" onClick={() => handleSubmit()}>
          Сохранить
        </button>
        {/* {isSettingLoading && <CircularProgress />} */}
      </div>
    </>
  );
};

export default SettingsPassword;
