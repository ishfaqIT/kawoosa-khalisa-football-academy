const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  image_url: { type: String },
  author: { type: String, default: 'Admin' },
  status: { type: String, enum: ['Published', 'Draft'], default: 'Published' }
}, {
  timestamps: true
});

module.exports = mongoose.model('News', newsSchema);
