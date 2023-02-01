import ProfileCard from '../../components/ProfileCard';
import Actual from '../../components/Actual';
import Bloggers from '../../components/Bloggers';
import FollowersList from '../../components/FollowersList';

const Followers = () => {
  return (
    <main>
      <div className="container">
        <div className="main__box">
          <section className="last-messages followers">
            <ProfileCard />
            <FollowersList />
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

export default Followers;
