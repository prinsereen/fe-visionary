import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";

import {
  Login,
  Register,
  Home,
  SearchPage,
  Movies,
  MovieTrailer,
  PlayMovie,
  Series,
  SeriesTrailer,
  PlaySeries,
  Profile,
  EditProfile,
  NewProfile,
  Setting,
  ViewMore,
  Paywall,
} from "./pages";

import { useSelector } from "react-redux";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={isAuth ? <Home /> : <Login />} />
        <Route
          path="/search"
          element={isAuth ? <SearchPage /> : <Navigate to="/" />}
        />
        <Route
          path="/viewMore"
          element={isAuth ? <ViewMore /> : <Navigate to="/" />}
        />
        <Route
          path="/movies"
          element={isAuth ? <Movies /> : <Navigate to="/" />}
        />
        <Route
          path="/series"
          element={isAuth ? <Series /> : <Navigate to="/" />}
        />
        <Route
          path="/movie/play/:id"
          element={isAuth ? <PlayMovie /> : <Navigate to="/" />}
        />
        <Route
          path="/movie/trailer/:id"
          element={isAuth ? <MovieTrailer /> : <Navigate to="/" />}
        />
        <Route
          path="/series/play/:id"
          element={isAuth ? <PlaySeries /> : <Navigate to="/" />}
        />
        <Route
          path="/series/trailer/:id"
          element={isAuth ? <SeriesTrailer /> : <Navigate to="/" />}
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
          path="/newProfile"
          element={isAuth ? <NewProfile /> : <Navigate to="/" />}
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
