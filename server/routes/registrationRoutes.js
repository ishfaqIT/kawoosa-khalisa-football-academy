const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Player = require('../models/Player');
const Wing = require('../models/Wing');

router.get('/', async (req, res) => {
  try {
    const regs = await Registration.findAll({
      include: [{ model: Wing, attributes: ['name'] }],
      order: [['createdAt', 'DESC']]
    });
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
    const reg = await Registration.findByPk(req.params.id);
    if (!reg) return res.status(404).json({ success: false, error: 'Registration not found' });

    const previousStatus = reg.status;
    await reg.update(req.body);

    const newStatus = req.body.status;

    // ✅ APPROVED: create a player record from registration data
    if (newStatus === 'Approved' && previousStatus !== 'Approved') {
      const alreadyExists = await Player.findOne({
        where: { name: reg.player_name, wing_id: reg.wing_id }
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
      await Player.destroy({
        where: { name: reg.player_name, wing_id: reg.wing_id }
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
    await Registration.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

module.exports = router;
