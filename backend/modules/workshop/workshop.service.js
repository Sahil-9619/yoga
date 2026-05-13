const repository =
    require("./workshop.repository");


// Create Workshop
const createWorkshop = async (data) => {

    const {
        title,
        description,
        photo,
        date,
        time,
        mode,
        priceType,
        categoryId
    } = data;

    if (
        !title ||
        !description ||
        !photo ||
        !date ||
        !time ||
        !mode ||
        !priceType ||
        !categoryId
    ) {

        throw new Error(
            "All required fields must be filled"
        );
    }

    return await repository.createWorkshop(
        data
    );
};


// Get All Workshops
const getAllWorkshops = async () => {

    return await repository.getAllWorkshops();
};


// Get Single Workshop
const getWorkshopById = async (id) => {

    const workshop =
        await repository.getWorkshopById(id);

    if (!workshop) {
        throw new Error(
            "Workshop not found"
        );
    }

    return workshop;
};


// Update Workshop
const updateWorkshop = async (
    id,
    data
) => {

    const workshop =
        await repository.getWorkshopById(id);

    if (!workshop) {
        throw new Error(
            "Workshop not found"
        );
    }

    await repository.updateWorkshop(
        id,
        data
    );

    return {
        message:
            "Workshop updated successfully"
    };
};


// Delete Workshop
const deleteWorkshop = async (id) => {

    const workshop =
        await repository.getWorkshopById(id);

    if (!workshop) {
        throw new Error(
            "Workshop not found"
        );
    }

    await repository.deleteWorkshop(id);

    return {
        message:
            "Workshop deleted successfully"
    };
};


module.exports = {
    createWorkshop,
    getAllWorkshops,
    getWorkshopById,
    updateWorkshop,
    deleteWorkshop
};