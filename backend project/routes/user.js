const express = require("express");
const router = express.Router();

const { testUser } = require("../controllers/userController");

router.get("/", testUser);

module.exports = router;