import './Settings.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Settings = () => {
  const [menu, setMenu] = useState(0);

  const pages = [
    {
      name: 'Настройки профиля',
      path: '/app/settings',
    },
    {
      name: 'Сменить пароль',
      path: '/app/settings/password',
    },
  ];

  return (
    <div className="container">
      <div className="main__box main__box-settings">
        <section className="last-messages">
          <h1>Редактировать профиль</h1>
          <div className="settings-main">
            <div className="left-side">
              <div className="settings card-shadow">
                <Outlet />
              </div>
            </div>
            <div className="right-side card-shadow aside__card">
              <h2>Настройки</h2>
              <div className="side-links">
                {pages.map((item, index) => (
                  <div
                    className={`side-links__box ${
                      menu === index ? 'side-links__box-active' : ''
                    }`}
                    onClick={() => setMenu(index)}
                  >
                    <Link to={item.path}>{item.name}</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
