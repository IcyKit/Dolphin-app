import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div class="footer-box active">
        <a href="/">
          <img class="footer-icon" src="../../../public/home.png" alt="" />
        </a>
      </div>
      <div class="footer-box">
        <a href="/">
          <img class="footer-icon" src="../../../public/bell.png" alt="" />
        </a>
      </div>
      <div class="footer-box">
        <a href="/">
          <img class="footer-icon" src="../../../public/message.png" alt="" />
        </a>
      </div>
      <div class="footer-box">
        <a href="/">
          <img class="footer-avatar" src="../../../public/trump.png" alt="" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
