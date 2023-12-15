import { Plus } from "lucide-react";
import { account1, account2 } from "../../assets";


const EditProfile = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh]">
      <h1 className="font-bold text-40 mb-20">Pilih Profile</h1>
      <div className="flex gap-10 mb-14">
          <div className="flex flex-col items-center justify-start">
            <img src={account1} alt="" className=" mb-4" />
            <p>Audeyy</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <img src={account2} alt="" className=" mb-4" />
            <p className="text-primary">Ernnnn</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <button className="bg-zinc-700 rounded-full h-[92px] w-[92px] flex justify-center items-center mb-4">
              <Plus />
            </button>
            <p className="font-semibold">Tambah</p>
          </div>
        </div>
    </div>
  );
};

export default EditProfile;
