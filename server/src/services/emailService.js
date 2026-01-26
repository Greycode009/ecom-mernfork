import nodemailer from "nodemailer";

// Create reusable transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

// Email templates
const templates = {
    subscriptionActivated: (data) => ({
        subject: `✅ Your ${data.productTitle} subscription is now active!`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
    .info-box { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #e5e7eb; }
    .highlight { color: #6366f1; font-weight: bold; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
    .btn { display: inline-block; padding: 12px 24px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Subscription Activated!</h1>
    </div>
    <div class="content">
      <p>Hi ${data.userName || "there"},</p>
      <p>Great news! Your subscription has been successfully activated.</p>
      
      <div class="info-box">
        <h3 style="margin-top: 0;">📦 Subscription Details</h3>
        <p><strong>Product:</strong> ${data.productTitle}</p>
        <p><strong>Plan:</strong> ${data.planLabel}</p>
        <p><strong>Start Date:</strong> ${data.startDate}</p>
        <p><strong>Expiry Date:</strong> <span class="highlight">${data.endDate}</span></p>
      </div>
      
      <p>Enjoy your subscription! If you have any questions, reach out to us via WhatsApp.</p>
      
      <p style="text-align: center; margin-top: 30px;">
        <a href="${data.siteUrl}" class="btn">Visit CheapGPT</a>
      </p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} CheapGPT Nepal. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `,
    }),

    expiryWarning: (data) => ({
        subject: `⏰ Your ${data.productTitle} expires in ${data.daysRemaining} days!`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
    .info-box { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #e5e7eb; }
    .warning { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
    .btn { display: inline-block; padding: 12px 24px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⏰ Subscription Expiring Soon</h1>
    </div>
    <div class="content">
      <p>Hi ${data.userName || "there"},</p>
      
      <div class="warning">
        <p style="margin: 0;">⚠️ Your <strong>${data.productTitle}</strong> subscription expires on <strong>${data.endDate}</strong> (${data.daysRemaining} days remaining).</p>
      </div>
      
      <div class="info-box">
        <h3 style="margin-top: 0;">📦 Subscription Details</h3>
        <p><strong>Product:</strong> ${data.productTitle}</p>
        <p><strong>Plan:</strong> ${data.planLabel}</p>
        <p><strong>Expiry Date:</strong> ${data.endDate}</p>
      </div>
      
      <p>Don't lose access! Renew now to continue enjoying uninterrupted service.</p>
      
      <p style="text-align: center; margin-top: 30px;">
        <a href="${data.renewUrl}" class="btn">🔄 Renew Now</a>
      </p>
      
      <p style="color: #6b7280; font-size: 14px;">💡 <strong>Pro tip:</strong> Choose the annual plan and save up to 30%!</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} CheapGPT Nepal. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `,
    }),

    subscriptionExpired: (data) => ({
        subject: `❌ Your ${data.productTitle} subscription has expired`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
    .info-box { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #e5e7eb; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
    .btn { display: inline-block; padding: 12px 24px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>❌ Subscription Expired</h1>
    </div>
    <div class="content">
      <p>Hi ${data.userName || "there"},</p>
      <p>Your <strong>${data.productTitle}</strong> subscription has expired.</p>
      
      <div class="info-box">
        <h3 style="margin-top: 0;">📦 Expired Subscription</h3>
        <p><strong>Product:</strong> ${data.productTitle}</p>
        <p><strong>Plan:</strong> ${data.planLabel}</p>
        <p><strong>Expired on:</strong> ${data.endDate}</p>
      </div>
      
      <p>Don't worry! You can renew anytime to get back access.</p>
      
      <p style="text-align: center; margin-top: 30px;">
        <a href="${data.renewUrl}" class="btn">🔄 Renew Subscription</a>
      </p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} CheapGPT Nepal. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `,
    }),
};

// Send email function
export const sendEmail = async (to, templateName, data) => {
    try {
        const transporter = createTransporter();
        const template = templates[templateName];

        if (!template) {
            throw new Error(`Email template "${templateName}" not found`);
        }

        const { subject, html } = template(data);

        const mailOptions = {
            from: process.env.EMAIL_FROM || "CheapGPT <noreply@cheapgpt.com>",
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`📧 Email sent to ${to}: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error(`❌ Failed to send email to ${to}:`, error.message);
        return { success: false, error: error.message };
    }
};

// Test email connection
export const testEmailConnection = async () => {
    try {
        const transporter = createTransporter();
        await transporter.verify();
        console.log("✅ Email server connection verified");
        return true;
    } catch (error) {
        console.error("❌ Email server connection failed:", error.message);
        return false;
    }
};

export default { sendEmail, testEmailConnection };
