const express = require('express');
const router = express.Router();
const Wing = require('../models/Wing');

// Get all wings
router.get('/', async (req, res) => {
  try {
    const wings = await Wing.find();
    res.json({ success: true, data: wings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
