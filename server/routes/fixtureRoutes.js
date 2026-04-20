const express = require('express');
const router = express.Router();
const Fixture = require('../models/Fixture');

router.get('/', async (req, res) => {
  try {
    const fixtures = await Fixture.find().sort({ match_date: -1 });
    res.json({ success: true, data: fixtures });
  } catch (err) { res.status(500).json({ success: false, error: 'Server Error' }); }
});

router.post('/', async (req, res) => {
  try {
    const item = await Fixture.create(req.body);
    res.json({ success: true, data: item });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const item = await Fixture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: item });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await Fixture.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

module.exports = router;
