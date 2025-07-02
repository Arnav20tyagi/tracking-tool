const express = require("express");
const router = express.Router();
const { trackClick } = require("../controllers/trackController");

// router.post("/click", trackClick);
router.post("/track-click", trackClick);  // This defines POST /api/track-click

module.exports = router;