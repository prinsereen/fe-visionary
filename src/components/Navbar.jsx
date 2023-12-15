import { profilePhoto } from "../assets";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Film, Video } from "lucide-react";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  // Get the currentPath (ex. home, video, film)
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const firstPath = pathSegments[1];

  useEffect(() => {
    setActive(firstPath);
  }, [firstPath]);

  return (
    <div
      className={`w-28 h-full fixed bg-black bg-transparent flex px-5 flex-col justify-center items-start gap-10 z-20 ${isHovered ? "hover:bg-gradient-to-r from-black hover:bg-opacity-50 hover:w-[400px]" : "" } `}
    >
      <div
        className="w-28 h-[40%] fixed bg-black bg-transparent flex px-5 flex-col justify-center items-start gap-10 z-20 "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          to="/home"
          onClick={() => {
            setActive("home");
            setIsHovered(false);
            setTimeout(() => {
              setIsHovered(true);
            }, 1000);
          }}
          className="flex  gap-5 font-bold  hover:translate-x-1"
        >
          <Home
            className={`${
              active === "home" ? "text-[#01798E] font-bold" : "bg-transparent"
            } hover:text-[#01798E] `}
          />
          <h1
            className={`text-20 text-gray hover:text-white ${
              isHovered ? "opacity-100" : "opacity-0"
            } transition ease-in-out  `}
          >
            Home
          </h1>
        </Link>
        <Link
          to="/search"
          onClick={() => {
            setActive("search");
            setIsHovered(false);
            setTimeout(() => {
              setIsHovered(true);
            }, 1000);
          }}
          className="flex gap-5 font-bold hover:translate-x-1 "
        >
          <Search
            className={`${
              active === "search" ? "text-[#01798E]" : "bg-transparent"
            } hover:text-[#01798E]`}
          />
          <h1
            className={`text-20 text-gray hover:text-white ${
              isHovered ? "opacity-100" : "opacity-0"
            } transition ease-in-out`}
          >
            Search
          </h1>
        </Link>
        <Link
          to="/film"
          onClick={() => {
            setActive("film");
            setIsHovered(false);
            setTimeout(() => {
              setIsHovered(true);
            }, 1000);
          }}
          className="flex gap-5 font-bold hover:translate-x-1"
        >
          <Film
            className={`${
              active === "film" ? "text-[#01798E]" : "bg-transparent"
            } hover:text-[#01798E]`}
          />
          <h1
            className={`text-20 text-gray hover:text-white ${
              isHovered ? "opacity-100" : "opacity-0"
            } transition ease-in-out`}
          >
            Movies
          </h1>
        </Link>
        <Link
          to="/video"
          onClick={() => {
            setActive("video");
            setIsHovered(false);
            setTimeout(() => {
              setIsHovered(true);
            }, 1000);
          }}
          className="flex gap-5 hover:translate-x-1 font-bold"
        >
          <Video
            className={`${
              active === "video" ? "text-[#01798E]" : "bg-transparent"
            } hover:text-[#01798E]`}
          />
          <h1
            className={`text-20 text-gray hover:text-white  ${
              isHovered ? "opacity-100" : "opacity-0"
            } transition ease-in-out`}
          >
            Series
          </h1>
        </Link>

        <Link
          to={"/profile"}
          className="flex gap-5 font-bold hover:translate-x-1"
          onClick={() => {
            setIsHovered(false);
            setTimeout(() => {
              setIsHovered(true);
            }, 1000);
          }}
        >
          <img src={profilePhoto} className="h-7 w-7" />
          <h1
            className={`text-20 text-gray hover:text-white ${
              isHovered ? "opacity-100" : "opacity-0"
            } transition ease-in-out`}
          >
            Profile
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
