const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String },
  image_url: { type: String, required: true },
  category: { type: String, default: 'General' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);
