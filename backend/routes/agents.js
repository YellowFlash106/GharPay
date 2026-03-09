const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');

router.get('/', async (req, res) => {
  const agents = await Agent.find();
  res.json(agents);
});

router.post('/', async (req, res) => {
  const agent = new Agent(req.body);
  await agent.save();
  res.status(201).json(agent);
});

module.exports = router;
