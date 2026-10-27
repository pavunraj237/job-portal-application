import React, { useEffect, useState } from "react";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please login to view your applications");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/applications/my-applications",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setApplications(data.applications);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Fetch Applications Error:", error);
        alert("Cannot connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <p>Loading applications...</p>;
  }

  return (
    <div className="applications">
      <h1>My Applications</h1>

      {applications.length === 0 ? (
        <p>You have not applied for any jobs yet.</p>
      ) : (
        applications.map((application) => (
          <div
            className="application-card"
            key={application._id}
          >
            <h2>{application.job?.title}</h2>

            <p>
              <strong>Company:</strong>{" "}
              {application.job?.company}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {application.job?.location}
            </p>

            <p>
              <strong>Applied Date:</strong>{" "}
              {new Date(application.createdAt).toLocaleDateString()}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {application.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Applications;