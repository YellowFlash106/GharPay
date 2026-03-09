const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, required: true },
  source: String,
  timestamp: { type: Date, default: Date.now },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  status: { type: String, default: 'New Lead' },
  notes: [{ text: String, date: Date, by: String }],
  visit: {
    propertyId: String,
    datetime: Date,
    outcome: String
  },
  lastActivityAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', LeadSchema);
