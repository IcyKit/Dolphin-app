import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser } from './store/slices/user';
import { fetchPosts } from './store/slices/posts';
import { fetchBloggers, fetchActual } from './store/slices/recommends';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  const { following, id } = useSelector((state) => state.user.userData);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchActual());
    dispatch(fetchBloggers());
  }, []);

  useEffect(() => {
    if (following) {
      const followingId = following.map((item) => item.id).join(', ');
      dispatch(fetchPosts({ followingId, id }));
    }
  }, [following]);

  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
