const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  testJob,
  createJob,
  getJobs,
  getJobById,
  searchJobs
} = require("../controllers/jobController");

// Test
router.get("/", testJob);

// Get all jobs
router.get("/all", getJobs);

// Search jobs
router.get("/search", searchJobs);

// Update searchText for existing jobs
router.put("/update-search-text", async (req, res) => {
  try {
    const Job = require("../models/Job");

    const jobs = await Job.find();

    for (const job of jobs) {
      job.searchText = `
        ${job.title || ""}
        ${job.company || ""}
        ${job.location || ""}
        ${job.description || ""}
        ${(job.skills || []).join(" ")}
        ${job.category || ""}
      `;

      await job.save();
    }

    res.status(200).json({
      message: "All job searchText fields updated successfully",
      count: jobs.length,
    });
  } catch (error) {
    console.error("Update SearchText Error:", error);

    res.status(500).json({
      message: "Failed to update searchText",
      error: error.message,
    });
  }
});

// Get single job by ID
router.get("/:id", getJobById);

// Create a new job
router.post("/", authMiddleware, createJob);

module.exports = router;

