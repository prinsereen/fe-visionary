import { useState } from "react";
import { kseries1, kseries2, kseries3, movie1, movie2 } from "../../assets";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

const movies = [movie1, movie2, kseries1, kseries2, kseries3];

const Head = () => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const switchToPreviousMovie = () => {
    setCurrentMovieIndex(
      (prevIndex) => (prevIndex - 1 + movies.length) % movies.length
    );
  };

  const switchToNextMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  return (
    <div className="h-[100vh] w-full">
      <img
        src={movies[currentMovieIndex]}
        className="h-full w-full  object-cover opacity-20 transition-all"
      />

      <div className="flex items-center justify-center h-[100vh] gap-32 w-full absolute top-0">
        <button onClick={switchToPreviousMovie}>
          <ChevronLeft className="h-28 w-28 opacity-50" />
        </button>
        <div className="flex flex-col h-[100vh] justify-center items-center">
          <h1 className="font-sans text-20 text-[#01798E] font-bold">
            COMING SOON
          </h1>
          <h1 className="text-[80px]">Fantastic Beast</h1>
          <h1>October 28, 2017</h1>
          <button className="flex justify-center items-center gap-2 bg-[#01798E] rounded-[20px] h-12 w-48 mt-8 cursor-pointer">
            <Play />
            <h1>Watch Trailer</h1>
          </button>
        </div>
        <button onClick={switchToNextMovie}>
          <ChevronRight className="h-28 w-28 opacity-50" />
        </button>
      </div>
    </div>
  );
};

export default Head;
