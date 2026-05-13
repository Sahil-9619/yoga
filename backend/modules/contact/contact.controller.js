const service = require("./contact.service");


// Create Contact
const create = async (req, res) => {

    try {

        await service.submitContact(
            req.body
        );

        return res.status(201).json({
            success: true,
            message:
                "Contact form submitted successfully"
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Get All Contacts
const getAll = async (req, res) => {

    try {

        const data =
            await service.getAllContacts(
                req.query
            );

        return res.status(200).json({
            success: true,
            total: data.total,
            currentPage: data.currentPage,
            totalPages: data.totalPages,
            data: data.contacts
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Contact
const getOne = async (req, res) => {

    try {

        const contact =
            await service.getContactById(
                req.params.id
            );

        return res.status(200).json({
            success: true,
            data: contact
        });

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


// Delete Contact
const remove = async (req, res) => {

    try {

        const data =
            await service.deleteContact(
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