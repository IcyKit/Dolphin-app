import "./ProfileInfo.css";
import { useSelector } from "react-redux";

const ProfileInfo = () => {
  const { avatarphoto, name, nickname } = useSelector(
    (state) => state.user.userData
  );
  return (
    <div class="profile-info aside__card card-shadow">
      <div class="profile-info__header">
        <img src={avatarphoto} alt="avatar" />
        <div class="profile-info__header-title">
          <h2>{name}</h2>
          <p>@{nickname}</p>
        </div>
      </div>
      <div class="profile-info__statistics">
        <div class="profile-info__statistics-box">
          <h2>45К</h2>
          <p>сообщений</p>
        </div>
        <div class="profile-info__statistics-box">
          <h2>28</h2>
          <p>Читаемых</p>
        </div>
        <div class="profile-info__statistics-box">
          <h2>118</h2>
          <p>Читателей</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
