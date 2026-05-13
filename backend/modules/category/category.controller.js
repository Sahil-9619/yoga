const service =
    require("./category.service");


// Create Category
const create = async (req, res) => {

    try {

        const data =
            await service.createCategory(
                req.body
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


// Get All Categories
const getAll = async (req, res) => {

    try {

        const data =
            await service.getAllCategories();

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


// Get Single Category
const getOne = async (req, res) => {

    try {

        const data =
            await service.getCategoryById(
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





// Delete Category
const remove = async (req, res) => {

    try {

        const data =
            await service.deleteCategory(
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
    remove
};