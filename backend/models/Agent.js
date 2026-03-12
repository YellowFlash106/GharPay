const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  activeLeads: { type: Number, default: 0 },
  lastAssignedAt: { type: Date }
});

module.exports = mongoose.model('Agent', AgentSchema);
