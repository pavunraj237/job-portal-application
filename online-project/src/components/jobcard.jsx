import React from "react";
import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>

      <p>Company: {job.company}</p>

      <p>Location: {job.location}</p>

      <p>Salary: {job.salary || "Not specified"}</p>

      <Link to={`/jobs/${job._id}`}>
        View Details
      </Link>
    </div>
  );
}

export default JobCard;

