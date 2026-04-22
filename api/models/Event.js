const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  event_date: { type: Date, required: true },
  location: { type: String, required: true },
  image_url: { type: String },
  type: { type: String, enum: ['Training', 'Match', 'Trial', 'Meeting', 'Other'], default: 'Other' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
