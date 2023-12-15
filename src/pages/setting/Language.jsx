import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

const Language = () => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <div className="w-full p-20 mt-20 flex flex-col gap-2">
      <h1 className="text-24 font-bold mb-20">Pengaturan Website</h1>
      <div className="flex items-center justify-between w-[60%]">
        <h1 className="text-20">Bahasa</h1>
        <div
          className="flex text-20 cursor-pointer gap-1"
          onClick={() => setDropDown(!dropDown)}
        >
          <h1>Indonesia</h1>
          <ChevronDown
            className={`cursor-pointer ${
              dropDown === true ? "transition rotate-180" : ""
            }`}
          />
        </div>
      </div>
      {dropDown && (
        <div className="flex flex-col bg-black h-[50%] w-[60%] p-5 rounded-lg">
          <div className="flex bg-black h-full w-full gap-2">
            <Check className="text-primary" />
            <h1 className="text-20 font-bold">Indonesia</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Language;
