import './Feed.css';
import CreatePost from '../../components/CreatePost';
import Posts from '../../components/Posts';
import ProfileInfo from '../../components/ProfileInfo';
import Actual from '../../components/Actual';
import Bloggers from '../../components/Bloggers';
import Footer from '../../components/Footer';

const Feed = () => {
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
      <Footer />
    </main>
  );
};

export default Feed;
