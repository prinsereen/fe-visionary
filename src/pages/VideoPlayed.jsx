import Navbar from "../components/Navbar";
import { recalled4, recalled5, recalled6, recalled } from "../assets";
import { Link } from "react-router-dom";

import VideoJS from "../components/VideoJS";
import videojs from "video.js";
import { useRef } from "react";
// import Plyr from "plyr-react"
import "plyr-react/plyr.css";
import ScrollableCard from "../components/ScrollableCard";
import { Dot } from "lucide-react";
// import { off } from "video.js/dist/types/utils/events";

const VideoPlayed = () => {
  const playerRef = useRef(null);

  // const plyrProps = {
  //   source: recalled, // https://github.com/sampotts/plyr#the-source-setter
  //   // https://github.com/sampotts/plyr#options
  //   // Direct props for inner video tag (mdn.io/video)
  // }

  const videoJsOptions = {
    controls: true,
    percentAsDecimal: 0.1,
    responsive: true,
    playbackRates: [0.5, 1, 1.5, 2],
    fluid: true,
    controlBar: {
      skipButtons: {
        forward: 10,
        backward: 10,
      },
    },

    sources: [
      {
        src: recalled,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <div className="w-full h-full flex overflow-x-hidden ">
      <Navbar />
      <div className="w-[100vw] text-white pr-0 pl-32 gap-1 flex flex-col ">
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        {/* <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} /> */}

        <div className="w-full">
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
            Netus volutpat arcu urna convallis. Tristique dignissim elementum in
            non vitae amet ipsum lectus maecenas.
          </p>
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

export default VideoPlayed;
