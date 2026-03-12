const Lead = require('../models/Lead');
const Agent = require('../models/Agent');
const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text) {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    await transporter.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to, subject, text });
    return true;
  }
  console.log('Email stub:', { to, subject, text });
  return false;
}

async function sendWhatsApp(to, message) {
  console.log('WhatsApp stub:', to, message);
}

async function sendReminders() {
  const days = parseInt(process.env.REMINDER_DAYS || '1', 10);
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const leads = await Lead.find({ status: 'New Lead', timestamp: { $lt: cutoff } }).populate('assignedAgent');
  for (const lead of leads) {
    const agentName = lead.assignedAgent ? lead.assignedAgent.name : 'unassigned';
    const text = `Reminder: Lead ${lead.name || ''} ${lead.phone} assigned to ${agentName} needs follow-up`;
    console.log('Reminder:', text);
    if (lead.assignedAgent && lead.assignedAgent.email) {
      await sendEmail(lead.assignedAgent.email, 'Lead follow-up reminder', text);
    }
    if (lead.assignedAgent && lead.assignedAgent.phone) {
      await sendWhatsApp(lead.assignedAgent.phone, text);
    }
  }
}

module.exports = { sendReminders };