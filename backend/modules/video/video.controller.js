const service = require('./video.service');
const path    = require('path');

const create = async (req, res) => {
    try {
        const { title, description, duration, videoLink } = req.body;
        if (!title || !videoLink) {
            return res.status(400).json({ success: false, message: 'Title and Video Link are required.' });
        }
        const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;
        const data = await service.createVideo({ title, description, duration, thumbnail, videoLink });
        return res.status(201).json({ success: true, data });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const data = await service.getAllVideos();
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getOne = async (req, res) => {
    try {
        const data = await service.getVideoById(req.params.id);
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { title, description, duration, videoLink } = req.body;
        const updateData = { title, description, duration, videoLink };
        if (req.file) updateData.thumbnail = `/uploads/${req.file.filename}`;
        const data = await service.updateVideo(req.params.id, updateData);
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const data = await service.deleteVideo(req.params.id);
        return res.status(200).json({ success: true, message: data.message });
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
};

module.exports = { create, getAll, getOne, update, remove };
