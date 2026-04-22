const mongoose = require('mongoose');

const wingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ground: { type: String },
  founded: { type: Number },
  description: { type: String },
  color_accent: { type: String, default: '#00FF87' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Wing', wingSchema);
