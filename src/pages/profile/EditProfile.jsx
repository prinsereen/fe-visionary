import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Plus } from "lucide-react";
import axios from "axios";

const EditProfile = () => {
  const [data, setData] = useState(null);

  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data.profiles[0]);
        setData(response.data.profiles);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [token]);

  if (!data) {
    return null;
  }

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
      console.log(response);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] px-10">
       <div className="flex w-full absolute top-10 right-10 justify-end">
        <Link to="/home" className="text-primary text-20">cancel</Link>
      </div>
      <h1 className="font-bold text-40 mb-20">Pilih Profile</h1>
      <div className="flex gap-10 mb-14">
        {data.map((profile, index) => (
          <div
            className="flex flex-col items-center justify-start hover:scale-110"
            key={index}
            onClick={() => {
              handleSelectedProfile(profile.id);
            }}
          >
            <img
              src={profile.profileUrl}
              alt="profile picture"
              className="h-[92px] w-[92px] rounded-full object-cover mb-4"
            />
            <p className="">{profile.profile_name}</p>
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
    </div>
  );
};

export default EditProfile;
