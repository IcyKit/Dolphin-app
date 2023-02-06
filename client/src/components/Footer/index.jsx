import './Footer.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { avatarphoto } = useSelector((state) => state.user.userData);
  return (
    <footer>
      <div className="footer-box active">
        <Link to="/app">
          <img className="footer-icon" src="/home.png" alt="" />
        </Link>
      </div>
      <div className="footer-box">
        <a href="/">
          <img className="footer-icon" src="/bell.png" alt="" />
        </a>
      </div>
      <div className="footer-box">
        <a href="/">
          <img className="footer-icon" src="/message.png" alt="" />
        </a>
      </div>
      <div className="footer-box">
        <Link to="/app/profile">
          <img className="footer-avatar" src={avatarphoto} alt="" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
