const mongoose = require('mongoose');

const fixtureSchema = new mongoose.Schema({
  home_team: { type: String, required: true },
  away_team: { type: String, required: true },
  match_date: { type: Date, required: true },
  location: { type: String, required: true },
  competition: { type: String },
  status: { type: String, enum: ['Upcoming', 'Completed', 'Postponed', 'Cancelled'], default: 'Upcoming' },
  home_score: { type: Number },
  away_score: { type: Number }
}, {
  timestamps: true
});

module.exports = mongoose.model('Fixture', fixtureSchema);
