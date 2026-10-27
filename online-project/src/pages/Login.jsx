import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
  // Save JWT token
  localStorage.setItem("token", data.token);

  // Save logged-in user information
  localStorage.setItem("user", JSON.stringify(data.user));

  alert("Login Successful");
}
      else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Cannot connect to server");
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="forgot-password">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </p>

          <button type="submit">
            Login
          </button>

          <p>
            Don't have an account?{" "}
            <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;