import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import hero_register from "../../assets/hero_register.png";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Validate password requirements
    const isValidPassword = validatePassword(newPassword);
    setIsValid(isValidPassword);
    setPasswordError(
      isValidPassword
        ? ""
        : "Password terdiri dari minimal 5 karakter dan mengandung huruf kapital"
    );
  };

  const validatePassword = (password) => {
    // Password should contain at least one number and be at least 5 characters long
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{5,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add your validation logic here
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      password !== confirmPassword ||
      !validatePassword(password)
    ) {
      setIsValid(false);
      return;
    }

    // If validation passes, you can proceed with your form submission logic
    try {
      const updatedData = {
        email: email,
        password: password,
        conf_password: confirmPassword,
      };
      console.log(updatedData);
      const response = await axios.post(
        "http://localhost:5000/register",
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        navigate(`/`);
      }
    } catch (error) {
      console.error(error);
      // Handle error scenarios
    }
  };

  return (
    <div className="flex bg-[#0F1014] h-full w-full">
      <div className=" w-[50%] flex justify-center items-center flex-col">
        <h1 className="text-[#316A8E] text-[49px] font-bold">Daftar</h1>
        <p className="text-white mb-14">
          Masukkan data yang sesuai yang telah anda daftarkan{" "}
        </p>
        <form
          className="text-black flex flex-col w-[50%] gap-3 "
          onSubmit={handleSubmit}
        >
          <label>Email</label>
          <input
            name="email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`h-[50px] rounded-[8px] p-2 ${
              !isValid && email.trim() === "" ? "border-red-500" : ""
            }`}
            placeholder="Masukkan email anda"
          />
          <label>Password</label>
          <div className="flex items-center bg-white h-[50px] rounded-[8px] relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className={`flex-1 h-[50px] rounded-[8px] p-2 ${
                !isValid &&
                (password.trim() === "" || !validatePassword(password))
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Masukkan password anda"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="bg-white m-2 absolute right-0 "
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>

          <label>Konfirmasi Password</label>
          <div className="flex items-center bg-white h-[50px] rounded-[8px] relative">
            <input
              type={showConfPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`flex-1 h-[50px] rounded-[8px] p-2 ${
                !isValid && confirmPassword.trim() === ""
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Masukkan konfirmasi password anda"
            />
            <button
              type="button"
              onClick={() => setShowConfPassword(!showConfPassword)}
              className="bg-white m-2 absolute right-0 "
            >
              {showConfPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
          {!isValid && passwordError && (
            <p className="text-red-500">{passwordError}</p>
          )}
          {!isValid && (
            <p className="text-red-500">
              Password tidak sama dengan konfirmasi password.
            </p>
          )}
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
      <img
        src={hero_register}
        className="w-1/2 h-screen object-cover"
        alt="Hero Register"
      />
    </div>
  );
};

export default Register;
