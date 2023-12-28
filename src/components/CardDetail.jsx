/* eslint-disable react/prop-types */
import { Plus, PlayCircle, Dot, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { movieGenre, seriesGenre } from "../utils/genreList";
import getEnglishNameByCode from "../utils/languages";
import { limitWords } from "../utils/limitWords";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
// eslint-disable-next-line react/prop-types
const CardDetail = ({ movie, index, length, name }) => {
  const movieReleaseYear = new Date(movie.release_date).getUTCFullYear();
  const seriesReleaseYear = new Date(movie.first_air_date).getUTCFullYear();
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.token);
  let newName = name;

  if (name === "list") {
    newName = movie.media_type === "tv" ? "series" : movie.media_type;
  }
  const getGenreNamesByIds = (ids) => {
    const genre = newName === "movie" ? movieGenre : seriesGenre;
    return ids.map((id) => {
      const genreList = genre.find((genre) => genre.id === id);
      return genreList ? genreList.name : "Unknown Genre";
    });
  };

  // Example usage
  const movieGenreIds = movie.genre_ids;
  const genreNames = getGenreNamesByIds(movieGenreIds);
  const englishName = getEnglishNameByCode(movie.original_language);

  const handleReloadAndScrollTop = () => {
    // Reload the page
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  };

  const handleAddToWatchList = async () => {
    const data = {
      items: [{ media_type: name, media_id: movie.id }],
    };
    console.log(data);
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

  const truncatedText = limitWords(movie.overview, 45);

  return (
    <div
      className={`w-full h-full flex flex-col hover:z-30 transition-all ease-in-out bg-black hover:scale-125 shadow-lg absolute top-0  rounded-xl ${
        index === 0 && " left-[35px] "
      } ${index === length - 1 && "-translate-x-[30px] "} `}
    >
      <div className="relative h-[50%] mb-2">
        <img
          src={IMAGE_BASE_URL + movie.poster_path}
          className="h-full object-cover object-top w-full"
        />
        <div className="absolute bottom-0 bg-gradient-to-t from-black h-[30%] w-full"></div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex gap-1 px-2 mb-2">
          <Link
            to={`/${newName}/trailer/${movie.id}`}
            onClick={handleReloadAndScrollTop}
            className="flex items-center  gap-1 justify-center bg-[#01798E] w-52 h-8 px-5 text-white rounded-lg hover:opacity-80  "
          >
            <PlayCircle className="h-4 w-4 " />
            <button className="font-semibold text-14">Watch</button>
          </Link>

          <div className="bg-[#01798E] rounded-lg w-8 h-8 flex px-2 items-center justify-center cursor-pointer hover:opacity-80 ">
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Plus className="h-5 w-5" onClick={handleAddToWatchList} />
            )}
          </div>
        </div>
        <div className="flex w-full items-center px-2 mb-1">
          <h1 className="text-10 font-semibold ">
            {newName === "movie" ? movieReleaseYear : seriesReleaseYear}
          </h1>
          <Dot />
          <h1 className="text-10 font-semibold ">{genreNames[0]} </h1>
          <Dot />
          <h1 className="text-10 font-semibold ">{englishName}</h1>
          <Dot />
          <h1 className="text-10 font-semibold ">{movie.vote_average}/10</h1>
          <Dot />
          <h1 className="text-10 font-semibold ">{movie.popularity}</h1>
        </div>
        <h1 className="px-2 text-10 mt-1 text-slate-400 ">{truncatedText}</h1>
      </div>
    </div>
  );
};

export default CardDetail;
