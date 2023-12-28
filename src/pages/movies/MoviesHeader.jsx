import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { tonton } from "../../assets";
import { Dot, Loader2, Plus } from "lucide-react";
// eslint-disable-next-line react/prop-types
const MoviesHeader = ({ id }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const [firstData, setFirstData] = useState(null);
  const [loading, setLoading] = useState(false);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setFirstData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [id, token]);

  if (!firstData) {
    return null;
  }

  const formattedDate = new Date(firstData.release_date).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  const handleAddToWatchList = async () => {
    const data = {
      items: [{ media_type: "movie", media_id: id }],
    };
    // console.log(data);
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/item", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-20 w-full">
      <img
        src={IMAGE_BASE_URL + firstData.backdrop_path}
        alt=""
        className="rounded-md w-[50%]  "
      />
      <div className="flex flex-col justify-center w-full">
        <h1 className="font-bold text-36 max-w-[70%] mb-2">
          {firstData.title}
        </h1>
        <div className="flex w-full items-center  mb-2">
          <h1 className="text-16 font-semibold ">{formattedDate}</h1>
          <Dot />
          <h1 className="text-16 font-semibold ">{firstData.runtime}m</h1>
          <Dot />
          <h1 className="text-16 font-semibold ">
            {firstData.spoken_languages &&
              firstData.spoken_languages[0] &&
              firstData.spoken_languages[0].english_name}
          </h1>
          <Dot />
          <h1 className="text-16 font-semibold ">
            {firstData.release_dates &&
              firstData.release_dates.release_dates &&
              firstData.release_dates.release_dates[0]?.certification}
          </h1>
          <Dot />
          <h1 className="text-16 font-semibold ">
            {firstData.genres[0].name}{" "}
          </h1>
        </div>
        <p className="w-[64%] mb-[20px] font-bold text-16 text-[#707A94]">
          {firstData.overview}
        </p>
        <div className="flex gap-5 items-center">
          <button
            className="bg-[#01798E] hover:opacity-[80%] flex px-5 items-center justify-center gap-4 text-white rounded-xl w-[50%] h-16 text-[24px] font-semibold"
            onClick={() => navigate(`/movie/trailer/${id}`)}
          >
            <img src={tonton} className=" top-[18px] left-4" />
            Watch Trailer
          </button>

          <div className="bg-[#01798E] hover:opacity-[80%] rounded-xl w-16 h-16 flex items-center justify-center cursor-pointer">
            {loading ? (
              <Loader2 className="animate-spin " />
            ) : (
              <Plus onClick={handleAddToWatchList} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesHeader;
