import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/jobs/${id}`
        );

        const data = await response.json();

        if (response.ok) {
          setJob(data);
        } else {
          setJob(null);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

const handleApply = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to apply");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/applications/apply",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          job: id,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Application submitted successfully!");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Apply Error:", error);
    alert("Cannot connect to server");
  }
};

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (!job) {
    return (
      <div>
        <h2>Job Not Found</h2>
        <Link to="/jobs">Back to Jobs</Link>
      </div>
    );
  }

  return (
    <div className="job-details">
      <Link to="/jobs">← Back to Jobs</Link>

      <h1>{job.title}</h1>

      <h3>{job.company}</h3>

      <p>
        <strong>Location:</strong> {job.location}
      </p>

      <p>
        <strong>Salary:</strong>{" "}
        {job.salary || "Not specified"}
      </p>

      <p>
        <strong>Category:</strong>{" "}
        {job.category || "Not specified"}
      </p>

      <hr />

      <h2>Job Description</h2>

      <p>{job.description}</p>

      <h2>Required Skills</h2>

      {job.skills && job.skills.length > 0 ? (
        <ul>
          {job.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      ) : (
        <p>Not specified</p>
      )}
    <button onClick={handleApply}>
  Apply Now
</button>
     </div>
  );
}

export default JobDetails;