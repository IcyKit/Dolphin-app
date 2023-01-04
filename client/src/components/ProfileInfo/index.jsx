import "./ProfileInfo.css";

const ProfileInfo = () => {
  return (
    <div class="profile-info aside__card card-shadow">
      <div class="profile-info__header">
        <img src="../../../public/trump.png" alt="avatar" />
        <div class="profile-info__header-title">
          <h2>Donald</h2>
          <p>@donaldjtrump</p>
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
