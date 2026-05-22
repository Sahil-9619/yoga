const { Category, Workshop } = require("../../models");


// Create Category
const createCategory = async (data) => {

    return await Category.create(data);
};


// Get All Categories
const getAllCategories = async () => {

    return await Category.findAll({
        attributes: {
            include: [
                [
                    Category.sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM Workshops AS workshop
                        WHERE
                            workshop.categoryId = Category.id
                    )`),
                    "workshopCount"
                ]
            ]
        },
        order: [["createdAt", "DESC"]]
    });
};


// Get Category By ID
const getCategoryById = async (id) => {

    return await Category.findByPk(id);
};


// Delete Category
const deleteCategory = async (id) => {

    // Cascade delete associated workshops
    await Workshop.destroy({
        where: { categoryId: id }
    });

    return await Category.destroy({
        where: { id }
    });
};


module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    deleteCategory
};