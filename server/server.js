const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
const contactRoutes = require("./routes/contactRoutes");
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

//routes
app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
