const repository =
    require("./category.repository");


// Create Category
const createCategory = async (data) => {

    const { name } = data;

    if (!name) {
        throw new Error(
            "Category name is required"
        );
    }

    return await repository.createCategory({
        name
    });
};


// Get All Categories
const getAllCategories = async () => {

    return await repository.getAllCategories();
};


// Get Single Category
const getCategoryById = async (id) => {

    const category =
        await repository.getCategoryById(id);

    if (!category) {
        throw new Error(
            "Category not found"
        );
    }

    return category;
};


// Delete Category
const deleteCategory = async (id) => {

    const category =
        await repository.getCategoryById(id);

    if (!category) {
        throw new Error(
            "Category not found"
        );
    }

    await repository.deleteCategory(id);

    return {
        message:
            "Category deleted successfully"
    };
};


module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    deleteCategory
};