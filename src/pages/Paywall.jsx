import { useState } from "react";

const Paywall = () => {
  const [Yearly, setYearly] = useState(false);

  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-3 p-20">
      <h1 className="text-32 font-bold mb-10">
        Subscribe Sekarang dan Mulai Nonton
      </h1>

      <div className="flex items-center justify-between bg-zinc-700 font-semibold  py-2 px-14 rounded-2xl w-[20%]">
        <h1 className={`${Yearly === false && "text-primary"} cursor-pointer`} onClick={() => setYearly(false)}>Monthly</h1>
        <h1 className={`${Yearly === true && "text-primary"} cursor-pointer`} onClick={() => setYearly(true)}>Yearly</h1>
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

      <button className="bg-primary w-[20%] rounded-lg py-2 font-semibold">
        Basic Plan
      </button>
    </div>
  );
};

export default Paywall;
