const service = require('./booking.service');
const { sendOTPEmail, sendBookingConfirmationEmail } = require('../../config/mailer');

const otpStore = new Map(); // Simple in-memory store for OTPs: email -> { otp, expiresAt }


const create = async (req, res) => {
    try {
        const { name, email, phone, workshopId, workshopTitle, categoryName, amount, priceType } = req.body;
        if (!name || !email || !phone || !workshopId) {
            return res.status(400).json({ success: false, message: 'Name, email, phone and workshopId are required.' });
        }
        const data = await service.createBooking({ name, email, phone, workshopId, workshopTitle, categoryName, amount, priceType });
        
        // Asynchronously fetch workshop details and send the booking confirmation email
        (async () => {
            try {
                const { Workshop } = require('../../models');
                const workshop = await Workshop.findByPk(workshopId);
                
                const bookingDetails = {
                    workshopTitle: workshopTitle || (workshop ? workshop.title : 'Custom Session'),
                    categoryName: categoryName || 'General',
                    amount,
                    priceType,
                    phone,
                    mode: workshop ? workshop.mode : 'N/A',
                    time: workshop ? workshop.time : 'N/A',
                    date: workshop ? new Date(workshop.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A',
                    location: workshop ? workshop.location : '',
                    platform: workshop ? workshop.platform : ''
                };
                
                await sendBookingConfirmationEmail(email, name, bookingDetails);
            } catch (err) {
                console.error("Failed to send booking confirmation email:", err.message);
            }
        })();

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

        // Send OTP using the beautiful config/mailer HTML template
        const mailResult = await sendOTPEmail(email, otp);

        if (mailResult.simulated) {
            console.warn("SMTP credentials not configured. OTP generated but not sent. OTP:", otp);
            return res.status(200).json({ success: true, message: 'SMTP not configured, check console for OTP' });
        }
        
        return res.status(200).json({ success: true, message: 'OTP sent to email successfully' });
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
