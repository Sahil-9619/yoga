const { User, Purchase, Video } = require('../../models');
const { Op } = require('sequelize');
const { sendWelcomeEmail } = require('../../config/mailer');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // In a real app, hash the password!
        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(400).json({ success: false, message: 'Email already in use' });
        
        const user = await User.create({ name, email, password });
        
        // Asynchronously send a premium welcome email (does not block HTTP response)
        sendWelcomeEmail(user.email, user.name).catch(err => {
            console.error("Failed to send welcome email:", err.message);
        });

        res.status(201).json({ success: true, data: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email, password } });
        if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        res.status(200).json({ success: true, data: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const myVideos = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ success: false, message: 'User ID required' });
        
        const purchases = await Purchase.findAll({ 
            where: { userId },
            include: [{ model: Video, as: 'video' }]
        });
        
        res.status(200).json({ success: true, data: purchases });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';

        const where = search ? {
            [Op.or]: [
                { name: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } }
            ]
        } : {};

        const { count, rows } = await User.findAndCountAll({
            where,
            include: [{ 
                model: Purchase, 
                as: 'purchases', 
                include: [{ model: Video, as: 'video' }]
            }],
            order: [['createdAt', 'DESC']],
            limit,
            offset,
            distinct: true
        });

        res.status(200).json({ 
            success: true, 
            data: rows,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });

        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(200).json({ success: true, exists: true, message: 'Email already in use.' });
        }

        return res.status(200).json({ success: true, exists: false });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Cascade delete all associated purchases to satisfy foreign key constraints
        await Purchase.destroy({ where: { userId: id } });

        await user.destroy();
        return res.status(200).json({ success: true, message: 'User deleted successfully.' });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { register, login, myVideos, getAllUsers, checkEmail, deleteUser };
