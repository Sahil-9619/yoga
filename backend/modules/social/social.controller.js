const service = require('./social.service');

const getAll = async (req, res) => {
    try {
        const data = await service.getAll();
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { facebook, instagram, youtube } = req.body;
        const data = await service.updateAll({ facebook, instagram, youtube });
        return res.status(200).json({ success: true, data, message: 'Social links updated.' });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { getAll, update };
