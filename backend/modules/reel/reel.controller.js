const service = require("./reel.service");

const create = async (req, res) => {
    try {
        const payload = { ...req.body };
        if (req.file) {
            payload.thumbnail = `/uploads/${req.file.filename}`;
        }
        const data = await service.createReel(payload);
        return res.status(201).json({ success: true, data });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const data = await service.getAllReels();
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getOne = async (req, res) => {
    try {
        const data = await service.getReelById(req.params.id);
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const payload = { ...req.body };
        if (req.file) {
            payload.thumbnail = `/uploads/${req.file.filename}`;
        }
        const data = await service.updateReel(req.params.id, payload);
        return res.status(200).json({ success: true, message: data.message });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const data = await service.deleteReel(req.params.id);
        return res.status(200).json({ success: true, message: data.message });
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
};

module.exports = {
    create,
    getAll,
    getOne,
    update,
    remove
};
