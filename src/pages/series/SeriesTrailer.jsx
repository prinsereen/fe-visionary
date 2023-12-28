import Navbar from "../../components/Navbar";
import axios from "axios";

import "plyr-react/plyr.css";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Dot, Loader2, Play, Plus, Volume2, VolumeX } from "lucide-react";
import { limitWords } from "../../utils/limitWords";
import ReactPlayer from "react-player/youtube";
import getEnglishNameByCode from "../../utils/languages";
import findCertification from "../../utils/certifcation";
import ScrollableCard from "../../components/ScrollableCard";

const SeriesTrailer = () => {
  const [data, setData] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [muted, setMuted] = useState(true);
  const [trailer, setTrailer] = useState(null);
  const [moreMovie, setMoreMovie] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [loadingList, setLoadingList] = useState(false); // Added loading state

  const { id } = useParams();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data.result.user.jenis_pengguna === "subscribed");
        if (response.data.result.user.jenis_pengguna === "subscribed") {
          setIsSubscribed(true);
        }
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
        const response = await axios.get(
          `http://localhost:5000/recomendation/series/${id}/1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data.results);
        setMoreMovie(response.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        // Set loading to false after a delay of 2000 milliseconds (2 seconds)
        setTimeout(() => {
          setLoading(false);
        }, 2300);
      }
    };
    // Call the fetchData function when the component mounts
    fetchData();
  }, [token, id]);

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
        if (response.data.videos.results) {
          const trailerVideos = await response.data.videos.results.filter(
            (video) => video.type === "Trailer"
          );
          const filteredVideos =
            (await trailerVideos.length) > 0
              ? trailerVideos
              : response.data.videos.results.filter(
                  (video) => video.type === "Teaser"
                );
          setTrailer(filteredVideos);
        }
        // console.log(response.data);
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

  const language = getEnglishNameByCode(data.original_language);

  const formattedDate = new Date(data.first_air_date).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  const certificationInfo =
    data &&
    data.release_dates &&
    data.release_dates[0] &&
    data.release_dates[0].rating &&
    findCertification(
      data.release_dates[0].iso_3166_1,
      data.release_dates[0].rating
    );

  const overview = limitWords(data.overview, 102);

  const handleAddToWatchList = async () => {
    const data = {
      items: [{ media_type: "tv", media_id: id }],
    };
    // console.log(data);
    try {
      setLoadingList(true);
      const response = await axios.post("http://localhost:5000/item", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingList(false);
    }
  };

  return (
    <div className="w-full h-full flex">
      <Navbar />
      {loading && (
        <div className="absolute h-full w-full flex items-center justify-center">
          <Loader2 className="animate-spin " />
        </div>
      )}
      <div className="w-full text-white pr-0  gap-1 flex flex-col ">
        <div className="relative -top-[190px]">
          <ReactPlayer
            url={`https://www.youtube.com/embed/${trailer[0]?.key}?rel=0 `}
            config={{
              youtube: {
                playerVars: {
                  controls: 0,
                  autoplay: 1,
                  showinfo: 0,
                  cc_load_policy: 0,
                  iv_load_policy: 3,

                  rel: 0,
                  enablejsapi: 1,
                },
              },
            }}
            loop
            playing
            width="100%"
            height="100%"
            muted={muted}
            className="youtube-container"
          />
          <div className="absolute bottom-0 px-5 pl-32 w-full bg-gradient-to-t from-[#0F1014]">
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

            <p className="text-16 w-[30%] mb-3 text-[#A1A2A2]">{overview}</p>

            <div className="flex justify-between items-center gap-4 py-3">
              <div className="flex gap-5 py-3">
                <Link
                  to={`${isSubscribed ? `/series/play/${id}` : "/paywall"} `}
                  className="flex items-center bg-opacity-50 gap-3 justify-center bg-[#01798E] w-80 h-12 px-5 text-white rounded-lg hover:opacity-80 hover:scale-105  transition-all ease-in "
                >
                  <Play className="h-4 w-4 " />
                  <button className="font-semibold opacity-100 text-16">
                    Subscribe to Watch
                  </button>
                </Link>

                <div className="bg-[#01798E] bg-opacity-50 rounded-lg w-12 h-12 flex px-2 items-center justify-center cursor-pointer hover:opacity-80 hover:scale-105  transition-all ease-in ">
                  {loadingList ? (
                    <Loader2 className="animate-spin " />
                  ) : (
                    <Plus onClick={handleAddToWatchList} />
                  )}
                </div>
              </div>
              {muted ? (
                <VolumeX
                  onClick={() => setMuted(!muted)}
                  className="cursor-pointer"
                />
              ) : (
                <Volume2
                  onClick={() => setMuted(!muted)}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>

        <div className="pl-32">
          <div className="flex justify-between">
            <h1 className="font-bold text-[32px] ">More Series</h1>
            <Link to="/movies" className="text-[20px]  cursor-pointer px-3">
              see more
            </Link>
          </div>
          <ScrollableCard movies={moreMovie} name="series" />
        </div>
        {/* <div className="pl-32">
          <h1 className="font-bold text-[32px]">Video Lainnya</h1>
          {moreVideo.map((video, index) => (
            <div className="" key={index}>
             <img src={IMAGE_BASE_URL + video.poster_path} />
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default SeriesTrailer;
