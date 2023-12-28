import { useEffect, useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const Head = () => {
  const [data, setData] = useState(null);
  const token = useSelector((state) => state.token);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const switchToPreviousMovie = () => {
    setCurrentMovieIndex(
      (prevIndex) =>
        (prevIndex - 1 + moviesWithBackdrop.length) % moviesWithBackdrop.length
    );
    setImageLoaded(false);
  };

  const switchToNextMovie = () => {
    setCurrentMovieIndex(
      (prevIndex) => (prevIndex + 1) % moviesWithBackdrop.length
    );
    setImageLoaded(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/upcoming/1", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.results.length > 0) {
          setData(response.data.results);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [token]);

  if (!data) {
    return null; // or display a loading state
  }

  const moviesWithBackdrop = data.filter(
    (movie) => movie.backdrop_path !== null
  );
  
  if (moviesWithBackdrop.length === 0) {
    return null; // or handle the case where there are no movies with backdrop paths
  }

  const currentMovie = moviesWithBackdrop[currentMovieIndex];

  if (!currentMovie || !currentMovie.release_date) {
    return null; // or handle the case where release_date is undefined or null
  }


  const formattedDate = new Date(currentMovie.release_date).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <div className="h-[100vh] w-full">
      <img
        src={IMAGE_BASE_URL + currentMovie.backdrop_path} // Replace 'posterPath' with the actual key in your API response
        alt={currentMovie.title} // Replace 'title' with the actual key in your API response
        className={`h-full w-full object-cover opacity-20 transition-all ${
          imageLoaded ? "" : "hidden"
        }`}
        onLoad={() => setImageLoaded(true)}
      />

      <div className="flex items-center justify-center h-[100vh] gap-32 w-full absolute top-0">
        <button onClick={switchToPreviousMovie}>
          <ChevronLeft className="h-28 w-28 absolute  opacity-50 top-[45%] left-[10%]" />
        </button>
        <div className="flex flex-col h-[100vh] justify-center items-center max-w-[50%]">
          <h1 className="font-sans text-20 text-[#01798E] font-bold">
            COMING SOON
          </h1>
          <h1 className="text-[60px]  overflow-hidden overflow-ellipsis text-center">
            {currentMovie.title}
          </h1>
          <h1>{formattedDate}</h1>
          <button
            className="flex justify-center items-center gap-2 bg-[#01798E] rounded-[20px] h-12 w-48 mt-8 cursor-pointer"
            onClick={() => navigate(`/movie/trailer/${currentMovie.id}`)}
          >
            <Play />
            <h1>Watch Trailer</h1>
          </button>
        </div>
        <button onClick={switchToNextMovie}>
          <ChevronRight className="h-28 w-28 opacity-50 absolute top-[45%] right-[10%]" />
        </button>
      </div>
    </div>
  );
};

export default Head;
