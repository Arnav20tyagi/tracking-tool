// backend/controllers/trackController.js
const axios = require("axios");
const Click = require("../models/Click");

// Controller function
exports.trackClick = async (req, res) => {
    console.log(req)
  const { trackId, element, companyUrl, uniqueId } = req.body;
  let country = "Unknown";
  try {
    const response = await axios.get(`https://ipapi.co/${req.ip}/json/`); 
    country = response.data.country_name;
  } catch (err) {
    console.log("IP lookup failed", err);
  }

  // Find if a click already exists for this uniqueId, companyUrl, and element
  let click = await Click.findOne({ uniqueId, companyUrl, element });
  if (click) {
    click.clickCount += 1;
    click.ip = req.ip;
    click.country = country;
    click.timestamp = new Date();
    await click.save();
  } else {
    click = new Click({ trackId, element, companyUrl, uniqueId, ip: req.ip, country, clickCount: 1 });
    await click.save();
  }

  res.status(200).send("tracked");
};