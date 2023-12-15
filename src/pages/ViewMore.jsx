import Navbar from "../components/Navbar";
import {
    movie3,
    movie4,
    movie5,
    movie6,
    movie7,
    movie8,
    movie9,
    movie10,
  } from "../assets";

const ViewMore = ({ name }) => {
  return (
    <div className="flex h-full w-full ">
      <Navbar />
      <div className="flex flex-col items-center my-20">
        <h1 className="text-40 mb-20">K-series</h1>
        <div className="flex flex-wrap justify-center gap-8 w-[60%] ">
          <img src={movie3} />
          <img src={movie4} />
          <img src={movie5} />
          <img src={movie6} />
          <img src={movie7} />
          <img src={movie8} />
          <img src={movie9} />
          <img src={movie10} />
        </div>
      </div>
    </div>
  );
};

export default ViewMore;
