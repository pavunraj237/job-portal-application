import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = () => {
    if (newPassword === "" || confirmPassword === "") {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password Reset Successfully");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm new Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={handleReset}>
          Save Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;