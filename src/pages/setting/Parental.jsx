import  { useState } from "react";

const Parental = () => {
  const [digit1, setDigit1] = useState("");
  const [digit2, setDigit2] = useState("");
  const [digit3, setDigit3] = useState("");
  const [digit4, setDigit4] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [parentalPin, setParentalPin] = useState(""); // Set your actual PIN

  const handleDigitChange = (e, digitSetter) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      digitSetter(value);
    }
  };

  const handleSubmit = () => {
    const enteredPin = digit1 + digit2 + digit3 + digit4;

    if (enteredPin === parentalPin) {
      // Unlock functionality, e.g., navigate to a protected section
      console.log("Parental lock unlocked!");
    } else {
      // Display an error message or take appropriate action
      console.log("Invalid PIN. Please try again.");
    }

    // Optionally, you can clear the input fields after submission
    setDigit1("");
    setDigit2("");
    setDigit3("");
    setDigit4("");
  };

  return (
    <div className="h-full w-full p-20">
      <h1 className="text-32 font-bold mb-20">Kontrol Orang Tua</h1>
      <button className="text-24 font-bold mb-5" onClick={handleSubmit}>
        PIN Kendali Orang Tua
      </button>
      <div className="flex flex-col gap-5">
        <form className="flex gap-5 text-16">
          <input
            type="number"
            name="number"
            value={digit1}
            onChange={(e) => handleDigitChange(e, setDigit1)}
            className="h-20 w-20 text-center bg-white text-black"
          />
          <input
            type="number"
            name="number"
            value={digit2}
            onChange={(e) => handleDigitChange(e, setDigit2)}
            className="h-20 w-20 text-center bg-white text-black"
          />
          <input
            type="number"
            name="number"
            value={digit3}
            onChange={(e) => handleDigitChange(e, setDigit3)}
            className="h-20 w-20 text-center bg-white text-black"
          />
          <input
            type="number"
            name="number"
            value={digit4}
            onChange={(e) => handleDigitChange(e, setDigit4)}
            className="h-20 w-20 text-center bg-white text-black"
          />
          {/* Repeat similar inputs for digit2, digit3, and digit4 */}
        </form>
      </div>
    </div>
  );
};

export default Parental;
