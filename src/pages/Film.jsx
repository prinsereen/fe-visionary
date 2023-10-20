import Navbar from "../components/Navbar";
import {
  film1,
  film2,
  film3,
  film4,
  film5,
  film6,
  plus,
  tonton,
} from "../assets";
import { Link } from "react-router-dom";

const Film = () => {
  return (
    <div className="w-full h-full flex bg-black overflow-x-hidden ">
      <Navbar />
      <div className="bg-black w-[100vw] text-white p-16 pl-40 gap-8 flex flex-col">
        <div className="flex gap-20 w-full">
          <img src={film1} alt="" />
          <div className="flex flex-col w-full">
            <h1 className="font-bold text-[64px] mb-[30px]">Recalled</h1>
            <p className="w-[64%] mb-[20px] font-bold text-[20px]">
              Lorem ipsum dolor sit amet consectetur. Sit nibh ornare ultrices
              egestas aenean. Elementum sed tincidunt rhoncus fermentum.
              Tincidunt non aliquam ultrices sapien maecenas feugiat aliquam.{" "}
            </p>
            <div className="flex gap-7">
              <Link to="/videoPlayed">
                <button className="bg-[#01798E] text-white rounded-[5px] w-[225px] h-16 text-[24px] font-bold pl-7">
                  Tonton
                </button>
                <img
                  src={tonton}
                  className="absolute -translate-y-11 translate-x-9"
                />
              </Link>

              <div className="bg-[#01798E] rounded-[15px] w-16 h-16 flex items-center justify-center cursor-pointer">
                <img src={plus} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-[32px] font-bold">Rekomendasi Film</h1>
          <div className="flex gap-10  ">
            <img src={film2} />
            <img src={film3} />
            <img src={film4} />
            <img src={film5} />
            <img src={film6} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Film;
