import React from "react";
import { Link } from "react-router-dom";

function RecruiterDashboard() {
  const stats = {
    totalJobs: 12,
    activeJobs: 8,
    applications: 45,
    shortlisted: 10,
  };

  return (
    <div className="recruiter-dashboard">

      <h1>Recruiter Dashboard</h1>

      <p>Welcome to your recruiter dashboard.</p>

      {/* Statistics */}
      <div className="dashboard-stats">

        <div className="stat-card">
          <h2>{stats.totalJobs}</h2>
          <p>Total Jobs</p>
        </div>

        <div className="stat-card">
          <h2>{stats.activeJobs}</h2>
          <p>Active Jobs</p>
        </div>

        <div className="stat-card">
          <h2>{stats.applications}</h2>
          <p>Applications</p>
        </div>

        <div className="stat-card">
          <h2>{stats.shortlisted}</h2>
          <p>Shortlisted</p>
        </div>

      </div>

      {/* Actions */}
      <div className="recruiter-actions">

        <Link to="/post-job">
          <button>Post New Job</button>
        </Link>

        <Link to="/manage-jobs">
          <button>Manage Jobs</button>
        </Link>

        <Link to="/applicants">
          <button>View Applicants</button>
        </Link>

      </div>

    </div>
  );
}

export default RecruiterDashboard;