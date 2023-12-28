import { Plus, Settings, Pencil } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProfile } from "../../state";
import ScrollableCard from "../../components/ScrollableCard";

const Profile = () => {
  const [data, setData] = useState(null);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const currentProfile = useSelector((state) => state.currentProfile);
  const [profile, setProfile] = useState(null);
  const [watchList, setWatchList] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data.profiles);
        setData(response.data.profiles);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const currentProfile = await response.data.result.user.current_profile;
        console.log(currentProfile);
        setProfile(currentProfile);
        if (currentProfile) {
          setCurrentProfile({ currentProfile: currentProfile });
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
        const response = await axios.get("http://localhost:5000/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.items);
        setWatchList(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [token, dispatch]);

  const handleSelectedProfile = async (id) => {
    const selectedProfile = { profileId: id };

    try {
      const response = await axios.patch(
        "http://localhost:5000/profile",
        selectedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const profileChanged = await response.data;
      if (profileChanged) {
        dispatch(
          setCurrentProfile({ currentProfile: selectedProfile.profileId })
        );
        console.log("Current Profile after dispatch:", currentProfile);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!data || !profile) {
    return null;
  }

  const activeProfile = data.find((data) => data.id === profile);

  return (
    <div className="w-full min-h-screen flex bg-black">
      <Navbar />
      <div className="bg-black w-full text-white pl-32 pt-20  gap-5 flex flex-col">
        {/* <div className="bg-black w-full h-full text-white p-12 pl-40 gap-16 flex flex-col items-center"> */}
        <div className="flex justify-between pr-10">
          <div>
            <h1 className="text-[36px] font-bold ">
              Hello, {activeProfile.profile_name}
            </h1>
            <h2 className="text-[#8E8383] mb-10">
              +6281285097809 - {user.email}
            </h2>
          </div>
          <div className="flex gap-7">
            <button
              className="bg-primary h-16 w-52 rounded-xl text-18 font-semibold hover:scale-105 transition-all ease-in "
              onClick={() => navigate("/paywall")}
            >
              Subscribe
            </button>
            <button
              className="bg-zinc-800 h-16 w-52 rounded-xl text-18 font-semibold flex justify-center items-center gap-2 hover:scale-105 transition-all ease-in hover:bg-zinc-600"
              onClick={() => navigate("/setting")}
            >
              <Settings />
              Help & Setting
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <h1 className="text-24 font-bold">Profiles</h1>
          <button
            className="flex justify-center items-center text-20 pr-10 gap-1 font-semibold hover:scale-105"
            onClick={() => navigate("/editProfile")}
          >
            <Pencil className="w-5 h-5 " />
            Edit
          </button>
        </div>
        <div className="flex gap-10 mb-14">
          {data.map((profile, index) => (
            <div
              className={`flex flex-col items-center justify-start hover:scale-110 cursor-pointer`}
              key={index}
              onClick={() => {
                handleSelectedProfile(profile.id);
              }}
            >
              <img
                src={profile.profileUrl}
                alt="profile picture"
                className={`h-[92px] w-[92px] rounded-full  object-cover mb-4 ${
                  activeProfile.id === profile.id && "border"
                }`}
              />
              <p
                className={`${activeProfile.id === profile.id && "font-bold"}`}
              >
                {profile.profile_name}
              </p>
            </div>
          ))}
          <div className="flex flex-col items-center justify-start hover:scale-110">
            <Link
              className="bg-zinc-700 rounded-full h-[92px] w-[92px] flex justify-center items-center mb-4"
              to="/newProfile"
            >
              <Plus />
            </Link>
            <p className="font-semibold">Add</p>
          </div>
        </div>
        <div className="w-full ">
          <h1 className="text-24 font-bold">Watch List</h1>
          {watchList && <ScrollableCard movies={watchList} name="list" />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
