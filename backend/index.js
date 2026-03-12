const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const leadRoutes = require('./routes/leads');
const agentRoutes = require('./routes/agents');

app.use('/api/leads', leadRoutes);
app.use('/api/agents', agentRoutes);

const PORT = process.env.PORT || 5000;

// Try to connect to MongoDB; for local development we start the server even if DB is unreachable
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gharpayy')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error (continuing without DB):', err))
  .finally(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });

// Daily reminder cron (runs every day at 09:00)
const { sendReminders } = require('./utils/reminders');
cron.schedule('0 9 * * *', async () => {
  console.log('Running daily reminders');
  try { await sendReminders(); } catch(e){ console.error(e); }
});
