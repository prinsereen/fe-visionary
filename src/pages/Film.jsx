import Navbar from "../components/Navbar";
import { film1, tonton } from "../assets";
import { Dot, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollableCard from "../components/ScrollableCard";

const Film = () => {
  return (
    <div className="w-full h-full flex bg-black overflow-x-hidden ">
      <Navbar />
      <div className="bg-black w-[100vw] text-white p-16 pr-0 pl-32 gap-5 flex flex-col">
        <div className="flex gap-20 w-full">
          <img src={film1} alt="" className="rounded-md" />
          <div className="flex flex-col w-full">
            <h1 className="font-bold text-[64px] ">Recalled</h1>
            <div className="flex w-full items-center  mb-1">
              <h1 className="text-16 font-semibold ">2023</h1>
              <Dot />
              <h1 className="text-16 w-14 font-semibold ">2h 43m</h1>
              <Dot />
              <h1 className="text-16 font-semibold ">English</h1>
              <Dot />
              <h1 className="text-16 font-semibold ">13+</h1>
              <Dot />
              <h1 className="text-16 font-semibold ">Action </h1>
            </div>
            <p className="w-[64%] mb-[20px] font-bold text-[20px]">
              Lorem ipsum dolor sit amet consectetur. Sit nibh ornare ultrices
              egestas aenean. Elementum sed tincidunt rhoncus fermentum.
              Tincidunt non aliquam ultrices sapien maecenas feugiat aliquam.{" "}
            </p>
            <div className="flex gap-7 items-center">
              <Link to="/trailer" className="relative">
                <button className="bg-[#01798E] text-white rounded-xl w-[225px] h-16 text-[24px] font-bold pl-7">
                  Watch
                </button>
                <img src={tonton} className="absolute top-[18px] left-10" />
              </Link>

              <div className="bg-[#01798E] rounded-xl w-16 h-16 flex items-center justify-center cursor-pointer">
                <Plus />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-[32px] font-bold">Rekomendasi Movie</h1>
          <ScrollableCard />
        </div>
      </div>
    </div>
  );
};

export default Film;
