import { fetchFollowUser, fetchUnfollowUser } from '../../store/slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const FollowerItem = ({
  name,
  // isFollowing,
  nickname,
  description,
  user_id,
  avatarphoto,
}) => {
  const dispatch = useDispatch();
  const { id, following } = useSelector((state) => state.user.userData);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    following.forEach((item) => {
      if (item.id === Number(user_id)) {
        setIsFollowing(true);
      }
    });
  }, []);

  const handleButtonClick = () => {
    const obj = { id, user_id: Number(user_id) };
    if (isFollowing) {
      dispatch(fetchUnfollowUser(obj));
      setIsFollowing(!isFollowing);
    } else {
      dispatch(fetchFollowUser(obj));
      setIsFollowing(!isFollowing);
    }
  };

  return (
    <>
      <div class="followers__box">
        <img class="followers__box-avatar" src={avatarphoto} alt="Avatar" />
        <div class="followers__box-right">
          <div class="followers__box-title">
            <div class="followers__box-title_left">
              <div class="followers__box-title-inner-left">
                <h3>{name}</h3>
                <p class="followers__box-nickname">@{nickname}</p>
              </div>
              {isFollowing ? (
                <button onClick={handleButtonClick} class="btn btn-active">
                  Читаю
                </button>
              ) : (
                <button onClick={handleButtonClick} class="btn">
                  Читать
                </button>
              )}
            </div>
          </div>
          <div class="followers__box-message">
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div class="divider"></div>
    </>
  );
};

export default FollowerItem;
