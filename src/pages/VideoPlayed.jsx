import Navbar from "../components/Navbar";
import {
  back,
  recalled4,
  recalled5,
  recalled6,
  recalled,
  film2,
  film6,
  film3,
  film4,
  film5,
} from "../assets";
import { Link } from "react-router-dom";

import VideoJS from '../components/VideoJS'
import videojs from 'video.js';
import { useRef } from "react";
import Plyr from "plyr-react"
import "plyr-react/plyr.css"

const VideoPlayed = () => {
  const playerRef = useRef(null);

  // const plyrProps = {
  //   source: recalled, // https://github.com/sampotts/plyr#the-source-setter
  //   // https://github.com/sampotts/plyr#options
  //   // Direct props for inner video tag (mdn.io/video)
  // }

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    playbackRates: [0.5, 1, 1.5, 2],
    fluid: true,
    controlBar: {
      skipButtons: {
        forward: 10,
        backward: 10,
      }
    },
    
    sources: [{
      src: recalled,
      type: 'video/mp4',
    }],
    
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };


  return (
    <div className="w-full h-full flex bg-black overflow-x-hidden ">
      <Navbar />
      <div className="bg-black w-[100vw] text-white p-12 pl-64 gap-1 flex flex-col">
        <Link
          to="/home"
          className="flex gap-3 items-center cursor-pointer mb-10 "
        >
          <img src={back} alt="" />
          <h1 className="text-[20px]">Kembali</h1>
        </Link>
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        {/* <Plyr source={recalled} /> */}
        <h1 className="font-bold text-[64px]">Recalled</h1>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-white w-2 h-2" />
          <h1 className="text-[24px]">Episode 3</h1>
        </div>
        <div className="mt-10">
          <h1 className="font-bold text-[32px] mb-4">Sipnosis</h1>
          <p className="text-[20px]">
            Lorem ipsum dolor sit amet consectetur. A metus in quam quam nunc.
            Netus volutpat arcu urna convallis. Tristique dignissim elementum in
            non vitae amet ipsum lectus maecenas. Sed consectetur habitant eget
            nisi at. Duis nec consectetur lobortis vitae. Dolor id pulvinar
            nascetur nunc. Scelerisque non quam ultrices molestie. Est risus
            suspendisse vel quam tellus morbi sit consectetur magnis. Elit
            habitant egestas tincidunt risus.
          </p>
        </div>
        <div className="mt-10">
          <h1 className="font-bold text-[32px] mb-4">Episode Selanjutnya</h1>
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
            <h1 className="font-bold text-[32px] mb-4">
              Serial Populer Lainnya
            </h1>
            <h1 className="text-[20px] mb-4 cursor-pointer ">lihat lainnya</h1>
          </div>
          <div className="flex gap-5">
            <img src={film2} alt="" />
            <img src={film3} alt="" />
            <img src={film4} alt="" />
            <img src={film5} alt="" />
            <img src={film6} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayed;
