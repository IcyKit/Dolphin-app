import './FollowersList.css';
import FollowerItem from '../FollowerItem';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';

const FollowersList = () => {
  const { followers, following } = useSelector((state) => state.user.userData);
  const { isUserLoading } = useSelector((state) => state.user);

  if (isUserLoading) {
    return <CircularProgress />;
  }

  if (followers.length < 1) {
    return (
      <div class="followers__content card-shadow">
        <h2 class="followers__content-title">Мои подписчики</h2>
        <p>К сожалению, у вас пока что нет подписчиков</p>
      </div>
    );
  }

  return (
    <div class="followers__content card-shadow">
      <h2 class="followers__content-title">Мои подписчики</h2>
      {followers.map((follower) => {
        let isFollowing = false;
        following.forEach((person) => {
          if (person.id === follower.id) {
            isFollowing = true;
          }
        });
        return (
          <FollowerItem
            name={follower.name}
            nickname={follower.nickname}
            user_id={follower.id}
            description={follower.description}
            avatarphoto={follower.avatarphoto}
            isFollowing={isFollowing}
          />
        );
      })}
    </div>
  );
};

export default FollowersList;
