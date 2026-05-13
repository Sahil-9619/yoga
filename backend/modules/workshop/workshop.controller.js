const service =
    require("./workshop.service");


// Create Workshop
const create = async (req, res) => {

    try {
        const workshopData = { ...req.body };
        if (req.file) {
            workshopData.photo = `/uploads/${req.file.filename}`;
        }

        const data =
            await service.createWorkshop(
                workshopData
            );

        return res.status(201).json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Get All Workshops
const getAll = async (req, res) => {

    try {

        const data =
            await service.getAllWorkshops();

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get Single Workshop
const getOne = async (req, res) => {

    try {

        const data =
            await service.getWorkshopById(
                req.params.id
            );

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


// Update Workshop
const update = async (req, res) => {

    try {
        const workshopData = { ...req.body };
        if (req.file) {
            workshopData.photo = `/uploads/${req.file.filename}`;
        }

        const data =
            await service.updateWorkshop(
                req.params.id,
                workshopData
            );

        return res.status(200).json({
            success: true,
            message: data.message
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Delete Workshop
const remove = async (req, res) => {

    try {

        const data =
            await service.deleteWorkshop(
                req.params.id
            );

        return res.status(200).json({
            success: true,
            message: data.message
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    create,
    getAll,
    getOne,
    update,
    remove
};