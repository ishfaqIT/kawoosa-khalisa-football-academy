const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  player_name: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  wing_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Wing', required: true },
  position: { type: String },
  parent_name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true },
  medical_history: { type: String },
  terms_accepted: { type: Boolean, default: false, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Registration', registrationSchema);
