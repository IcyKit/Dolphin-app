import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Feed from './pages/Feed';
import Settings from './pages/Settings';
import SettingsMain from './components/SettingsMain';
import SettingsPassword from './components/SettingsPassword';

const router = createBrowserRouter([
  {
    path: '/app',
    element: <App />,
    children: [
      {
        path: '/app',
        element: <Feed />,
      },
      {
        path: '/app/settings',
        element: <Settings />,
        children: [
          {
            path: '/app/settings',
            element: <SettingsMain />,
          },
          {
            path: '/app/settings/password',
            element: <SettingsPassword />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
