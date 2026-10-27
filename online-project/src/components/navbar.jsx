import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>JobPortal</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>

        <Link to="/applications">Application Dashboard</Link>
        <Link to="/recruiter-dashboard">Recruiter Dashboard</Link>
      </div>
    </nav>
  );
}

export default Navbar;