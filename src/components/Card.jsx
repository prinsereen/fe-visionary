/* eslint-disable react/prop-types */

import { BarChart3, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { movieGenre } from "../utils/genreList";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const Card = ({ movie }) => {
  const navigate = useNavigate();

  const getGenreNamesByIds = (ids) => {

    const genre = movieGenre;
    return ids.map((id) => {
      const genreList = genre.find((genre) => genre.id === id);
      return genreList ? genreList.name : "Unknown Genre";
    });
  };

  // Example usage
  const movieGenreIds = movie.genre_ids;
  const genreNames = getGenreNamesByIds(movieGenreIds);
  const formattedGenreString = genreNames.join(", ");

  return (
    <div
      className={`relative w-64 h-full group  scrollbar-hide cursor-pointer`}
      onClick={() => navigate(`/movie/trailer/${movie.id}`)}
    >
      <img
        src={IMAGE_BASE_URL + movie.poster_path}
        alt={movie.title}
         
        className={`w-64 h-[400px] object-cover  object-top `}
        loading="lazy"
      />
      <div className="absolute text-12 bg-gradient-to-t p-2 pt-5 from-black bottom-0 flex flex-col justify-start w-full opacity-0 group-hover:opacity-100 transition-opacity">
        <h1 className="font-bold text-zinc-300">{movie.title}</h1>
        <h1 className="text-zinc-300">{formattedGenreString}</h1>
        <div className="flex justify-between mt-1">
          <h1 className="flex items-center gap-1 py-1">
            <Star className="h-4 w-4 text-primary" />
            {movie.vote_average}/10
          </h1>
          <h1 className="flex items-center gap-1 ">
            <BarChart3 className="h-4 w-4 text-primary" />
            {movie.popularity}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
