const { Reel } = require("../../models");

const createReel = async (data) => {
    return await Reel.create(data);
};

const getAllReels = async () => {
    return await Reel.findAll({
        order: [["createdAt", "DESC"]]
    });
};

const getReelById = async (id) => {
    return await Reel.findByPk(id);
};

const updateReel = async (id, data) => {
    return await Reel.update(data, { where: { id } });
};

const deleteReel = async (id) => {
    return await Reel.destroy({ where: { id } });
};

module.exports = {
    createReel,
    getAllReels,
    getReelById,
    updateReel,
    deleteReel
};
