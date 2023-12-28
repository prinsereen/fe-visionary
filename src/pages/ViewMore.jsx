import Navbar from "../components/Navbar";

const ViewMore = ({ name }) => {
  return (
    <div className="flex h-full w-full ">
      <Navbar />
      <div className="flex flex-col items-center my-20">
        <h1 className="text-40 mb-20">K-series</h1>
        <div className="flex flex-wrap justify-center gap-8 w-[60%] "></div>
      </div>
    </div>
  );
};

export default ViewMore;
