const Agent = require('../models/Agent');


async function assignLead() {
  const agents = await Agent.find().sort({ activeLeads: 1, lastAssignedAt: 1 }).limit(10);
  if (!agents || agents.length === 0) return null;
  const agent = agents[0];
  agent.activeLeads = (agent.activeLeads || 0) + 1;
  agent.lastAssignedAt = new Date();
  await agent.save();
  return agent;
}

module.exports = { assignLead };
