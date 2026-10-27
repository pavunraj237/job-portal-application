import React, { useEffect, useState } from "react";

function Applicants() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/applications/recruiter-applicants",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to fetch applicants");
        return;
      }

      setApplicants(data.applications || []);
    } catch (error) {
      console.error("Fetch Applicants Error:", error);
      alert("Something went wrong while fetching applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const updateStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/applications/${applicationId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update status");
        return;
      }

      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant._id === applicationId
            ? { ...applicant, status: status }
            : applicant
        )
      );

      alert(`Application ${status}`);
    } catch (error) {
      console.error("Update Status Error:", error);
      alert("Something went wrong while updating status");
    }
  };

  if (loading) {
    return <h2>Loading applicants...</h2>;
  }

  return (
    <div className="applicants">
      <h1>Job Applicants</h1>

      {applicants.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        applicants.map((application) => (
          <div className="applicant-card" key={application._id}>
            <h2>{application.applicant?.name}</h2>

            <p>
              <strong>Email:</strong> {application.applicant?.email}
            </p>

            <p>
              <strong>Applied For:</strong>{" "}
              {application.job?.title}
            </p>

            <p>
              <strong>Company:</strong>{" "}
              {application.job?.company}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {application.job?.location}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {application.status}
            </p>

            <button
              onClick={() =>
                updateStatus(application._id, "Accepted")
              }
            >
              Accept
            </button>

            <button
              onClick={() =>
                updateStatus(application._id, "Rejected")
              }
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Applicants;