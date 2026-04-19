const express = require('express');
const router = express.Router();
const Fixture = require('../models/Fixture');

router.get('/', async (req, res) => {
  try {
    const fixtures = await Fixture.findAll({ order: [['match_date', 'DESC']] });
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
    await Fixture.update(req.body, { where: { id: req.params.id } });
    const item = await Fixture.findByPk(req.params.id);
    res.json({ success: true, data: item });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await Fixture.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

module.exports = router;

