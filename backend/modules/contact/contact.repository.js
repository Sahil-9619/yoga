const { Contact } = require("../../models");
const { Op } = require("sequelize");

// Create Contact
const createContact = async (data) => {
    return await Contact.create(data);
};

// Get All Contacts
const getAllContacts = async (
    page,
    limit,
    search = ''
) => {
    const offset = (page - 1) * limit;
    const where = search ? {
        [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
            { phone: { [Op.like]: `%${search}%` } }
        ]
    } : {};

    return await Contact.findAndCountAll({
        where,
        limit: Number(limit),
        offset: Number(offset),
        order: [["createdAt", "DESC"]]
    });
};


// Get Single Contact
const getContactById = async (id) => {

    return await Contact.findByPk(id);
};


// Delete Contact
const deleteContact = async (id) => {

    return await Contact.destroy({
        where: { id }
    });
};


module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    deleteContact
};