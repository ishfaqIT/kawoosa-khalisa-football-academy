const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  wing_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Wing', default: null },
  photo_url: { type: String },
  bio: { type: String },
  qualifications: { type: String },
  experience_yrs: { type: Number },
  joined_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Coach', coachSchema);
