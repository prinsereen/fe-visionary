import { account1, account2 } from "../../assets";
import { Plus, Settings, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex bg-black">
      <Navbar />
      <div className="bg-black w-[100vw] text-white p-12 pl-40 pt-20 pr-20 gap-5 flex flex-col">
        {/* <div className="bg-black w-full h-full text-white p-12 pl-40 gap-16 flex flex-col items-center"> */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-[36px] font-bold ">Hello, Kim DaHyun</h1>
            <h2 className="text-[#8E8383] mb-10">
              +6281285097809 - kimdahyun@gmail.com
            </h2>
          </div>
          <div className="flex gap-7">
            <button
              className="bg-primary h-16 w-72 rounded-xl text-18 font-semibold "
              onClick={() => navigate("/paywall")}
            >
              Berlangganan
            </button>
            <button
              className="bg-zinc-800 h-16 w-72 rounded-xl text-18 font-semibold flex justify-center items-center gap-2"
              onClick={() => navigate("/setting")}
            >
              <Settings />
              Pengaturan
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <h1 className="text-24 font-bold">Profiles</h1>
          <button
            className="flex justify-center items-center text-24 gap-3 font-semibold"
            onClick={() => navigate("/editProfile")}
          >
            <Pencil />
            Edit
          </button>
        </div>
        <div className="flex gap-10 mb-14">
          <div className="flex flex-col items-center justify-start">
            <img src={account1} alt="" className=" mb-4" />
            <p>Audeyy</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <img src={account2} alt="" className=" mb-4" />
            <p className="text-primary">Ernnnn</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <button className="bg-zinc-700 rounded-full h-[92px] w-[92px] flex justify-center items-center mb-4">
              <Plus />
            </button>
            <p className="font-semibold">Tambah</p>
          </div>
        </div>
        <div>
          <h1 className="text-24 font-bold">Watch List</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
