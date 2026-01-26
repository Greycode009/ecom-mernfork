import cron from "node-cron";
import Subscription from "../models/Subscription.js";
import User from "../models/User.js";
import { sendEmail } from "../services/emailService.js";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5174";

// Format date for email
const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

// Check for expiring subscriptions and send notifications
const checkExpiringSubscriptions = async () => {
    console.log("🔍 Checking for expiring subscriptions...");

    try {
        const now = new Date();
        const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

        // Find subscriptions expiring within 7 days that haven't received 7-day warning
        const expiringIn7Days = await Subscription.find({
            status: "active",
            endDate: { $lte: sevenDaysFromNow, $gt: threeDaysFromNow },
            "notificationsSent.sevenDayWarning": false,
        }).populate("user", "name email");

        for (const sub of expiringIn7Days) {
            if (!sub.user?.email) continue;

            const daysRemaining = Math.ceil((sub.endDate - now) / (1000 * 60 * 60 * 24));

            await sendEmail(sub.user.email, "expiryWarning", {
                userName: sub.user.name,
                productTitle: sub.productTitle,
                planLabel: sub.planLabel,
                endDate: formatDate(sub.endDate),
                daysRemaining,
                renewUrl: `${CLIENT_URL}/product/${sub.productSlug || ""}`,
                siteUrl: CLIENT_URL,
            });

            // Mark notification as sent
            sub.notificationsSent.sevenDayWarning = true;
            sub.status = "expiring";
            await sub.save();

            console.log(`📧 Sent 7-day warning to ${sub.user.email} for ${sub.productTitle}`);
        }

        // Find subscriptions expiring within 3 days that haven't received 3-day warning
        const expiringIn3Days = await Subscription.find({
            status: { $in: ["active", "expiring"] },
            endDate: { $lte: threeDaysFromNow, $gt: now },
            "notificationsSent.threeDayWarning": false,
        }).populate("user", "name email");

        for (const sub of expiringIn3Days) {
            if (!sub.user?.email) continue;

            const daysRemaining = Math.ceil((sub.endDate - now) / (1000 * 60 * 60 * 24));

            await sendEmail(sub.user.email, "expiryWarning", {
                userName: sub.user.name,
                productTitle: sub.productTitle,
                planLabel: sub.planLabel,
                endDate: formatDate(sub.endDate),
                daysRemaining,
                renewUrl: `${CLIENT_URL}/product/${sub.productSlug || ""}`,
                siteUrl: CLIENT_URL,
            });

            sub.notificationsSent.threeDayWarning = true;
            await sub.save();

            console.log(`📧 Sent 3-day warning to ${sub.user.email} for ${sub.productTitle}`);
        }

        // Find expired subscriptions that haven't received expiry notice
        const expiredSubs = await Subscription.find({
            status: { $in: ["active", "expiring"] },
            endDate: { $lte: now },
            "notificationsSent.expiryNotice": false,
        }).populate("user", "name email");

        for (const sub of expiredSubs) {
            if (!sub.user?.email) continue;

            await sendEmail(sub.user.email, "subscriptionExpired", {
                userName: sub.user.name,
                productTitle: sub.productTitle,
                planLabel: sub.planLabel,
                endDate: formatDate(sub.endDate),
                renewUrl: `${CLIENT_URL}/product/${sub.productSlug || ""}`,
                siteUrl: CLIENT_URL,
            });

            sub.notificationsSent.expiryNotice = true;
            sub.status = "expired";
            await sub.save();

            console.log(`📧 Sent expiry notice to ${sub.user.email} for ${sub.productTitle}`);
        }

        console.log("✅ Subscription check complete");
    } catch (error) {
        console.error("❌ Error checking subscriptions:", error.message);
    }
};

// Initialize cron job
export const initSubscriptionCron = () => {
    // Run every day at 9:00 AM Nepal Time (UTC+5:45)
    // 9:00 AM NPT = 3:15 AM UTC
    cron.schedule("15 3 * * *", () => {
        console.log("⏰ Running daily subscription check...");
        checkExpiringSubscriptions();
    });

    console.log("🕐 Subscription cron job initialized (runs daily at 9:00 AM NPT)");
};

// Manual trigger for testing
export const runSubscriptionCheck = checkExpiringSubscriptions;

export default { initSubscriptionCron, runSubscriptionCheck };
