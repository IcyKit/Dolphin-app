import './Profile.css';
import CreatePost from '../../components/CreatePost';
import Actual from '../../components/Actual';
import Bloggers from '../../components/Bloggers';
import ProfileCard from '../../components/ProfileCard';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostsByID from '../../components/PostsByID';
import { CircularProgress } from '@mui/material';

const Profile = () => {
  const { pathname } = useLocation();
  const params = useParams().id;
  const { id } = useSelector((state) => state.user.userData);
  const { isUserLoading } = useSelector((state) => state.user);

  if (isUserLoading) {
    return <CircularProgress />;
  }

  return (
    <main>
      <div className="container">
        <div className="main__box">
          <section className="last-messages">
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
