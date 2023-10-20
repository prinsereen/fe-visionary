import { kseries1, kseries2, kseries3, movie1, movie2 } from "../assets";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="w-full h-full flex bg-black overflow-x-hidden  ">
      <Navbar />
      <div className="bg-black w-[100vw] text-white p-12 pl-40 gap-2 flex flex-col">
        <h1 className="text-[36px] font-bold">Beranda</h1>
        <div className="flex gap-10  ">
          <img src={movie1} />
          <img src={movie2} />

        </div>
        <h1 className="text-[32px] font-bold">K-Series</h1>
        <div className="flex gap-10  ">
          <img src={kseries1} />
          <img src={kseries2} />
          <img src={kseries3} />
        </div>
      </div>
    </div>
  );
};

export default Home;
