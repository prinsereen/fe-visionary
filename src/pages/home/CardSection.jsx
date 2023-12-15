import { useState } from "react";
import { kseries1, kseries2, kseries3, movie1, movie2 } from "../../assets";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Card from "../../components/Card";
import { slideIn } from "../../utils/motion";

const movies = [movie1, movie2, kseries1, kseries2, kseries3];

const CardSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Popular");
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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
  };

  const showPreviousCards = () => {
    setStartIndex((prevIndex) => {
      const newIndex = Math.max(0, prevIndex - 4);
      setCurrentPage(Math.ceil(newIndex / 4) + 1);
      return newIndex;
    });
  };

  const visibleMovies = movies.slice(startIndex, startIndex + 4);

  return (
    <div className="h-full flex flex-col py-10 items-center justify-center font-sans">
      <h2 className="text-[#01798E] font-bold text-20">SELECTION</h2>
      <h1 className="text-bold text-[40px]">A best movie just for you</h1>
      <div className="flex relative gap-20  text-[20px] opacity-80">
        <button
          className={`w-28 ${
            isCategorySelected("Popular")
              ? "opacity-100 border-b-[6px] border-[#01798E] py-5"
              : "opacity-80"
          }`}
          onClick={() => setSelectedCategory("Popular")}
        >
          Popular
        </button>
        <button
          className={`w-40 ${
            isCategorySelected("Top Rated Movie")
              ? "opacity-100 border-b-[6px] border-[#01798E] py-5"
              : "opacity-80"
          }`}
          onClick={() => setSelectedCategory("Top Rated Movie")}
        >
          Top Rated Movie
        </button>
        <button
          className={`w-28 ${
            isCategorySelected("Upcoming")
              ? "opacity-100 border-b-[6px] border-[#01798E] py-5"
              : "opacity-80"
          }`}
          onClick={() => setSelectedCategory("Upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`w-36 ${
            isCategorySelected("New Release")
              ? "opacity-100 border-b-[6px] border-[#01798E] py-5"
              : "opacity-80"
          }`}
          onClick={() => setSelectedCategory("New Release")}
        >
          New Release
        </button>
        <button
          className={`w-40 ${
            isCategorySelected("Blast from Past")
              ? "opacity-100 border-b-[6px] border-[#01798E] py-5 "
              : "opacity-80"
          }`}
          onClick={() => setSelectedCategory("Blast from Past")}
        >
          Blast from Past
        </button>
        <div className="h-1 w-full rounded-xl bg-gray opacity-25 absolute bottom-0 " />
      </div>
      <div className=" flex items-center justify-center gap-5 mt-10 w-full relative ">
        <div className=" flex   justify-center">
          <ChevronLeft
            className="h-16 w-16 opacity-50 cursor-pointer "
            onClick={showPreviousCards}
          />
        </div>
        <div className="overflow-x-auto gap-5  flex ">
          {visibleMovies.map((movie, index) => (
            <motion.div key={index} variants={slideIn("left","spring" , 0.5, 0.7)}>
              <Card name={movie} />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center">
          <ChevronRight
            className="h-16 w-16 opacity-50 cursor-pointer "
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
