import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchFollowUser, fetchUnfollowUser } from '../../store/slices/user';

const FollowButton = ({ user_id }) => {
  const dispatch = useDispatch();
  const { following, id } = useSelector((state) => state.user.userData);
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    if (following) {
      following.forEach((item) => {
        if (item.id === Number(user_id)) {
          setIsFollowing(true);
        }
      });
    }
  }, [following]);

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

  return isFollowing ? (
    <button className="profile__info_btn btn" onClick={handleButtonClick}>
      Отписаться
    </button>
  ) : (
    <button
      className="profile__info_btn btn btn-active"
      onClick={handleButtonClick}
    >
      Читать
    </button>
  );
};

export default FollowButton;
