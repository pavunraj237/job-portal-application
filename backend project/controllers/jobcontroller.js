const Job = require("../models/Job");

// Test Job Controller
exports.testJob = (req, res) => {
  res.send("Job Controller Working");
};

// Create Job
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      description,
      skills,
      salary,
      category,
    } = req.body;

    if (!req.user) {
      return res.status(401).json({
        message: "Please login",
      });
    }

    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can post jobs",
      });
    }

    const postedBy = req.user.id;

    const searchText = `
      ${title || ""}
      ${company || ""}
      ${location || ""}
      ${description || ""}
      ${(skills || []).join(" ")}
      ${category || ""}
    `;

    const job = new Job({
      title,
      company,
      location,
      description,
      skills,
      salary,
      category,
      searchText,
      postedBy,
    });

    await job.save();

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error("Create Job Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get all jobs + Search jobs
exports.getJobs = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { company: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { skills: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      };
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Get Jobs Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get single job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Get Job By ID Error:", error);

    res.status(400).json({
      message: "Invalid job ID",
    });
  }
};

// Search Jobs
exports.searchJobs = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const jobs = await Job.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { company: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { skills: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { searchText: { $regex: q, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Search Jobs Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
