import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Followers from './pages/Followers';

const App = React.lazy(() => import('./App'));
const Feed = React.lazy(() => import('./pages/Feed'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Settings = React.lazy(() => import('./pages/Settings'));
const SettingsMain = React.lazy(() => import('./components/SettingsMain'));
const SettingsPassword = React.lazy(() =>
  import('./components/SettingsPassword')
);

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
      {
        path: '/app/profile',
        element: <Profile />,
      },
      {
        path: '/app/users/:id',
        element: <Profile />,
      },
      {
        path: '/app/followers',
        element: <Followers />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Suspense fallback={<div>Загрузка...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>
);
