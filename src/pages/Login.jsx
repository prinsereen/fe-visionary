import hero_register from "../assets/hero_register.png";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex bg-[#0F1014] h-full w-full">
      <div className=" w-[50%] flex justify-center items-center flex-col">
        <h1 className="text-[#316A8E] text-[49px] font-bold">Masuk</h1>
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
          <button
            type="submit"
            value="submit"
            className="bg-[#316A8E] mt-10 rounded-[8px] h-[50px]"
          >
            Masuk
          </button>
          <div className="flex justify-start items-start mt-2 mb-8">
            <div className="text-white text ">
              Anda belum memiliki akun?{" "}
              <Link to="/register" className="text-[#316A8E] font-bold">
                Daftar Sekarang
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center w-full mb-[40px]">
            <hr className="bg-white text-white w-full" />
            <p className="text-white mx-3">Or</p>
            <hr className="bg-white text-white w-full" />
          </div>
          <div className="flex items-center justify-between text-black">
            <button className="bg-white py-2 px-4 rounded w-[120px]">
              <img
                src="src/assets/logo/google-logo.png"
                alt=""
                className="mx-auto"
              />
            </button>
            <button className="bg-white py-2 px-4 rounded w-[120px]">
              <img
                src="src/assets/logo/facebook-logo.png"
                alt=""
                className="mx-auto"
              />
            </button>
            <button className="bg-white py-2 px-4 rounded w-[120px]">
              <img
                src="src/assets/logo/apple-logo.png"
                alt=""
                className="mx-auto"
              />
            </button>
          </div>
        </form>
      </div>
      <img src={hero_register} className="w-1/2 h-screen object-cover" />
    </div>
  );
};

export default Register;
