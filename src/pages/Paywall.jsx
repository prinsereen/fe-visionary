import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Paywall = () => {
  const [Yearly, setYearly] = useState(false);
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.patch("http://localhost:5000/subscribe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-3 p-20">
      <h1 className="text-32 font-bold mb-10 w-[30%] text-center">
        Subscribe Sekarang dan Mulai Nonton
      </h1>

      <div className="flex items-center justify-between bg-zinc-700 font-semibold  py-2 px-14 rounded-2xl w-[20%]">
        <h1
          className={`${Yearly === false && "text-primary"} cursor-pointer`}
          onClick={() => setYearly(false)}
        >
          Monthly
        </h1>
        <h1
          className={`${Yearly === true && "text-primary"} cursor-pointer`}
          onClick={() => setYearly(true)}
        >
          Yearly
        </h1>
      </div>
      {Yearly ? (
        <div className="flex flex-col bg-black border-2 rounded-lg px-3 py-3 w-[20%]">
          <h1 className="text-yellow-400 font-bold">Basic</h1>
          <div className="flex font-bold">
            <h1>Rp </h1>
            <div className="flex items-center">
              <h1 className="text-32">600.000</h1>
              <h1 className="">/tahun</h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col bg-black border-2 rounded-lg px-3 py-3 w-[20%]">
          <h1 className="text-yellow-400 font-bold">Basic</h1>
          <div className="flex font-bold">
            <h1>Rp </h1>
            <div className="flex items-center">
              <h1 className="text-32">50.000</h1>
              <h1 className="">/bulan</h1>
            </div>
          </div>
        </div>
      )}

      <button
        className="bg-primary w-[20%] rounded-lg py-2 flex items-center justify-center font-semibold"
        onClick={handleSubscribe}
      >
        {loading ? <Loader2 className="animate-spin" /> : <h1>Basic Plan</h1>}
      </button>
    </div>
  );
};

export default Paywall;
