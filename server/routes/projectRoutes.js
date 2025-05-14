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

// POST a new project
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ message: "Project created" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create project" });
  }
});

module.exports = router;
