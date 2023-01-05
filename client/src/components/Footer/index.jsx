import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div class="footer-box active">
        <a href="/">
          <img class="footer-icon" src="/home.png" alt="" />
        </a>
      </div>
      <div class="footer-box">
        <a href="/">
          <img class="footer-icon" src="/bell.png" alt="" />
        </a>
      </div>
      <div class="footer-box">
        <a href="/">
          <img class="footer-icon" src="/message.png" alt="" />
        </a>
      </div>
      <div class="footer-box">
        <a href="/">
          <img class="footer-avatar" src="/trump.png" alt="" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
