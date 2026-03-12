const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');
const Lead = require('../models/Lead');

router.get('/', async (req, res) => {
  const agents = await Agent.find();
  res.json(agents);
});

router.post('/', async (req, res) => {
  const agent = new Agent(req.body);
  await agent.save();
  res.status(201).json(agent);
});

// Leaderboard: agents with counts (total assigned, booked)
router.get('/leaderboard', async (req, res) => {
  try {
    const agg = await Lead.aggregate([
      { $match: { assignedAgent: { $ne: null } } },
      { $group: { _id: '$assignedAgent', total: { $sum: 1 }, booked: { $sum: { $cond: [{ $eq: ['$status', 'Booked'] }, 1, 0] } } } },
      { $lookup: { from: 'agents', localField: '_id', foreignField: '_id', as: 'agent' } },
      { $unwind: '$agent' },
      { $project: { agentId: '$_id', name: '$agent.name', total: 1, booked: 1 } },
      { $sort: { booked: -1, total: -1 } }
    ]);
    res.json(agg);
  } catch (e) { console.error(e); res.status(500).json({ error: 'failed' }); }
});

module.exports = router;
