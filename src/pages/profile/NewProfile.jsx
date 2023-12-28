import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { Check, ChevronDown, Loader2, Pencil, Plus, X } from "lucide-react";

import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useSelector } from "react-redux";

const NewProfile = () => {
  const [nameAnimation, setNameAnimation] = useState(false);
  const [age, setAge] = useState("G");
  const [name, setName] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onDropAccepted = useCallback((acceptedFiles) => {
    // Display the preview of the first accepted file
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // eslint-disable-next-line no-unused-vars
  const { getRootProps, getInputProps } = useDropzone({
    acceptedFiles: ".jpg, .jpeg, .png",
    multiple: false,
    onDropAccepted,
  });

  const handleProfileSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profile_name", name);
      formData.append("contentRating", age);
      formData.append("profileImage", image);

      const response = await axios.post(
        "http://localhost:5000/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    <div className="h-full w-full flex flex-col items-center  py-20 px-10 gap-3">
      <div className="flex w-full justify-end">
        <Link to="/editProfile" className="text-primary text-20">
          cancel
        </Link>
      </div>
      <h1 className="text-[30px] font-bold">Create Profile</h1>

      <Dropzone
        acceptedFiles=".jpg,.jpeg,.png"
        multiple={false}
        onDrop={onDropAccepted}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              {...getRootProps()}
              className="relative h-20 w-20 bg-zinc-700 rounded-full flex items-center justify-center cursor-pointer"
            >
              <input {...getInputProps()} />
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <div>
                  <Plus />
                </div>
              )}
              <div className="flex items-center justify-center h-7 w-7 bg-primary rounded-full absolute right-0 bottom-0">
                <Pencil className="h-4 w-4" />
              </div>
            </div>
          </section>
        )}
      </Dropzone>

      <div className="relative flex items-start w-[20%]">
        <h1
          onClick={() => setNameAnimation(true)}
          className={` ${
            nameAnimation
              ? " text-[14px] top-2 left-5 px-1"
              : "top-[45%] left-4"
          } transition-all ease-in  absolute font-bold text-[#8F98B2] bg-[#0F1014] `}
        >
          Profile Name
        </h1>
        <input
          className="bg-transparent border border-[#8F98B2] mt-5 px-3 py-3 rounded-lg w-[120%]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setNameAnimation(true)}
          onBlur={(e) => {
            if (!e.target.value) {
              setNameAnimation(false);
            }
          }}
        />
        {name && (
          <X
            className="absolute top-[45%] right-3 cursor-pointer text-[#8F98B2] trnsition ease-in"
            onClick={() => {
              setName("");
              setNameAnimation(false);
            }}
          />
        )}
      </div>
      <div className="flex flex-col relative items-start gap-1 w-[20%] mt-5">
        <h1 className="text-16">Select Content Rating</h1>
        <h1 className="text-14 text-[#707A94]">
          You will see content rated up to
        </h1>
        <div className="absolute right-0 flex font-semibold text-18 items-center gap-1">
          {age}
          <ChevronDown
            className={`${
              dropDown ? "rotate-180 transition-all ease-in" : " "
            }`}
            onClick={() => setDropDown(!dropDown)}
          />
        </div>
        {dropDown && (
          <div
            className="flex flex-col absolute bg-[#101216] w-full top-[100%] overflow-y-auto"
            onClick={() => setDropDown(!dropDown)}
          >
            <button
              className=" flex text-left gap-4 px-5 py-3 items-center"
              onClick={() => setAge("G")}
            >
              <div
                className={`h-5 w-5  rounded-full flex items-center justify-center mb-3 ${
                  age === "G" ? "bg-primary" : "bg-[#16181F]"
                } `}
              >
                {age === "G" && <Check className="h-3 w-3" />}
              </div>
              <div>
                <h1 className="text-16 mb-2 font-semibold ">G</h1>
                <h1 className="text-14 text-[#707A94]">
                  Suitable for all ages.
                </h1>
              </div>
            </button>
            <button
              className=" flex text-left gap-5 px-5 py-3 items-center"
              onClick={() => setAge("PG")}
            >
              <div
                className={`h-5 w-5 p-1  rounded-full flex items-center justify-center mb-3  ${
                  age === "PG" ? "bg-primary" : "bg-[#16181F]"
                } `}
              >
                {age === "PG" && <Check className="h-3 w-3 " />}
              </div>
              <div className="">
                <h1 className="text-16  mb-2 font-semibold ">PG</h1>
                <h1 className="text-14 text-[#707A94]">
                  Suitable for all but parents should guide their young.
                </h1>
              </div>
            </button>
            <button
              className=" flex text-left gap-5 px-5 py-3 items-center"
              onClick={() => setAge("PG13")}
            >
              <div
                className={`h-5 w-5 p-1  rounded-full flex items-center justify-center mb-3  ${
                  age === "PG13" ? "bg-primary" : "bg-[#16181F]"
                } `}
              >
                {age === "PG13" && <Check className="h-3 w-3 " />}
              </div>
              <div className="">
                <h1 className="text-16  mb-2 font-semibold ">PG13</h1>
                <h1 className="text-14 text-[#707A94]">
                  Suitable for persons aged 13 and above but parental guidance
                  is advised for children below 13.
                </h1>
              </div>
            </button>
            <button
              className=" flex text-left gap-5 px-5 py-3 items-center"
              onClick={() => setAge("NC16")}
            >
              <div
                className={`h-5 w-5 p-1  rounded-full flex items-center justify-center mb-3  ${
                  age === "NC16" ? "bg-primary" : "bg-[#16181F]"
                } `}
              >
                {age === "NC16" && <Check className="h-3 w-3 " />}
              </div>
              <div className="">
                <h1 className="text-16  mb-2 font-semibold ">NC16</h1>
                <h1 className="text-14 text-[#707A94]">
                  Suitable for persons aged 16 and above.
                </h1>
              </div>
            </button>
            <button
              className=" flex text-left gap-5 px-5 py-3 items-center"
              onClick={() => setAge("M18")}
            >
              <div
                className={`h-5 w-5 p-1  rounded-full flex items-center justify-center mb-3  ${
                  age === "M18" ? "bg-primary" : "bg-[#16181F]"
                } `}
              >
                {age === "M18" && <Check className="h-3 w-3 " />}
              </div>
              <div className="">
                <h1 className="text-16  mb-2 font-semibold ">M18</h1>
                <h1 className="text-14 text-[#707A94]">
                  Suitable for persons aged 18 and above.
                </h1>
              </div>
            </button>
            <button
              className=" flex text-left gap-5 px-5 py-3 items-center"
              onClick={() => setAge("R21")}
            >
              <div
                className={`h-5 w-5 p-1  rounded-full flex items-center justify-center mb-3  ${
                  age === "R21" ? "bg-primary" : "bg-[#16181F]"
                } `}
              >
                {age === "R21" && <Check className="h-3 w-3 " />}
              </div>
              <div className="">
                <h1 className="text-16  mb-2 font-semibold ">R21</h1>
                <h1 className="text-14 text-[#707A94]">
                  Suitable for adults aged 21 and above
                </h1>
              </div>
            </button>
          </div>
        )}
      </div>
      <button
        className="w-[20%] py-4 text-center flex justify-center items-center bg-primary rounded-xl mt-10 font-bold"
        onClick={handleProfileSubmit}
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <h1>Create Your Profile</h1>
        )}
      </button>
    </div>
  );
};

export default NewProfile;
