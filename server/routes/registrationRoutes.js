const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Player = require('../models/Player');

router.get('/', async (req, res) => {
  try {
    const regs = await Registration.find()
      .populate('wing_id', 'name')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: regs });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const newReg = await Registration.create(req.body);
    res.json({ success: true, data: newReg });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

// Update status — auto-create Player on Approve, auto-delete on Reject
router.put('/:id', async (req, res) => {
  try {
    const reg = await Registration.findById(req.params.id);
    if (!reg) return res.status(404).json({ success: false, error: 'Registration not found' });

    const previousStatus = reg.status;
    
    Object.assign(reg, req.body);
    await reg.save();

    const newStatus = req.body.status;

    // ✅ APPROVED: create a player record from registration data
    if (newStatus === 'Approved' && previousStatus !== 'Approved') {
      const alreadyExists = await Player.findOne({
        name: reg.player_name, wing_id: reg.wing_id
      });

      if (!alreadyExists) {
        await Player.create({
          name: reg.player_name,
          dob: reg.dob,
          wing_id: reg.wing_id,
          position: reg.position || 'Forward',
          bio: `Registered via online form. Parent: ${reg.parent_name}. Contact: ${reg.phone}.`,
          photo_url: null,
          jersey_no: null
        });
      }
    }

    // ❌ REJECTED: remove the player if they were previously approved
    if (newStatus === 'Rejected' && previousStatus === 'Approved') {
      await Player.findOneAndDelete({
        name: reg.player_name, wing_id: reg.wing_id
      });
    }

    res.json({ success: true, data: reg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

module.exports = router;
