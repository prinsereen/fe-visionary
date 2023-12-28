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
import getEnglishNameByCode from "../../utils/languages";
import EpisodeDetail from "../../components/EpisodeDetail";
import findCertification from "../../utils/certifcation";

const PlaySeries = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [active, setActive] = useState("");
  // let activeSeason = "";

  const playerRef = useRef(null);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/series/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        // console.log(response.data);
        setActive(response.data.seasons[0].name);
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

  const formattedDate = new Date(data.first_air_date).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
  const language = getEnglishNameByCode(data.original_language);

  const certificationInfo =
    data &&
    data.release_dates &&
    data.release_dates[0] &&
    data.release_dates[0].rating &&
    findCertification(
      data.release_dates[0].iso_3166_1,
      data.release_dates[0].rating
    );

  const listEpisode = (movie, index) => {
    const headingElements = [];
    // console.log(id);

    for (let i = 1; i <= movie.episode_count; i++) {
      headingElements.push(
        <div className="mb-10">
          <EpisodeDetail id={id} season={index} episode={i} />
        </div>
      );
    }

    return headingElements;
  };

  // const filterSeason = data && data.seasons.filter((season) => season.name !===  )

  return (
    <div className="w-full h-full flex overflow-x-hidden bg-black">
      <Navbar />
      <div className="w-[100vw] text-white pr-0 gap-1 pl-[8%] flex flex-col ">
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        {/* <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} /> */}
        <div className="w-full mt-10">
          <div className="w-full">
            <h1 className="font-bold text-32 overflow-hidden overflow-ellipsis max-w-[30%] mb-2">
              {data.name}
            </h1>
            <div className="flex w-full items-center mb-4">
              <h1 className="text-16 font-semibold ">{formattedDate}</h1>
              <Dot />
              <h1 className="text-16  font-semibold ">
                {data.episode_run_time[0] ||
                  data.last_episode_to_air?.runtime ||
                  0}{" "}
                m
              </h1>
              <Dot />
              <h1 className="text-16 font-semibold ">{language}</h1>
              <Dot />
              <div className="group flex justify-center">
                {certificationInfo && (
                  <span className="absolute -top-3 bg-slate-600 w-[20%] scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                    {certificationInfo.meaning}
                  </span>
                )}
                <div className="rounded bg-primary bg-opacity-50 px-4 py-2 text-sm text-white shadow-sm">
                  {certificationInfo ? certificationInfo.certification : "N/A"}
                </div>
              </div>
              <Dot />
              <h1 className="text-16 font-semibold ">{data.genres[0].name}</h1>
            </div>
            <p className="text-16 w-[40%] mb-3 text-[#A1A2A2]">
              {data.overview}
            </p>
          </div>
          <div className="mt-10 flex flex-col">
            <div className="flex gap-5 sticky top-0 text-20 ">
              <h1 className="font-semibold mb-7">Episodes</h1>
              {/* <h1>More Like This</h1>
              <h1>Trailer & More</h1> */}
            </div>
            <div className="bg-[#252833] mb-7 w-full h-[2px]" />
            <div className="flex gap-5 mb-7">
              {data.seasons &&
                data.seasons.map((movie, index) => (
                  <div className="" key={index}>
                    <h1
                      className={`text-20 cursor-pointer ${
                        active === movie.name ? "font-semibold" : ""
                      }`}
                      onClick={() => setActive(movie.name)}
                    >
                      {movie.name}
                    </h1>
                  </div>
                ))}
            </div>
            {data.seasons &&
              data.seasons.map((movie, index) => (
                <div className="" key={index}>
                  <div className={` ${active !== movie.name ? "hidden" : ""}`}>
                    {listEpisode(movie, movie.season_number)}
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-10">
            <div className="flex justify-between">
              <h1 className="font-bold text-[32px] ">Other Series</h1>
              <Link to="/series" className="text-[20px]  cursor-pointer px-3">
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

export default PlaySeries;
