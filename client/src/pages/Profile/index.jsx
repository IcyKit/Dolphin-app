import './Profile.css';
import CreatePost from '../../components/CreatePost';
import Actual from '../../components/Actual';
import Bloggers from '../../components/Bloggers';
import ProfileCard from '../../components/ProfileCard';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostsByID from '../../components/PostsByID';
import AppLoading from '../../components/Skeletons/AppLoading';
import ProfileCardSkeleton from '../../components/Skeletons/ProfileCardSkeleton';

const Profile = () => {
  const { pathname } = useLocation();
  const params = useParams().id;
  const { id } = useSelector((state) => state.user.userData);
  const { isUserLoading } = useSelector((state) => state.user);
  const { isPostsLoading } = useSelector((state) => state.posts);

  if (isUserLoading || isPostsLoading) {
    return <AppLoading />;
  }

  return (
    <main>
      <div className="container">
        <div className="main__box">
          <section className="last-messages">
            {/* <ProfileCardSkeleton /> */}
            <ProfileCard />
            {pathname === '/app/profile' && <CreatePost />}
            {pathname === '/app/profile' ? (
              <PostsByID id={id} />
            ) : (
              <PostsByID id={params} />
            )}
          </section>
          <aside>
            <Actual />
            <Bloggers />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Profile;
