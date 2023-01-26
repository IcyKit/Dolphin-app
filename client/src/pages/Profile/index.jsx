import './Profile.css';
import { useState, useEffect } from 'react';
import CreatePost from '../../components/CreatePost';
import Actual from '../../components/Actual';
import Bloggers from '../../components/Bloggers';
import ProfileCard from '../../components/ProfileCard';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PostsByID from '../../components/PostsByID';
import { fetchPosts } from '../../store/slices/posts';

const Profile = () => {
  const { pathname } = useLocation();
  const params = useParams().id;
  const { id } = useSelector((state) => state.user.userData);

  useEffect(() => {
    // if (pathname === '/app/profile') {
    // }
  }, []);

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
