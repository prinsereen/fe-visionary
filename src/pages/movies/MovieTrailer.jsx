import Navbar from "../../components/Navbar";
import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import "plyr-react/plyr.css";
import { Dot, Loader2, Play, Plus, Volume2, VolumeX } from "lucide-react";
import ReactPlayer from "react-player/youtube";
import { useSelector } from "react-redux";
import axios from "axios";
import ScrollableCard from "../../components/ScrollableCard";
import getEnglishNameByCode from "../../utils/languages";

const MovieTrailer = () => {
  const [data, setData] = useState(null);
  const [muted, setMuted] = useState(true);
  const [trailer, setTrailer] = useState(null);
  const [moreMovie, setMoreMovie] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [loadingList, setLoadingList] = useState(false); // Added loading state

  // eslint-disable-next-line no-unused-vars
  const [subscribed, setSubscribed] = useState(true);

  const { id } = useParams();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/recomendation/movie/${id}/1`,
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
        const response = await axios.get(`http://localhost:5000/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);

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

  const formattedDate = new Date(data.release_date).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  const language = getEnglishNameByCode(data.original_language);

  const handleAddToWatchList = async () => {
    const data = {
      items: [{ media_type: "movie", media_id: id }],
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
    <div className="w-full h-full flex overflow-x-auto scrollbar-hide">
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
                  cc_load_policy: 1,
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
          <div className="absolute bottom-0 p-5 pl-32 w-full bg-gradient-to-t from-[#0F1014] ">
            <h1 className="font-bold text-32 overflow-hidden overflow-ellipsis max-w-[30%] mb-2">
              {data.title}
            </h1>
            <div className="flex w-full items-center mb-4">
              <h1 className="text-16 font-semibold ">{formattedDate}</h1>
              <Dot />
              <h1 className="text-16  font-semibold ">{data.runtime} m</h1>
              <Dot />
              <h1 className="text-16 font-semibold ">{language}</h1>
              <Dot />
              <h1 className="text-16 font-semibold ">
                {data.release_dates &&
                  data.release_dates.release_dates &&
                  data.release_dates.release_dates[0]?.certification}
              </h1>
              <Dot />
              <h1 className="text-16 font-semibold ">{data.genres[0].name}</h1>
            </div>

            <p className="text-16 w-[30%] mb-3 text-[#A1A2A2]">
              {data.overview}
            </p>

            <div className="flex justify-between items-center gap-4 py-3">
              <div className="flex gap-5 py-3">
                <Link
                  to={`${subscribed ? `/movie/play/${id}` : "/paywall"} `}
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
            <h1 className="font-bold text-[32px] ">More Movie</h1>
            <Link to="/movies" className="text-[20px]  cursor-pointer px-3">
              lihat lainnya
            </Link>
          </div>
          <div className="">
            <ScrollableCard movies={moreMovie} name="movie" />
          </div>
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

export default MovieTrailer;
