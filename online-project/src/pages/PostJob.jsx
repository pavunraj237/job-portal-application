import React, { useState } from "react";

function PostJob() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full Time",
    description: "",
    skills: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: job.title,
            company: job.company,
            location: job.location,
            salary: job.salary,
            description: job.description,
            skills: job.skills
              .split(",")
              .map((skill) => skill.trim()),
            category: job.type,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to post job");
        return;
      }

      console.log("Job Created:", data.job);
      alert("Job posted successfully!");

      setJob({
        title: "",
        company: "",
        location: "",
        salary: "",
        type: "Full Time",
        description: "",
        skills: "",
      });
    } catch (error) {
      console.error("Post Job Error:", error);
      alert("Cannot connect to server");
    }
  };

  return (
    <div className="post-job">
      <h1>Post a New Job</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={job.company}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={job.salary}
          onChange={handleChange}
          required
        />

        <select
          name="type"
          value={job.type}
          onChange={handleChange}
        >
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <textarea
          name="description"
          placeholder="Job Description"
          value={job.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="skills"
          placeholder="Required Skills (React, JavaScript, HTML)"
          value={job.skills}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Post Job
        </button>
      </form>
    </div>
  );
}

export default PostJob;