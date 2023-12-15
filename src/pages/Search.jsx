import Navbar from "../components/Navbar";
import {
  search,
  movie3,
  movie4,
  movie5,
  movie6,
  movie7,
  movie8,
  movie9,
  movie10,
} from "../assets";

const Search = () => {
  return (
    <div className="w-full h-full flex just ">
      <Navbar />
      <div className=" w-full h-full text-white p-12 pl-24  gap-16 flex flex-col items-center">
        <div className="flex relative ">
          <input
            className="rounded-[50px] bg-[#D9D9D9]  text-black text-[20px] placeholder-[#939FB1] py-3 px-10 pl-24 w-[700px]"
            placeholder="Cari Film, Series, atau lainnya"
          />
          <img
            src={search}
            className="absolute left-5 mt-2 cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-4 desktop:grid-cols-5 gap-8 w-[80%] ">
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

export default Search;
