const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMsg = new Message({ name, email, message });
    await newMsg.save();
    res.status(201).json({ message: "Form received and saved" });
  } catch (error) {
    res.status(500).json({ message: "server error,please try again" });
  }
});

module.exports = router;
