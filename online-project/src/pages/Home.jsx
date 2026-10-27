import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";

function Home() {
  const [jobs, setJobs] = useState([]);

  // Get jobs from MongoDB through backend
  useEffect(() => {
    fetch("http://localhost:5000/api/jobs/all")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

 const handleSearch = async (searchText) => {
  try {
    if (!searchText.trim()) {
      const response = await fetch(
        "http://localhost:5000/api/jobs/all"
      );

      const data = await response.json();
      setJobs(data);
      return;
    }

    const response = await fetch(
      `http://localhost:5000/api/jobs/search?q=${encodeURIComponent(searchText)}`
    );

    const data = await response.json();

    console.log("Search results:", data);

    setJobs(data);
  } catch (error) {
    console.error("Search error:", error);
  }
};

  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <h1>Find Your Dream Job</h1>

        <p>
          Search thousands of jobs and find the right opportunity for you.
        </p>

        <SearchBar onSearch={handleSearch} />
      </section>

      {/* Jobs Section */}
      <section className="featured-jobs">
        <h2>Featured Jobs</h2>

        <div className="job-list">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>

        <Link to="/jobs" className="view-jobs">
          View All Jobs
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 JobPortal. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default Home;

