import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Card from "../../components/Card";
import axios from "axios";
import { useSelector } from "react-redux";

const CardSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const token = useSelector((state) => state.token);

  const [loading, setLoading] = useState(true);

  const isCategorySelected = (category) => {
    return selectedCategory === category;
  };

  const showNextCards = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex + 4;
      const nextPage = Math.ceil(newIndex / 4) + 1;
      if (nextPage > 3) {
        setCurrentPage(1);
        return 0;
      } else {
        setCurrentPage(nextPage);
        return newIndex;
      }
    });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const showPreviousCards = () => {
    setStartIndex((prevIndex) => {
      const newIndex = Math.max(0, prevIndex - 4);
      setCurrentPage(Math.ceil(newIndex / 4) + 1);
      return newIndex;
    });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/${selectedCategory}/1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data.results);
        setData(response.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [token, selectedCategory]);

  if (!data) {
    return null;
  }

  // const moviesWithPosterPath = data.filter(
  //   (movie) => movie.poster_path !== null
  // );

  const visibleMovies = data ? data.slice(startIndex, startIndex + 4) : [];

  return (
    <div className="h-full flex flex-col py-10 items-center justify-center font-sans">
      <h2 className="text-[#01798E] font-bold text-20">SELECTION</h2>
      <h1 className="text-bold text-[40px]">A best movie just for you</h1>
      <div className="flex relative gap-20  text-[20px] opacity-80">
        <button
          className={`w-28 ${
            isCategorySelected("popular")
              ? "opacity-100 border-b-[6px] border-[#01798E] py-5"
              : "opacity-80"
          }`}
          onClick={() => {
            setSelectedCategory("popular");
            setCurrentPage(1);
            setStartIndex(0);
          }}
        >
          Popular
        </button>
        <button
          className={`w-40 ${
            isCategorySelected("toprated")
              ? "opacity-100 border-b-[6px] border-[#01798E] py-5"
              : "opacity-80"
          }`}
          onClick={() => {
            setSelectedCategory("toprated");
            setCurrentPage(1);
            setStartIndex(0);
          }}
        >
          Top Rated Movie
        </button>
        <button
          className={`w-28 ${
            isCategorySelected("bestselling")
              ? "opacity-100 border-b-[6px] border-[#01798E] py-5"
              : "opacity-80"
          }`}
          onClick={() => {
            setSelectedCategory("bestselling");
            setCurrentPage(1);
            setStartIndex(0);
          }}
        >
          Best Selling
        </button>
        <button
          className={`w-36 ${
            isCategorySelected("latest")
              ? "opacity-100 border-b-[6px] border-[#01798E] py-5"
              : "opacity-80"
          }`}
          onClick={() => {
            setSelectedCategory("latest");
            setCurrentPage(1);
            setStartIndex(0);
          }}
        >
          New Release
        </button>
        <button
          className={`w-40 ${
            isCategorySelected("oldest")
              ? "opacity-100 border-b-[6px] border-[#01798E] py-5 "
              : "opacity-80"
          }`}
          onClick={() => {
            setSelectedCategory("oldest");
            setCurrentPage(1);
            setStartIndex(0);
          }}
        >
          Blast from Past
        </button>
        <div className="h-1 w-full rounded-xl bg-gray opacity-25 absolute bottom-0 " />
      </div>
      <div className=" flex items-center justify-center gap-5 mt-10 w-full relative ">
        <div className=" flex   justify-center">
          <ChevronLeft
            className="h-16 w-16 opacity-50 cursor-pointer absolute top-[45%] left-[8%] "
            onClick={showPreviousCards}
          />
        </div>
        {loading ? (
          <div className="h-[50vh] w-[50%] flex items-center justify-center">
            <Loader2 className="animate-spin " />
          </div>
        ) : (
          <div className="overflow-x-auto gap-5 flex ">
            {visibleMovies.map((movie, index) => (
              <motion.div key={index}>
                <Card movie={movie} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <ChevronRight
            className="h-16 w-16 opacity-50 cursor-pointer absolute top-[45%] right-[8%]"
            onClick={showNextCards}
          />
        </div>
      </div>
      <div className="flex h-10 w-full justify-center gap-3 mt-10">
        {Array.from({ length: 3 }, (_, index) => (
          <button
            key={index}
            className={`rounded-full bg-[#01798E] h-7 w-7 ${
              currentPage === index + 1
                ? "opacity-100"
                : "opacity-50 bg-light-gray"
            }`}
            onClick={() => {
              const limitedIndex = index * 4;
              setStartIndex(limitedIndex);
              setCurrentPage(index + 1);
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardSection;
