import "./App.css";
import Header from "./components/Header";
import Feed from "./pages/Feed";
import { Outlet } from "react-router-dom";
import { redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
