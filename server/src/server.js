import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import { initSubscriptionCron } from "./jobs/subscriptionCron.js";
import { testEmailConnection } from "./services/emailService.js";

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectDB();

  // Test email connection
  const emailOk = await testEmailConnection();
  if (!emailOk) {
    console.warn("⚠️ Email service not configured - notifications will not be sent");
  }

  // Initialize subscription cron job
  initSubscriptionCron();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();

