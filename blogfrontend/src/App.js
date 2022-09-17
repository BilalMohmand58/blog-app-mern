import { useState } from "react";
import Menu from "./Components/Menu/Menu";
import TopBar from "./Components/TopBar/TopBar";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Setting from "./Pages/Setting/Setting";
import Write from "./Pages/Write/Write";
import Home from "./Pages/Home/Home";
import Single from "./Pages/Single/Single";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Context/context";

function App() {
  const { user } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <BrowserRouter>
      <TopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/posts/:postID" element={<Single />} />
        <Route
          exact
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route exact path="/setting" element={user ? <Setting /> : <Login />} />
        <Route exact path="/write" element={user ? <Write /> : <Login />} />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
