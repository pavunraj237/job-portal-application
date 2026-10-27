const Application = require("../models/application");
const Job = require("../models/job");

// Apply for a job
exports.applyForJob = async (req, res) => {
  try {
    const { job } = req.body;

    // Check job ID
    if (!job) {
      return res.status(400).json({
        message: "Job ID is required",
      });
    }

    // Check logged-in user
    if (!req.user) {
      return res.status(401).json({
        message: "Please login to apply",
      });
    }

    // Check whether job exists
    const existingJob = await Job.findById(job);

    if (!existingJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check duplicate application
    const existingApplication = await Application.findOne({
      job: job,
      applicant: req.user.id,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    // Create application
    const application = new Application({
      job: job,
      applicant: req.user.id,
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Apply Job Error:", error);

    res.status(500).json({
      message: "Failed to submit application",
      error: error.message,
    });
  }
};

// Get logged-in user's applications
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    res.status(200).json({
      applications,
    });
  } catch (error) {
    console.error("Get Applications Error:", error);

    res.status(500).json({
      message: "Failed to fetch applications",
    });
  }
};
// Update application status - Recruiter only
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    // Check valid status
    if (!["Pending", "Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid application status",
      });
    }

    // Check logged-in user
    if (!req.user) {
      return res.status(401).json({
        message: "Please login",
      });
    }

    // Check recruiter role
    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can update application status",
      });
    }

    // Find application and its job
    const application = await Application.findById(applicationId).populate(
      "job"
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    // Check job exists
    if (!application.job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check recruiter owns this job
    if (application.job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to update this application",
      });
    }

    // Update status
    application.status = status;

    await application.save();

    res.status(200).json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error("Update Status Error:", error);

    res.status(500).json({
      message: "Failed to update application status",
    });
  }
};
// Get applicants for recruiter's jobs
exports.getRecruiterApplicants = async (req, res) => {
  try {
    // Check logged-in user
    if (!req.user) {
      return res.status(401).json({
        message: "Please login",
      });
    }

    // Check recruiter role
    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can view applicants",
      });
    }

    // Find recruiter's jobs
    const jobs = await Job.find({
      postedBy: req.user.id,
    }).select("_id title company location");
    
    console.log("Recruiter ID:", req.user.id);
    console.log("Recruiter Jobs:", jobs);

    const allJobs = await Job.find({}).select("_id title postedBy");
    console.log("ALL JOBS:", allJobs);
    const jobIds = jobs.map((job) => job._id);

    // Find applications for those jobs
    const applications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("job", "title company location")
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      applications,
    });
  } catch (error) {
    console.error("Get Recruiter Applicants Error:", error);

    res.status(500).json({
      message: "Failed to fetch applicants",
    });
  }
};