const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date },
  gender: { type: String, default: 'Male' },
  wing_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Wing', default: null },
  position: { type: String },
  photo_url: { type: String },
  jersey_no: { type: Number },
  status: { type: String, default: 'Active' },
  bio: { type: String },
  school: { type: String },
  parent_contact: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Player', playerSchema);
