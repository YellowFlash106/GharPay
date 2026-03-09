const Lead = require('../models/Lead');
const Agent = require('../models/Agent');

async function sendReminders() {
  
  const days = parseInt(process.env.REMINDER_DAYS || '1', 10);
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const leads = await Lead.find({ status: 'New Lead', timestamp: { $lt: cutoff } }).populate('assignedAgent');
  for (const lead of leads) {
    
    console.log(`Reminder: Lead ${lead.name || ''} ${lead.phone} assigned to ${lead.assignedAgent ? lead.assignedAgent.name : 'unassigned'} needs follow-up`);
  }
}

module.exports = { sendReminders };
