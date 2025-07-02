require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const trackRoutes = require("./routes/trackRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// app.use("/api", trackRoutes);
app.use("/api", require("./routes/trackRoutes"));  //<-- This is the required line

// Serve static files
app.use(express.static("public"));
app.use(express.static("views"));

// Start server
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});