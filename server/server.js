const express = require("express");
const cors = require("cors");
const app = express();
const contactRoutes = require("./routes/contactRoutes");

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api", contactRoutes);

app.get("/", (req, res) => {
  res.send("MERN Portfolio API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
