import Navbar from "../../components/Navbar";
import ScrollableCard from "../../components/ScrollableCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import SeriesHeader from "./SeriesHeader";

const Series = () => {
  const [firstDataId, setFirstDataId] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [data, setData] = useState(null);

  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/trending/movie`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.results) {
          const filterData = response.data.results.filter(
            (movie) => movie.poster_path !== null
          );
          const filterBackdrop = filterData.filter(
            (movie) => movie.backdrop_path !== null
          );
          setFirstDataId(filterBackdrop[2].id);
          // console.log(filterBackdrop[0])
          setData(filterData);
        }
        // console.log(response.data.results)
        // setFirstDataId(response.data.results[0].id);
      } catch (error) {
        console.log(error);
      } finally {
        // Set loading to false after a delay of 2000 milliseconds (2 seconds)
        setTimeout(() => {
          setLoading(false);
        }, 2300);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [token]);

  if (!data) {
    return null;
  }

  const movies = data.slice(1, data.length);

  

  return (
    <div className="w-full h-full flex overflow-x-hidden scrollbar-hide transition-all ease-in ">
      <Navbar />
      {loading && (
        <div className="absolute z-20 h-full w-full flex items-center justify-center">
          <Loader2 className="animate-spin " />
        </div>
      )}
      <div className={`w-[100vw] text-white p-16 pr-0 pl-32 gap-5 flex flex-col ${loading ? "opacity-10" : ""}`}>
        <SeriesHeader id={firstDataId} />
        <div>
          <h1 className="text-[32px] font-bold">Rekomendasi Series</h1>
          {firstDataId && <ScrollableCard movies={movies} name="series" />}
        </div>
      </div>
    </div>
  );
};

export default Series;
