import Navbar from "../components/Navbar";
import { recalled4, recalled5, recalled6, recalled } from "../assets";
import { Link } from "react-router-dom";

import { useState } from "react";
// import Plyr from "plyr-react"
import "plyr-react/plyr.css";
import ScrollableCard from "../components/ScrollableCard";
import { Dot, Play, Plus, Volume2, VolumeX } from "lucide-react";
// import { off } from "video.js/dist/types/utils/events";

const TrailerPlayed = () => {
  const [muted, setMuted] = useState(true);


  // const plyrProps = {
  //   source: recalled, // https://github.com/sampotts/plyr#the-source-setter
  //   // https://github.com/sampotts/plyr#options
  //   // Direct props for inner video tag (mdn.io/video)
  // }


  return (
    <div className="w-full h-full flex overflow-x-hidden ">
      <Navbar />
      <div className="w-[100vw] text-white pr-0 pl-32 gap-1 flex flex-col ">
        <div className="relative">
          {/* <VideoJS options={videoJsOptions} onReady={handlePlayerReady} /> */}
         <video muted={muted} autoPlay loop src={recalled} className="w-full rounded-xl"></video>
          {/* <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} /> */}
          {/* <Plyr source={recalled} /> */}
          <div className="absolute bottom-0 p-5 w-full bg-gradient-to-t from-black">
            <h1 className="font-bold text-[64px]">Recalled</h1>

            <div className="flex w-full items-center mb-2">
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

            <p className="text-16 w-[30%]">
              Lorem ipsum dolor sit amet consectetur. A metus in quam quam nunc.
              Netus volutpat arcu urna convallis. Tristique dignissim elementum
              in non vitae amet ipsum lectus maecenas.
            </p>

            <div className="flex justify-between items-center gap-3 py-3">
              <div className="flex gap-3 py-3">
                <Link
                  to="/videoPlayed"
                  className="flex items-center  gap-3 justify-center bg-[#01798E] w-64 h-12 px-5 text-white rounded-lg hover:opacity-80  "
                >
                  <Play className="h-4 w-4 " />
                  <button className="font-semibold text-16">
                    Subscribe to Watch
                  </button>
                </Link>

                <div className="bg-[#01798E] rounded-lg w-12 h-12 flex px-2 items-center justify-center cursor-pointer hover:opacity-80 ">
                  <Plus className="h-5 w-5" />
                </div>
              </div>
              {muted ? (
                <VolumeX onClick={() => setMuted(!muted)} className="cursor-pointer" />
              ) : (
                <Volume2 onClick={() => setMuted(!muted)} className="cursor-pointer" />
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="font-bold text-[32px] mb-4">Episode</h1>
          <div className="flex gap-5">
            <div>
              <img src={recalled4} alt="" />
              <div className="flex items-center gap-5">
                <h1 className="text-[24px]">Recalled</h1>
                <div className="rounded-full bg-white w-2 h-2" />
                <h1 className="text-[24px]">Episode 4</h1>
              </div>
            </div>
            <div>
              <img src={recalled5} alt="" />
              <div className="flex items-center gap-5">
                <h1 className="text-[24px]">Recalled</h1>
                <div className="rounded-full bg-white w-2 h-2" />
                <h1 className="text-[24px]">Episode 5</h1>
              </div>
            </div>
            <div>
              <img src={recalled6} alt="" />
              <div className="flex items-center gap-5">
                <h1 className="text-[24px]">Recalled</h1>
                <div className="rounded-full bg-white w-2 h-2" />
                <h1 className="text-[24px]">Episode 6</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex justify-between">
            <h1 className="font-bold text-[32px] ">Serial Populer Lainnya</h1>
            <Link to="/video" className="text-[20px]  cursor-pointer px-3">
              lihat lainnya
            </Link>
          </div>
          <ScrollableCard />
        </div>
      </div>
    </div>
  );
};

export default TrailerPlayed;
