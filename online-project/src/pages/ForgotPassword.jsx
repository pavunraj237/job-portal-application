import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (phone === "") {
      alert("Please enter your phone number");
    } else {
      alert("OTP sent successfully");
      navigate("/otp");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Forgot Password</h2>

        <input
          type="tel"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={handleSendOtp}>Send OTP</button>

        <p
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => alert("Try another way clicked")}
        >
          Try another way
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;