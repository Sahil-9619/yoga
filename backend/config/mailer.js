const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Create transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

// Cache for template strings to optimize file system access
const templateCache = {};

const loadTemplate = (templateName) => {
    if (templateCache[templateName]) {
        return templateCache[templateName];
    }
    
    try {
        const filePath = path.join(__dirname, "../templates", `${templateName}.html`);
        const content = fs.readFileSync(filePath, "utf8");
        templateCache[templateName] = content;
        return content;
    } catch (error) {
        console.error(`Failed to load email template [${templateName}]:`, error.message);
        throw error;
    }
};

const compileTemplate = (templateName, variables) => {
    const layout = loadTemplate("layout");
    const body = loadTemplate(templateName);
    
    // Replace layout slots
    let html = layout
        .replace("{{body}}", body)
        .replace("{{subject}}", variables.subject || "Saargamm Bhartiye");
        
    // Replace all variable placeholders dynamically
    for (const [key, value] of Object.entries(variables)) {
        // Use global regex replacement for variables that appear multiple times
        html = html.replace(new RegExp(`{{${key}}}`, "g"), value);
    }
    
    return html;
};

const sendMail = async (to, subject, htmlContent) => {
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD || process.env.SMTP_PASSWORD === 'your_app_password_here') {
        console.warn(`[Mailer Warning] SMTP is not configured. Logged Subject: "${subject}" to console.`);
        return { success: true, simulated: true };
    }

    try {
        const mailOptions = {
            from: `"Saargamm Bhartiye" <${process.env.SMTP_EMAIL}>`,
            to,
            subject,
            html: htmlContent,
        };

        const info = await transporter.sendMail(mailOptions);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Mailer sendMail Error:", error.message);
        throw error;
    }
};

const sendOTPEmail = async (email, otp) => {
    const subject = "Your Verification OTP - Saargamm Bhartiye";
    const htmlContent = compileTemplate("otp", { subject, otp });
    return await sendMail(email, subject, htmlContent);
};

const sendWelcomeEmail = async (email, name) => {
    const subject = "Welcome to Saargamm Bhartiye ✨";
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const htmlContent = compileTemplate("welcome", { subject, name, frontendUrl });
    return await sendMail(email, subject, htmlContent);
};

const sendBookingConfirmationEmail = async (email, name, bookingDetails) => {
    const subject = "Booking Confirmed - Saargamm Bhartiye";
    const amountText = bookingDetails.priceType === 'free' ? 'FREE' : `₹${bookingDetails.amount || 0}`;
    
    let venueText = "N/A";
    if (bookingDetails.mode && bookingDetails.mode.toLowerCase() === 'online') {
        venueText = bookingDetails.platform || "Online Link";
    } else if (bookingDetails.mode && bookingDetails.mode.toLowerCase() === 'offline') {
        venueText = bookingDetails.location || "Physical Location";
    }

    const htmlContent = compileTemplate("booking-confirmation", {
        subject,
        name,
        workshopTitle: bookingDetails.workshopTitle || 'Custom Session',
        categoryName: bookingDetails.categoryName || 'General',
        amountText,
        phone: bookingDetails.phone || 'N/A',
        mode: bookingDetails.mode ? bookingDetails.mode.toUpperCase() : 'N/A',
        time: bookingDetails.time || 'N/A',
        date: bookingDetails.date || 'N/A',
        venueText
    });
    return await sendMail(email, subject, htmlContent);
};

module.exports = {
    sendMail,
    sendOTPEmail,
    sendWelcomeEmail,
    sendBookingConfirmationEmail
};
