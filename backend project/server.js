const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");
const userRoutes = require("./routes/user");
const applicationRoutes = require("./routes/application");
const connectDB = require("./config/db");
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);
app.use("/api/applications", applicationRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Backend Server is Running...");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});