/* eslint-disable react/prop-types */
import axios from "axios";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { limitWords } from "../utils/limitWords";

const EpisodeDetail = ({ id, season, episode }) => {
  const [data, setData] = useState(null);
  const token = useSelector((state) => state.token);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate();
  const specials = season === 0;

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/episode/${id}/${season}/${episode}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (isMounted) {
          setData(response.data);
        }

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();

    // Cleanup function to handle component unmounting
    return () => {
      isMounted = false;
    };
  }, [id, season, token, episode]);

  if (!data) {
    return null;
  }

  const formattedDate = new Date(data.air_date).toLocaleDateString("en-GB", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleOnClick = () => {
    // Reload the page
    // Scroll to the top of the page
    navigate(`/series/play/${id}`);
    window.scrollTo(0, 0);
  };

  const overview = limitWords(data.overview, 48);

  return (
    <div className="cursor-pointer" onClick={handleOnClick}>
      {data.still_path && (
        <div className="flex gap-5">
          <img
            src={IMAGE_BASE_URL + data.still_path}
            alt={`${specials ? "Special" : `S${season}`} E${episode}`}
            className="w-[20%]  rounded-md text-center "
          />
          <div className="flex flex-col justify-center cursor-pointer">
            <div className="flex font-semibold">
              <h1>{`${specials ? "Special" : `S${season}`} E${episode}`}</h1>
              <Dot />
              <h1>{formattedDate}</h1>
              <Dot />
              <h1>{data.runtime ? `${data.runtime}m` : "N/A"}</h1>
            </div>
            <h1 className="text-[#9E9EA0] w-[35%]">{overview}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodeDetail;
