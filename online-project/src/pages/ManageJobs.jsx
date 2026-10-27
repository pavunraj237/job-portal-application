import React, { useState } from "react";
import { Link } from "react-router-dom";

function ManageJobs() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      location: "Chennai",
      salary: "₹4 - ₹6 LPA",
      type: "Full Time",
      status: "Active",
    },
    {
      id: 2,
      title: "Java Developer",
      location: "Bangalore",
      salary: "₹5 - ₹8 LPA",
      type: "Full Time",
      status: "Active",
    },
    {
      id: 3,
      title: "MERN Stack Developer",
      location: "Chennai",
      salary: "₹6 - ₹10 LPA",
      type: "Remote",
      status: "Closed",
    },
  ]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (confirmDelete) {
      setJobs(jobs.filter((job) => job.id !== id));
    }
  };

  return (
    <div className="manage-jobs">

      <h1>Manage Jobs</h1>

      <Link to="/post-job">
        <button>+ Post New Job</button>
      </Link>

      <div className="jobs-container">

        {jobs.map((job) => (
          <div className="job-card" key={job.id}>

            <h2>{job.title}</h2>

            <p>
              <strong>Location:</strong> {job.location}
            </p>

            <p>
              <strong>Salary:</strong> {job.salary}
            </p>

            <p>
              <strong>Type:</strong> {job.type}
            </p>

            <p>
              <strong>Status:</strong> {job.status}
            </p>

            <button
              onClick={() => handleDelete(job.id)}
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ManageJobs;