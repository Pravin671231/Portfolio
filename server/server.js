const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
const path=require("path")
const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error", err));

//middleware
app.use(
  cors({
    origin: "*", // frontend port
    methods: ["POST"],
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));


//routes
app.use("/api", contactRoutes);
app.use("/api/projects", projectRoutes);

// Static folder for image uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
