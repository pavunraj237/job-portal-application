import React from "react";

function AdminDashboard() {
  const stats = {
    totalUsers: 250,
    totalRecruiters: 45,
    totalJobs: 120,
    totalApplications: 680,
  };

  return (
    <div className="admin-dashboard">

      <h1>Admin Dashboard</h1>

      <p>Welcome to the Job Portal Admin Panel.</p>

      <div className="dashboard-stats">

        <div className="stat-card">
          <h2>{stats.totalUsers}</h2>
          <p>Total Users</p>
        </div>

        <div className="stat-card">
          <h2>{stats.totalRecruiters}</h2>
          <p>Total Recruiters</p>
        </div>

        <div className="stat-card">
          <h2>{stats.totalJobs}</h2>
          <p>Total Jobs</p>
        </div>

        <div className="stat-card">
          <h2>{stats.totalApplications}</h2>
          <p>Total Applications</p>
        </div>

      </div>

      <div className="admin-actions">

        <button>Manage Users</button>

        <button>Manage Recruiters</button>

        <button>Manage Jobs</button>

        <button>View Applications</button>

      </div>

    </div>
  );
}

export default AdminDashboard;