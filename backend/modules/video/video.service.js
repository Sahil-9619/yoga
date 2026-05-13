const repo = require('./video.repository');

const createVideo   = (data) => repo.createVideo(data);
const getAllVideos   = ()     => repo.getAllVideos();
const getVideoById  = (id)   => repo.getVideoById(id);
const updateVideo   = (id, data) => repo.updateVideo(id, data);
const deleteVideo   = (id)   => repo.deleteVideo(id);

module.exports = { createVideo, getAllVideos, getVideoById, updateVideo, deleteVideo };
