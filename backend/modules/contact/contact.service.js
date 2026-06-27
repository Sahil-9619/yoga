const repository = require("./contact.repository");


// Submit Contact Form
const submitContact = async (data) => {

    const { name, phone, email, message } = data;

    if (!name || !email || !message) {
        throw new Error("All fields are required");
    }

    return await repository.createContact({
        name,
        phone: phone || "",
        email,
        message
    });
};


// Get All Contacts
const getAllContacts = async (
    query
) => {

    const page =
        parseInt(query.page) || 1;

    const limit =
        parseInt(query.limit) || 10;

    const data =
        await repository.getAllContacts(
            page,
            limit,
            query.search || ''
        );

    return {
        contacts: data.rows,

        total: data.count,

        currentPage: page,

        totalPages: Math.ceil(
            data.count / limit
        )
    };
};

// Get Single Contact
const getContactById = async (id) => {

    const contact =
        await repository.getContactById(id);

    if (!contact) {
        throw new Error("Contact not found");
    }

    return contact;
};


// Delete Contact
const deleteContact = async (id) => {

    const contact =
        await repository.getContactById(id);

    if (!contact) {
        throw new Error("Contact not found");
    }

    await repository.deleteContact(id);

    return {
        message:
            "Contact deleted successfully"
    };
};


module.exports = {
    submitContact,
    getAllContacts,
    getContactById,
    deleteContact
};