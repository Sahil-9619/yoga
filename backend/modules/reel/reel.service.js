const repository = require("./reel.repository");

const createReel = async (data) => {
    if (!data.title || !data.videoLink) {
        throw new Error("Title and Video Link are required.");
    }
    return await repository.createReel(data);
};

const getAllReels = async () => {
    return await repository.getAllReels();
};

const getReelById = async (id) => {
    const reel = await repository.getReelById(id);
    if (!reel) {
        throw new Error("Reel not found");
    }
    return reel;
};

const updateReel = async (id, data) => {
    const reel = await repository.getReelById(id);
    if (!reel) {
        throw new Error("Reel not found");
    }
    await repository.updateReel(id, data);
    return { message: "Reel updated successfully" };
};

const deleteReel = async (id) => {
    const reel = await repository.getReelById(id);
    if (!reel) {
        throw new Error("Reel not found");
    }
    await repository.deleteReel(id);
    return { message: "Reel deleted successfully" };
};

module.exports = {
    createReel,
    getAllReels,
    getReelById,
    updateReel,
    deleteReel
};
