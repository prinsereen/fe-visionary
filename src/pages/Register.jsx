import { Link } from "react-router-dom";
import hero_register from "../assets/hero_register.png";

const Register = () => {
  return (
    <div className="flex bg-[#0F1014] h-full w-full">
      <div className=" w-[50%] flex justify-center items-center flex-col">
        <h1 className="text-[#316A8E] text-[49px] font-bold">Daftar</h1>
        <p className="text-white mb-14">
          Masukkan data yang sesuai yang telah anda daftarkan{" "}
        </p>
        <form className="text-black flex flex-col w-[50%] gap-3 ">
          <label>Username</label>
          <input
            type="text"
            className="h-[50px] rounded-[8px] p-2"
            placeholder="Masukkan username anda"
          />
          <label>Password</label>
          <input
            type="text"
            className="h-[50px] rounded-[8px] p-2"
            placeholder="Masukkan password anda"
          />
          <label>Konfirmasi Password</label>
          <input
            type="text"
            className="h-[50px] rounded-[8px] p-2"
            placeholder="Masukkan konfirmasi password anda"
          />
          <button
            type="submit"
            value="submit"
            className="bg-[#316A8E] mt-10 rounded-[8px] h-[50px]"
          >
            Daftar
          </button>
        </form>
        <div className="flex justify-start items-start mt-2 w-[50%]">
          <div className="text-white text ">
            Anda sudah memiliki akun?{" "}
            <Link to="/" className="text-[#316A8E]">
              Masuk
            </Link>
          </div>
        </div>
      </div>
      <img src={hero_register} className="w-1/2 h-screen object-cover" />
    </div>
  );
};

export default Register;
