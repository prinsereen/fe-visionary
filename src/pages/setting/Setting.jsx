import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircleUser, HelpCircle, Lock, Sliders } from "lucide-react";
import { setLogout } from "../../state";

import Navbar from "../../components/Navbar";
import Device from "./Device";
import Language from "./Language";
import Parental from "./Parental";

const Setting = () => {
  const [active, setActive] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex w-full h-full items-center ">
      <Navbar />
      <div className="flex flex-col items-center px-40 py-20 w-1/2 gap-5 ">
        <h1 className="text-51 font-bold mb-20">Pengaturan</h1>
        <div
          className={`flex gap-2 cursor-pointer p-3 items-center h-full w-[100%] justify-center ${
            active === 1 ? "border-white border rounded-2xl " : ""
          }`}
          onClick={() => setActive(1)}
        >
          <CircleUser className="h-16 w-16 opacity-20" />
          <div className="flex flex-col text-center">
            <h1 className="font-semibold text-24">Langganan & Perangkat</h1>
            <h2 className="text-[#8E8383] text-18">
              Atur Berlangganan dan perangkat
            </h2>
          </div>
        </div>
        <div className="h-[1px] w-[100%] bg-white " />
        <div
          className={`flex gap-2 cursor-pointer p-3 items-center w-full justify-center  ${
            active === 2 ? "border-white border rounded-2xl " : ""
          }`}
          onClick={() => setActive(2)}
        >
          <Sliders className="h-16 w-16 opacity-20" />
          <div className="flex flex-col text-center mx-5">
            <h1 className="font-semibold text-24">Pengaturan Website</h1>
            <h2 className="text-[#8E8383] text-18">Bahasa</h2>
          </div>
        </div>
        <div className="h-[1px] w-full bg-white " />
        <div
          className={`flex gap-2 cursor-pointer p-3 w-full justify-center  ${
            active === 3 ? "border-white border rounded-2xl " : ""
          }`}
          onClick={() => setActive(3)}
        >
          <Lock className="h-16 w-16 opacity-20" />
          <div className="flex flex-col text-center mx-1">
            <h1 className="font-semibold text-24">Pengawasan Orang Tua</h1>
            <h2 className="text-[#8E8383] text-18">Kendali Orang Tua</h2>
          </div>
        </div>
        <div className="h-[1px] w-full bg-white " />
        <div
          className={`flex gap-2 cursor-pointer mb-20 p-3 w-full justify-center  ${
            active === 4 ? "border-white border rounded-2xl " : ""
          }`}
          onClick={() => setActive(4)}
        >
          <HelpCircle className="h-16 w-16 opacity-20" />
          <div className="flex flex-col text-center mx-2">
            <h1 className="font-semibold text-24">Bantuan & Dukungan</h1>
            <h2 className="text-[#8E8383] text-18">Pusat Bantuan</h2>
          </div>
        </div>
        <div className="w-full">
          <button
            className="text-24 px-5 py-2 bg-zinc-800 font-semibold rounded-xl hover:bg-zinc-600 transition-all"
            onClick={() => {
              dispatch(setLogout());
              navigate("/");
            }}
          >
            Log Out
          </button>
        </div>
      </div>
      <div className="h-[100vh] w-[2px] bg-white rounded-xl opacity-50" />
      <div className="w-1/2 h-[100vh] ">
        {active === 1 && <Device />}
        {active === 2 && <Language />}
        {active === 3 && <Parental />}
      </div>
    </div>
  );
};

export default Setting;
