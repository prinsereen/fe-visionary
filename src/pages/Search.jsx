import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Loader2, Search } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadedImages(0);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/popular/1`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.results);
        setPopular(response.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [token]);

  const handleImageLoad = () => {
    setLoadedImages((prevLoadedImages) => prevLoadedImages + 1);
  };

  const handleInputChange = async (e) => {
    try {
      setLoading(true);

      const query = e.target.value;
      const response = await axios.get(
        `http://localhost:5000/search/${query}/1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.results);
      setData(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter((data) => data.poster_path !== null);
  // const mediaType = data.

  return (
    <div className="w-full h-full flex just ">
      <Navbar />
      {loading && loadedImages < filteredData.length && (
        <div className="absolute bg-black bg-opacity-50 h-full w-full flex items-center justify-center">
          <Loader2 className="animate-spin " />
        </div>
      )}
      <div className=" w-full h-full p-12 pl-24  gap-16 flex flex-col items-center">
        <div className="flex w-full  justify-center relative">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleInputChange(e);
            }}
            className="rounded-[50px] bg-[#252833] cursor-text  text-white text-[20px] placeholder-[#939FB1] py-3 px-10 pl-20 w-[50%]"
            placeholder="Cari Movie, Series, atau lainnya"
          />
          <Search className="absolute top-[30%] text-primary left-[28%] cursor-pointer" />
        </div>

        <div className="grid grid-cols-4 desktop:grid-cols-5 gap-4 px-10 ">
          {data &&
            filteredData.map((movie, index) => (
              <div key={index}>
                <img
                  src={IMAGE_BASE_URL + movie.poster_path}
                  className="hover:border-2 cursor-pointer"
                  loading="lazy"
                  onLoad={handleImageLoad}
                  onClick={() =>
                    navigate(
                      `/${
                        movie.media_type === "movie" ? "movie" : "series"
                      }/trailer/${movie.id}`
                    )
                  }
                />
              </div>
            ))}
          {search === "" && popular.map((movie, index) => (
            <div key={index}>
              <img
                src={IMAGE_BASE_URL + movie.poster_path}
                className="hover:border-2 cursor-pointer"
                loading="lazy"
                onLoad={handleImageLoad}
                onClick={() =>
                  navigate(
                    `/${
                      movie.media_type === "movie" ? "movie" : "series"
                    }/trailer/${movie.id}`
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
