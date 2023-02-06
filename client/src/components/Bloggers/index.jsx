import './Bloggers.css';
import { useEffect } from 'react';
import BloggersItem from '../BloggersItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBloggers } from '../../store/slices/recommends';
import FollowButton from '../FollowButton';

const Bloggers = () => {
  const dispatch = useDispatch();
  const { isBloggersLoading, bloggers } = useSelector(
    (state) => state.recommends
  );

  useEffect(() => {
    dispatch(fetchBloggers());
  }, []);

  if (isBloggersLoading) {
    return <h3>Загрузка...</h3>;
  }

  return (
    <div className="bloggers aside__card card-shadow">
      <h3>Рекомендации для вас</h3>
      <div className="bloggers__content">
        {bloggers.map((item) => (
          <>
            <BloggersItem
              name={item.name}
              nickname={item.nickname}
              avatarUrl={item.avatarphoto}
              user_id={item.id}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default Bloggers;
