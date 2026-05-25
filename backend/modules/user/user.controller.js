const { User, Purchase, Video } = require('../../models');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // In a real app, hash the password!
        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(400).json({ success: false, message: 'Email already in use' });
        
        const user = await User.create({ name, email, password });
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
        const users = await User.findAll({
            include: [{ 
                model: Purchase, 
                as: 'purchases', 
                include: [{ model: Video, as: 'video' }]
            }],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { register, login, myVideos, getAllUsers };
