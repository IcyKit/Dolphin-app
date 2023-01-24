import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "./store/slices/user.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
