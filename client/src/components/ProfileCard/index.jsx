import './ProfileCard.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoLocation } from 'react-icons/go';
import { AiOutlineLink } from 'react-icons/ai';
import { BiCake } from 'react-icons/bi';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import FollowButton from '../FollowButton';
import ProfileCardSkeleton from '../Skeletons/ProfileCardSkeleton';

const ProfileCard = () => {
  const [userData, setUserData] = useState({});
  const { pathname } = useLocation();
  const { id } = useParams();
  const { totalmessages } = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (pathname === `/app/users/${id}`) {
      axios.get(`/user/${id}`).then((res) => setUserData(res.data));
    } else {
      axios.get(`/me`).then((res) => setUserData(res.data));
    }
  }, [pathname, totalmessages]);

  return (
    <>
      <section className="profile card-shadow">
        <div className="profile__bg">
          <img
            src={
              userData.headerphoto ||
              'https://images.unsplash.com/photo-1672738681155-690892246dd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
            }
            alt=""
          />
        </div>
        <div className="profile__bottom">
          <div className="profile__info">
            <div className="profile__info_img">
              <img src={userData.avatarphoto || '/default-avatar.png'} alt="" />
            </div>
            <div className="profile__info_title">
              <h2>{userData.name}</h2>
              <p>@{userData.nickname}</p>
            </div>
            {userData.description && (
              <div className="profile__info_bio">
                <p>{userData.description}</p>
              </div>
            )}
            <div className="profile__info_description">
              {userData.location && (
                <div className="profile__info_description-box">
                  <GoLocation />
                  <p>{userData.location}</p>
                </div>
              )}
              {userData.website && (
                <div className="profile__info_description-box">
                  <AiOutlineLink />
                  <p>{userData.website}</p>
                </div>
              )}
              {userData.birthday && (
                <div className="profile__info_description-box">
                  <BiCake />
                  <p>
                    {new Date(userData.birthday).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="profile__info_statistics">
            <div className="profile__info_statistics-box">
              <h2>{userData.totalmessages}</h2>
              <p>Сообщений</p>
            </div>
            <div className="profile__info_statistics-box">
              <h2>{userData.totalfollowing}</h2>
              <p>Читаемых</p>
            </div>
            <div className="profile__info_statistics-box">
              <h2>{userData.totalfollowers}</h2>
              <p>Читателей</p>
            </div>
          </div>
          {pathname === `/app/users/${id}` ? (
            <FollowButton user_id={id} />
          ) : null}
        </div>
      </section>
    </>
  );
};

export default ProfileCard;
