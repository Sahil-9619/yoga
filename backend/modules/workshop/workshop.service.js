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
        !photo ||
        !mode ||
        !priceType ||
        !categoryId
    ) {

        throw new Error(
            "All required fields must be filled"
        );
    }

    if (!data.date || data.date === '') {
        data.date = null;
    }

    const decimalFields = ['amount', 'groupPrice', 'personalPrice', 'singleSessionPrice'];
    decimalFields.forEach(field => {
        if (data[field] === '' || data[field] === 'null' || data[field] === 'NaN' || data[field] === undefined) {
            data[field] = null;
        }
    });

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

    if (!data.date || data.date === '') {
        data.date = null;
    }

    const decimalFields = ['amount', 'groupPrice', 'personalPrice', 'singleSessionPrice'];
    decimalFields.forEach(field => {
        if (data[field] === '' || data[field] === 'null' || data[field] === 'NaN' || data[field] === undefined) {
            data[field] = null;
        }
    });

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