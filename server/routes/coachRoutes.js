const express = require('express');
const router = express.Router();
const Coach = require('../models/Coach');
const Wing = require('../models/Wing');

router.get('/', async (req, res) => {
  try {
    const coaches = await Coach.findAll({
      include: [{ model: Wing, attributes: ['name'] }],
      order: [['createdAt', 'ASC']]
    });
    res.json({ success: true, data: coaches });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const item = await Coach.create(req.body);
    res.json({ success: true, data: item });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    await Coach.update(req.body, { where: { id: req.params.id } });
    const item = await Coach.findByPk(req.params.id);
    res.json({ success: true, data: item });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await Coach.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

module.exports = router;
