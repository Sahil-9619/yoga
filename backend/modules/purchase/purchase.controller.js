const { Purchase, Video } = require('../../models');

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
        const { User } = require('../../models');
        const purchases = await Purchase.findAll({
            include: [
                { model: User, as: 'user' },
                { model: Video, as: 'video' }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({ success: true, data: purchases });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { checkout, getAllPurchases };
