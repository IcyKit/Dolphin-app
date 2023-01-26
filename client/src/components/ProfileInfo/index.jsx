import './ProfileInfo.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileInfo = () => {
  const {
    avatarphoto,
    name,
    nickname,
    totalmessages,
    totalfollowers,
    totalfollowing,
  } = useSelector((state) => state.user.userData);
  return (
    <div className="profile-info aside__card card-shadow">
      <div className="profile-info__header">
        <Link to="/app/profile">
          <img
            src={avatarphoto ? avatarphoto : '/default-avatar.png'}
            alt="avatar"
          />
        </Link>
        <div className="profile-info__header-title">
          <h2>{name}</h2>
          <p>@{nickname}</p>
        </div>
      </div>
      <div className="profile-info__statistics">
        <div className="profile-info__statistics-box">
          <h2>{totalmessages}</h2>
          <p>сообщений</p>
        </div>
        <div className="profile-info__statistics-box">
          <h2>{totalfollowing}</h2>
          <p>Читаемых</p>
        </div>
        <div className="profile-info__statistics-box">
          <h2>{totalfollowers}</h2>
          <p>Читателей</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
