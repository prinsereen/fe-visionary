import { useRef, useState } from "react";
import { film2, film3, film4, film5, film6 } from "../assets";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CardDetail from "./CardDetail";

const movies = [film2, film3, film4, film5, film6, film3, film4, film5, film6, film6, film3, film4, film5, film6];

const ScrollableCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cardIsHover, setCardIsHover] = useState(null);
  

  const elementRef = useRef();
  const screenWidth = window.innerWidth;

  const slideRight = (element) => {
    element.scrollLeft += screenWidth - 400 ;
  };

  const slideLeft = (element) => {
    element.scrollLeft -= screenWidth - 400 ;
  };

  return (
    <div
      className="relative flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute z-20  bg-gradient-to-r from-black h-full w-10">
          <ChevronLeft
            className="absolute top-1/2 h-8 w-8 cursor-pointer "
            onClick={() => slideLeft(elementRef.current)}
          />
        </div>
      )}
      <div
        className="flex gap-2 overflow-x-auto scrollbar-hide w-full scroll-smooth py-12 pr-10 overflow-y-hidden"
        ref={elementRef}
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            className="relative min-h-[310px] min-w-[244px] hover:z-10 "
          >
            <img
              src={movie}
              className="hover:border-2 border-gray hover:scale-110 transition-all ease-in duration-150  "
              onMouseEnter={() => setCardIsHover(index)}
            />

            {cardIsHover === index && (
              <div className="rounded-lg" onMouseLeave={() => setCardIsHover(null)}>
                <CardDetail movie={movie} index={index} length={movies.length} />
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
        <div className="absolute z-20 right-0 bg-gradient-to-l from-black h-full w-10">
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
