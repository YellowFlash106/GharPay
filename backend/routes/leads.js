const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { assignLead } = require('../utils/assign');

router.post('/', async (req, res) => {
  try {
    const { name, phone, source } = req.body;
    const lead = new Lead({ name, phone, source });
    const agent = await assignLead();
    if (agent) lead.assignedAgent = agent._id;
    await lead.save();
    res.status(201).json(lead);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'failed' });
  }
});

router.get('/', async (req, res) => {
  const leads = await Lead.find().populate('assignedAgent').sort({ timestamp: -1 }).limit(200);
  res.json(leads);
});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  if (update.status || update.notes) update.lastActivityAt = new Date();
  const lead = await Lead.findByIdAndUpdate(id, update, { new: true }).populate('assignedAgent');
  res.json(lead);
});

router.post('/:id/visit', async (req, res) => {
  const { propertyId, datetime } = req.body;
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ error: 'not found' });
  lead.visit = { propertyId, datetime: new Date(datetime) };
  lead.status = 'Visit Scheduled';
  lead.lastActivityAt = new Date();
  await lead.save();
  res.json(lead);
});


router.get('/stats/summary', async (req, res) => {
  const stages = ['New Lead','Contacted','Requirement Collected','Property Suggested','Visit Scheduled','Visit Completed','Booked','Lost'];
  const counts = {};
  for (const s of stages) counts[s] = await Lead.countDocuments({ status: s });
  counts.total = await Lead.countDocuments();
  counts.visits = await Lead.countDocuments({ 'visit.datetime': { $exists: true } });
  counts.booked = counts['Booked'] || 0;
  res.json(counts);
});

module.exports = router;
