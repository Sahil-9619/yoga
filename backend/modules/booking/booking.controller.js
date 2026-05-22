const service = require('./booking.service');
const nodemailer = require('nodemailer');

const otpStore = new Map(); // Simple in-memory store for OTPs: email -> { otp, expiresAt }


const create = async (req, res) => {
    try {
        const { name, email, phone, workshopId, workshopTitle, categoryName, amount, priceType } = req.body;
        if (!name || !email || !phone || !workshopId) {
            return res.status(400).json({ success: false, message: 'Name, email, phone and workshopId are required.' });
        }
        const data = await service.createBooking({ name, email, phone, workshopId, workshopTitle, categoryName, amount, priceType });
        return res.status(201).json({ success: true, data });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const data = await service.getAllBookings();
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const data = await service.deleteBooking(req.params.id);
        return res.status(200).json({ success: true, message: data.message });
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
};

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

        // Generate 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        
        // Store OTP with 10 mins expiry
        otpStore.set(email, { 
            otp, 
            expiresAt: Date.now() + 10 * 60 * 1000 
        });

        // In a real scenario, we check if SMTP is configured
        if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
            console.warn("SMTP credentials not configured. OTP generated but not sent. OTP:", otp);
            // If they haven't configured it, we can still proceed for development purposes
            return res.status(200).json({ success: true, message: 'SMTP not configured, check console for OTP' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can change this to your provider
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: 'Your OTP for Workshop Booking',
            html: `<p>Your verification code is: <strong>${otp}</strong></p><p>This code will expire in 10 minutes.</p>`
        };

        await transporter.sendMail(mailOptions);
        
        return res.status(200).json({ success: true, message: 'OTP sent to email' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to send OTP: ' + error.message });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP are required' });

        const storedData = otpStore.get(email);
        
        if (!storedData) {
            return res.status(400).json({ success: false, message: 'No OTP found for this email or it has expired.' });
        }

        if (Date.now() > storedData.expiresAt) {
            otpStore.delete(email);
            return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
        }

        if (storedData.otp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP.' });
        }

        // OTP verified successfully
        otpStore.delete(email); // Remove it after successful verification
        return res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { create, getAll, remove, sendOtp, verifyOtp };
