const { Purchase, Video } = require('../../models');
const { Op } = require('sequelize');

const checkout = async (req, res) => {
    try {
        const { userId, videoId } = req.body;
        if (!userId || !videoId) return res.status(400).json({ success: false, message: 'userId and videoId are required' });

        const video = await Video.findByPk(videoId);
        if (!video) return res.status(404).json({ success: false, message: 'Video not found' });

        // Dummy payment processing
        const amount = video.price || 0;
        
        // Check if already purchased
        const existing = await Purchase.findOne({ where: { userId, videoId } });
        if (existing) return res.status(400).json({ success: false, message: 'You already own this video' });

        const purchase = await Purchase.create({ userId, videoId, amount, status: 'completed' });
        res.status(201).json({ success: true, data: purchase });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAllPurchases = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';

        const { User } = require('../../models');

        const where = search ? {
            [Op.or]: [
                { '$user.name$': { [Op.like]: `%${search}%` } },
                { '$user.email$': { [Op.like]: `%${search}%` } },
                { '$video.title$': { [Op.like]: `%${search}%` } }
            ]
        } : {};

        const { count, rows } = await Purchase.findAndCountAll({
            where,
            include: [
                { model: User, as: 'user' },
                { model: Video, as: 'video' }
            ],
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

module.exports = { checkout, getAllPurchases };
