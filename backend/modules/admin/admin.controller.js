const service = require("./admin.service");

const login = async (req, res) => {

    try {

        const data = await service.loginAdmin(req.body);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: data.token,
            admin: data.admin
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updatePassword = async (
    req,
    res
) => {

    try {

        const data =
            await service.updateAdminPassword(
                req.user.id,
                req.body
            );

        return res.status(200).json({
            success: true,
            message: data.message
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    login,
    updatePassword
};