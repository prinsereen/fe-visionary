import { Laptop2 } from "lucide-react";

const Device = () => {
  return (
    <div className="flex flex-col w-full p-20 ">
      <div className="flex w-full justify-between mb-20  items-center">
        <h1 className="text-24 font-bold">Anda adalah pengguna gratis</h1>
        <button className="text-24 font-bold px-5 py-2 bg-primary rounded-xl">
          Berlangganan
        </button>
      </div>
      <h1 className="text-24 font-bold mb-10">Perangkat ini</h1>
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2 items-center">
            <Laptop2 className="w-20 h-20 opacity-20" />
            <div className="flex flex-col">
              <h1 className="text-24 font-bold">Web Browser</h1>
              <h2 className="text-[#8E8383] text-20">
                Terakhir digunakan: Hari ini
              </h2>
            </div>
          </div>
          <button className="text-24 font-bold bg-[#2A2626] px-10 py-2 rounded-[25px]">Keluar</button>
        </div>
      </div>
    </div>
  );
};

export default Device;
