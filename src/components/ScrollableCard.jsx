/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CardDetail from "./CardDetail";

// eslint-disable-next-line react/prop-types
const ScrollableCard = ({ movies, name }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cardIsHover, setCardIsHover] = useState(null);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  const elementRef = useRef();
  const screenWidth = window.innerWidth;

  const slideRight = (element) => {
    element.scrollLeft += screenWidth - 400;
  };

  const slideLeft = (element) => {
    element.scrollLeft -= screenWidth - 400;
  };

  const filteredMovies = movies && movies.filter((movie) => movie.poster_path !== null);

  return (
    <div
      className="relative flex "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute z-20  bg-gradient-to-r from-black bottom-[10%] h-[80%]  w-10">
          <ChevronLeft
            className="absolute top-1/2 h-8 w-8 cursor-pointer "
            onClick={() => slideLeft(elementRef.current)}
          />
        </div>
      )}
      <div
        className="flex gap-3 overflow-x-auto scrollbar-hide w-full scroll-smooth py-12 pr-10 overflow-y-hidden"
        ref={elementRef}
      >
        {filteredMovies && filteredMovies.map((movie, index) => (
          <div
            key={index}
            className="relative min-h-[366px] min-w-[244px] hover:z-10 "
          >
            <img
              src={IMAGE_BASE_URL + movie.poster_path}
              className=" border-gray max-h-[366px] "
              onMouseEnter={() => setCardIsHover(index)}
            />

            {cardIsHover === index && (
              <div
                className="rounded-lg "
                onMouseLeave={() => setCardIsHover(null)}
              >
                <CardDetail
                  movie={movie}
                  index={index}
                  length={movies.length}
                  name={name}
                />
              </div>
            )}
          </div>
        ))}
        {/* <img
              src={film2}
              className="hover:border-2 border-gray hover:scale-110 transition-all ease-in duration-150  "
              // onMouseEnter={() => setCardIsHover()}
            /> */}
      </div>
      {isHovered && (
        <div className="absolute z-20 right-0 bg-gradient-to-l  from-black bottom-[10%] h-[80%]  w-10">
          <ChevronRight
            className="absolute top-1/2 h-8 w-8 cursor-pointer "
            onClick={() => slideRight(elementRef.current)}
          />
        </div>
      )}
    </div>
  );
};

export default ScrollableCard;
