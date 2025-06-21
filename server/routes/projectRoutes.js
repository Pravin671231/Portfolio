const express = require("express");
const Project = require("../models/Project");
const upload = require("../middlewares/upload");
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
router.post("/", upload.single("imageUrl"), async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ message: "Project created" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create project" });
  }
});

// PUT update a project by ID
router.put("/:id", upload.single("imageUrl"), async (req, res) => {
  try {
    const updatedData = req.body;
    if (req.file) {
      updatedData.imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project updated", project });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to update project" });
  }
});

module.exports = router;
