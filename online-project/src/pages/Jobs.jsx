import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchJobs = async (searchText = "") => {
    try {
      let url;

      if (searchText.trim() === "") {
        url = "http://localhost:5000/api/jobs/all";
      } else {
        url = `http://localhost:5000/api/jobs/search?q=${encodeURIComponent(
          searchText
        )}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        console.error("Job API Error:", data);
        setJobs([]);
        return;
      }

      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div>
      <h1>Job Search</h1>

      <SearchBar onSearch={setSearch} />

      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))
      )}
    </div>
  );
}

export default Jobs;