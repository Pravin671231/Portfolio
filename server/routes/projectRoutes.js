const express = require("express");
const Project = require("../models/Project");
const router = express.Router();

//GET all Projects

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Projects" });
  }
});

module.exports = router;
