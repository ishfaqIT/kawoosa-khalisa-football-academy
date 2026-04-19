const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll({ order: [['event_date', 'ASC']] });
    res.json({ success: true, data: events });
  } catch (err) { res.status(500).json({ success: false, error: 'Server Error' }); }
});

router.post('/', async (req, res) => {
  try {
    const item = await Event.create(req.body);
    res.json({ success: true, data: item });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    await Event.update(req.body, { where: { id: req.params.id } });
    const item = await Event.findByPk(req.params.id);
    res.json({ success: true, data: item });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await Event.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

module.exports = router;

