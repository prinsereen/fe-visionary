import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import hero_register from "../../assets/hero_register.png";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email,
        password,
      };
      const response = await axios.post("http://localhost:5000/login", data, {
        headers: { "Content-Type": "application/json" },
      });
      const loggedIn = await response.data;
      console.log(loggedIn);
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.result,
            token: loggedIn.token,
          })
        );
      }
      navigate("/home");
    } catch (error) {
      setLoginError(error.response.data.msg);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#0F1014] h-[100vh] w-full">
      <div className=" w-[50%] flex justify-center items-center flex-col z-20">
        <h1 className="text-[#316A8E] text-[49px] font-bold">Masuk</h1>
        <p className="text-white mb-14">
          Masukkan data yang sesuai yang telah anda daftarkan{" "}
        </p>
        <form
          className="text-white flex flex-col w-[50%] gap-3 "
          onSubmit={handleFormSubmit}
        >
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[50px] rounded-[8px] p-2 text-black"
            placeholder="Masukkan email anda"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-[50px] rounded-[8px] p-2 text-black"
            placeholder="Masukkan password anda"
          />
          <h1 className="text-red-500">{loginError}</h1>
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
      <img
        src={hero_register}
        className="absolute z-0 h-screen w-screen object-cover opacity-20"
      />
    </div>
  );
};

export default Login;
