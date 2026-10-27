import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    if (otp === "") {
      alert("Please enter OTP");
    } else {
      alert("OTP Verified Successfully");
      navigate("/reset-password");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>OTP Verification</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={handleVerify}>Verify OTP</button>
      </div>
    </div>
  );
}

export default OtpVerification;