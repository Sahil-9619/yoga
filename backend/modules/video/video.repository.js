const { Video } = require('../../models');

const createVideo = async (data) => await Video.create(data);

const getAllVideos = async () => await Video.findAll({ order: [['createdAt', 'DESC']] });

const getVideoById = async (id) => {
    const video = await Video.findByPk(id);
    if (!video) throw new Error('Video not found');
    return video;
};

const updateVideo = async (id, data) => {
    const video = await Video.findByPk(id);
    if (!video) throw new Error('Video not found');
    await video.update(data);
    return video;
};

const deleteVideo = async (id) => {
    const video = await Video.findByPk(id);
    if (!video) throw new Error('Video not found');
    await video.destroy();
    return { message: 'Video deleted successfully' };
};

module.exports = { createVideo, getAllVideos, getVideoById, updateVideo, deleteVideo };
