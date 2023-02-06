import './Feed.css';
import CreatePost from '../../components/CreatePost';
import Posts from '../../components/Posts';
import ProfileInfo from '../../components/ProfileInfo';
import Actual from '../../components/Actual';
import Bloggers from '../../components/Bloggers';

import { useSelector } from 'react-redux';
import AppLoading from '../../components/Skeletons/AppLoading';

const Feed = () => {
  const { isUserLoading } = useSelector((state) => state.user);
  const { isPostsLoading } = useSelector((state) => state.posts);
  const { isBloggersLoading, isActualLoading } = useSelector(
    (state) => state.recommends
  );

  if (isUserLoading || isPostsLoading || isBloggersLoading || isActualLoading) {
    return <AppLoading />;
  }

  return (
    <main>
      <div className="container">
        <div className="main__box">
          <section className="last-messages">
            <CreatePost />
            <Posts />
          </section>
          <aside>
            <ProfileInfo />
            <Actual />
            <Bloggers />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Feed;
