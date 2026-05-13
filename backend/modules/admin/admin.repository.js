const { Admin } = require("../../models");

const findAdminByEmail = async (email) => {
    return await Admin.findOne({
        where: { email }
    });
};



const updatePassword = async (id, password) => {

    return await Admin.update(
        { password },
        {
            where: { id }
        }
    );
};

const findAdminById = async (id) => {

    return await Admin.findByPk(id);
};

module.exports = {
    findAdminByEmail,
    updatePassword,
    findAdminById
};
