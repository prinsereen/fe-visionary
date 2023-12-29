import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Dot } from "lucide-react";
import Navbar from "../../components/Navbar";
// import ScrollableCard from "../../components/ScrollableCard";

import VideoJS from "../../components/VideoJS";
import videojs from "video.js";
import "videojs-youtube";
import "plyr-react/plyr.css";
import { useSelector } from "react-redux";
import axios from "axios";

const PlayMovie = () => {
  const playerRef = useRef(null);
  const { id } = useParams();
  const token = useSelector((state) => state.token);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [id, token]);

  if (!data) {
    return null;
  }

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
        src: data.video,
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

  const formattedDate = new Date(data.release_date).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <div className="w-full h-full flex overflow-x-hidden bg-black">
      <Navbar />
      <div className="w-[100vw] text-white pr-0  gap-1 pl-[8%] flex flex-col ">
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        {/* <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} /> */}

        <div className="w-full mt-10">
          <div className="w-full">
            <h1 className="font-bold text-32 overflow-hidden overflow-ellipsis max-w-[30%] mb-2">
              {data.title}
            </h1>
            <div className="flex w-full items-center mb-4">
              <h1 className="text-16 font-semibold ">{formattedDate}</h1>
              <Dot />
              <h1 className="text-16  font-semibold ">{data.runtime} m</h1>
              <Dot />
              <h1 className="text-16 font-semibold ">
                {data.spoken_languages[0].english_name}
              </h1>
              <Dot />
              <h1 className="text-16 font-semibold ">
                {data.release_dates &&
                  data.release_dates.release_dates &&
                  data.release_dates.release_dates[0]?.certification || "N/A"}
              </h1>
              <Dot />
              <h1 className="text-16 font-semibold ">{data.genres[0].name}</h1>
            </div>

            <p className="text-16 w-[40%] mb-3 text-[#A1A2A2]">
              {data.overview}
            </p>
          </div>

          <div className="mt-10">
            <div className="flex justify-between">
              <h1 className="font-bold text-[32px] ">Other Movie</h1>
              <Link to="/movies" className="text-[20px]  cursor-pointer px-3">
                see more
              </Link>
            </div>
            {/* <ScrollableCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayMovie;
