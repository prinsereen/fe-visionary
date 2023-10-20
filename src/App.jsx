import Register from "./pages/Register";
import Login from "./pages/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Film, Search, Video, VideoPlayed } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/film" element={<Film />} />
        <Route path="/video" element={<Video />} />
        <Route path="/videoPlayed" element={<VideoPlayed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
