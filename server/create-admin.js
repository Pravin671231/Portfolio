require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("123456", 10);
  await Admin.create(
    { email: "admin@pravin.dev" },
    { password: hashedPassword }
  );
  console.log("Create Admin");
  mongoose.disconnect();
}

createAdmin();
