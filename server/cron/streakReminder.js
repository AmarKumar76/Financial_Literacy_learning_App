const cron = require('node-cron');
const User = require('../models/User');

const initCronJobs = () => {
  // Run every day at 18:00 (6:00 PM)
  cron.schedule('0 18 * * *', async () => {
    try {
      console.log('CRON: Running streak reminder check...');
      
      // In a real app, you would check last active dates.
      // Here, we find users with active streaks to simulate sending reminders.
      const usersAtRisk = await User.find({ streak: { $gt: 0 } }).limit(50);

      usersAtRisk.forEach(user => {
        console.log(`Notification queued for ${user.email}: Don't lose your ${user.streak}-day learning streak!`);
        // e.g., sendEmail(user.email, 'Keep your streak alive!')
      });

      console.log(`CRON: Processed streak reminders for ${usersAtRisk.length} users.`);
    } catch (error) {
      console.error('CRON Error:', error);
    }
  });

  console.log('CRON: Jobs initialized');
};

module.exports = { initCronJobs };
