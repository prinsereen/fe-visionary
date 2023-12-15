import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";

import {
  Home,
  Film,
  Search,
  Video,
  VideoPlayed,
  Profile,
  Login,
  Register,
} from "./pages";
import { useSelector } from "react-redux";
import EditProfile from "./pages/profile/EditProfile";
import Setting from "./pages/setting/setting";
import ViewMore from "./pages/ViewMore";
import Paywall from "./pages/paywall";
import TrailerPlayed from "./pages/TrailerPlayed";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  console.log(useSelector((state) => state.token));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={isAuth ? <Home /> : <Login />} />
        <Route
          path="/search"
          element={isAuth ? <Search /> : <Navigate to="/" />}
        />
        <Route
          path="/viewMore"
          element={isAuth ? <ViewMore /> : <Navigate to="/" />}
        />
        <Route
          path="/film"
          element={isAuth ? <Film /> : <Navigate to="/" />}
        />
        <Route
          path="/video"
          element={isAuth ? <Video /> : <Navigate to="/" />}
        />
        <Route
          path="/videoPlayed"
          element={isAuth  ? <VideoPlayed /> : <Navigate to="/" />}
        />
        <Route
          path="/trailer"
          element={isAuth ? <TrailerPlayed /> : <Navigate to="/" />}
        />
        <Route
          path="/setting"
          element={isAuth ? <Setting /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isAuth ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/editProfile"
          element={isAuth ? <EditProfile /> : <Navigate to="/" />}
        />
        <Route
          path="/paywall"
          element={isAuth ? <Paywall /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
