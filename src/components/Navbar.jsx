import { Search, Home, Video, Film, profilePhoto } from "../assets";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [hover, setHover] = useState("");

  // Get the currentPath (ex. home, video, film)
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const firstPath = pathSegments[1];

  useEffect(() => {
    setActive(firstPath);
  }, [firstPath]);

  return (
    <div className="w-40 h-[100vh] fixed bg-black flex flex-col justify-center items-center gap-10">
      <Link
        to="/home"
        onClick={() => {
          setActive("home");
        }}
      >
        <Home
          fill={`${
            active === "home" || hover === "home" ? "#01798E" : "white"
          }`}
          onMouseEnter={() => {
            setHover("home");
          }}
          onMouseLeave={() => {
            setHover("");
          }}
        />
      </Link>
      <Link
        to="/search"
        onClick={() => {
          setActive("search");
        }}
      >
        <Search
          fill={`${
            active === "search" || hover === "search" ? "#01798E" : "white"
          }`}
          onMouseEnter={() => {
            setHover("search");
          }}
          onMouseLeave={() => {
            setHover("");
          }}
        />
      </Link>
      <Link
        to="/film"
        onClick={() => {
          setActive("film");
        }}
      >
        <Film
          fill={`${
            active === "film" || hover === "film" ? "#01798E" : "white"
          }`}
          onMouseEnter={() => {
            setHover("film");
          }}
          onMouseLeave={() => {
            setHover("");
          }}
        />
      </Link>
      <Link
        to="/video"
        onClick={() => {
          setActive("video");
        }}
      >
        <Video
          fill={`${
            active === "video" || hover === "video" ? "#01798E" : "white"
          }`}
          onMouseEnter={() => {
            setHover("video");
          }}
          onMouseLeave={() => {
            setHover("");
          }}
        />
      </Link>
     
      <img src={profilePhoto} />
    </div>
  );
};

export default Navbar;
