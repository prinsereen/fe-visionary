import { Plus, PlayCircle, Dot } from "lucide-react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CardDetail = ({ movie, index, length }) => {
  return (
    <div
      className={`w-full h-full flex flex-col justify-center bg-black scale-x-125 scale-y-150 shadow-lg absolute top-0  rounded-xl ${
        (index === 0) && "left-[35px]"
      } ${(index === length - 1 ) && "right-[30px]"} `}
    >
      <div className="relative h-[50%]">
        <img src={movie} className="h-full object-cover object-top w-full" />
        <div className="absolute bottom-0 bg-gradient-to-t from-black h-[30%] w-full"></div>
      </div>
      <div className="flex gap-1 px-1">
        <Link
          to="/videoPlayed"
          className="flex items-center  gap-1 justify-center bg-[#01798E] w-52 h-8 px-5 text-white rounded-lg hover:opacity-80  "
        >
          <PlayCircle className="h-4 w-4 " />
          <button className="font-semibold text-14">Tonton</button>
        </Link>

        <div className="bg-[#01798E] rounded-lg w-8 h-8 flex px-2 items-center justify-center cursor-pointer hover:opacity-80 ">
          <Plus className="h-5 w-5" />
        </div>
      </div>
      <div className="flex w-full items-center px-2 mb-1">
        <h1 className="text-10 font-semibold ">2023</h1>
        <Dot />
        <h1 className="text-10 w-10 font-semibold ">2h 43m</h1>
        <Dot />
        <h1 className="text-10 font-semibold ">English</h1>
        <Dot />
        <h1 className="text-10 font-semibold ">13+</h1>
        <Dot />
        <h1 className="text-10 font-semibold ">Action </h1>
      </div>
      <h1 className="px-1 text-10 text-slate-400 ">
        Lorem ipsum dolor sit amet consectetur. Sit nibh ornare ultrices egestas
        aenean. Elementum sed tincidunt rhoncus fermentum.
      </h1>
    </div>
  );
};

export default CardDetail;
