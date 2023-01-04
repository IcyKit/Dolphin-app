const HeaderItem = ({ icon, title, isActive }) => {
  return (
    <div
      className={`header-menu__item ${isActive ? "header-menu__item-active" : ""
        }`}
    >
      <div className="header-menu__item-content">
        <img src={icon} alt="" />
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default HeaderItem;
