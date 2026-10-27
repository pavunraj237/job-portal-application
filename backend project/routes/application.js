const express = require("express");
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  updateApplicationStatus,
  getRecruiterApplicants,
} = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/apply", authMiddleware, applyForJob);
router.get("/my", authMiddleware, getMyApplications);
// Get logged-in user's applications
router.get("/my-applications", authMiddleware, getMyApplications);
router.get(
  "/recruiter-applicants",
  authMiddleware,
  getRecruiterApplicants
);
// Update application status
router.put(
  "/:applicationId/status",
  authMiddleware,
  updateApplicationStatus
);
// Get applicants for recruiter's jobs
module.exports = router;