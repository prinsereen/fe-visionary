import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Film, Video } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProfile } from "../state";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState(null);

  // Get the currentPath (ex. home, video, film)
  const location = useLocation();
  const dispatch = useDispatch();
  const pathSegments = location.pathname.split("/");
  const firstPath = pathSegments[1];
  const token = useSelector((state) => state.token);

  useEffect(() => {
    setActive(firstPath);
  }, [firstPath]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const currentProfile = await response.data.result.user.current_profile;
        // console.log(currentProfile);
        setProfile(currentProfile);
        if (currentProfile) {
          dispatch(setCurrentProfile(currentProfile));
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [token, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data.profiles[0].profileUrl);
        if (response.data.profiles && profile !== null) {
          const profiles = response.data.profiles.filter(
            (profiles) => profiles.id === profile
          );

          if (profiles.length > 0 && profiles[0].profileUrl) {
            const filteredProfile = profiles[0].profileUrl;
            setData(filteredProfile);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [token, profile]);

  if (!data) {
    return null;
  }

  return (
    <div
      className={`w-28 h-full fixed bg-black bg-transparent flex px-5 flex-col justify-center items-start gap-10 z-20 ${
        isHovered
          ? "hover:bg-gradient-to-r from-black hover:bg-opacity-50 hover:w-[400px]"
          : ""
      } `}
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
            } transition ease-in-out  ${
              active === "home" ? "text-white" : ""
            } `}
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
            } transition ease-in-out ${
              active === "search" ? "text-white" : ""
            }`}
          >
            Search
          </h1>
        </Link>
        <Link
          to="/movies"
          onClick={() => {
            setActive("movies");
            setIsHovered(false);
            setTimeout(() => {
              setIsHovered(true);
            }, 1000);
          }}
          className="flex gap-5 font-bold hover:translate-x-1"
        >
          <Film
            className={`${
              active === "movies" ? "text-[#01798E]" : "bg-transparent"
            } hover:text-[#01798E]`}
          />
          <h1
            className={`text-20 text-gray hover:text-white ${
              isHovered ? "opacity-100" : "opacity-0"
            } transition ease-in-out ${
              active === "movies" ? "text-white" : ""
            }`}
          >
            Movies
          </h1>
        </Link>
        <Link
          to="/series"
          onClick={() => {
            setActive("series");
            setIsHovered(false);
            setTimeout(() => {
              setIsHovered(true);
            }, 1000);
          }}
          className="flex gap-5 hover:translate-x-1 font-bold"
        >
          <Video
            className={`${
              active === "series" ? "text-[#01798E]" : "bg-transparent"
            } hover:text-[#01798E]`}
          />
          <h1
            className={`text-20 text-gray hover:text-white  ${
              isHovered ? "opacity-100" : "opacity-0"
            } transition ease-in-out ${
              active === "series" ? "text-white" : ""
            }`}
          >
            Series
          </h1>
        </Link>

        <Link
          to={"/profile"}
          className="flex gap-5 font-bold hover:translate-x-1"
          onClick={() => {
            setActive("profile");
            setIsHovered(false);
            setTimeout(() => {
              setIsHovered(true);
            }, 1000);
          }}
        >
          <img src={data} className="h-7 w-7 rounded-full object-cover border" />
          <h1
            className={`text-20 text-gray hover:text-white ${
              isHovered ? "opacity-100" : "opacity-0"
            } transition ease-in-out ${
              active === "profile" ? "text-white" : ""
            }`}
          >
            Profile
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
