const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const Coach = require('../models/Coach');
const Fixture = require('../models/Fixture');
const News = require('../models/News');
const Gallery = require('../models/Gallery');
const Registration = require('../models/Registration');

router.get('/counts', async (req, res) => {
  try {
    const [players, coaches, fixtures, news, gallery, registrations] = await Promise.all([
      Player.countDocuments(),
      Coach.countDocuments(),
      Fixture.countDocuments(),
      News.countDocuments(),
      Gallery.countDocuments(),
      Registration.countDocuments()
    ]);

    // Add some realistic "goals" and "years" based on project metadata
    const yearsActive = new Date().getFullYear() - 2016;
    
    res.json({
      success: true,
      data: {
        players,
        coaches,
        fixtures,
        news,
        gallery,
        registrations,
        yearsActive,
        goalsScored: players * 2 + 50, // Mock dynamic stat
        trophies: 12 // Constant for now
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
