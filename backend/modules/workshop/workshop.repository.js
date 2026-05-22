const {
    Workshop,
    Category,
    Booking
} = require("../../models");

// Create Workshop
const createWorkshop = async (data) => {

    return await Workshop.create(data);
};


// Get All Workshops
const getAllWorkshops = async () => {

    return await Workshop.findAll({
        include: [
            {
                model: Category,
                attributes: ["id", "name"]
            }
        ],

        order: [["createdAt", "DESC"]]
    });
};


// Get Workshop By ID
const getWorkshopById = async (id) => {

    return await Workshop.findByPk(id, {
        include: [
            {
                model: Category,
                attributes: ["id", "name"]
            }
        ]
    });
};


// Update Workshop
const updateWorkshop = async (
    id,
    data
) => {

    return await Workshop.update(
        data,
        {
            where: { id }
        }
    );
};


// Delete Workshop
const deleteWorkshop = async (id) => {

    return await Workshop.destroy({
        where: { id }
    });
};


module.exports = {
    createWorkshop,
    getAllWorkshops,
    getWorkshopById,
    updateWorkshop,
    deleteWorkshop
};