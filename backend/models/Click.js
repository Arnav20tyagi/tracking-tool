const mongoose = require("mongoose");

const ClickSchema = new mongoose.Schema({
  trackId: String,
  element: String,
  companyUrl: String,
  uniqueId: String,
  clickCount: { type: Number, default: 1 },
  timestamp: { type: Date, default: Date.now },
  ip: String,
  country: String,
});

module.exports = mongoose.model("Click", ClickSchema);