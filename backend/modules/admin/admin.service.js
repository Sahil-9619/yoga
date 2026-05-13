const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const repository = require("./admin.repository");

const loginAdmin = async (data) => {

    const { email, password } = data;

    // Validation
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    // Find admin
    const admin = await repository.findAdminByEmail(email);

    if (!admin) {
        throw new Error("Invalid email or password");
    }

    // Compare password
    const isPasswordMatched = await bcrypt.compare(
        password,
        admin.password
    );

    if (!isPasswordMatched) {
        throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
        {
            id: admin.id,
            email: admin.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d"
        }
    );

    return {
        token,
        admin: {
            id: admin.id,
            name: admin.name,
            email: admin.email
        }
    };
};


const updateAdminPassword = async (
    adminId,
    data
) => {

    const { oldPassword, newPassword } = data;

    // Validation
    if (!oldPassword || !newPassword) {
        throw new Error(
            "Old password and new password are required"
        );
    }

    // Find admin
    const admin = await repository.findAdminById(
        adminId
    );

    if (!admin) {
        throw new Error("Admin not found");
    }

    // Check old password
    const isPasswordMatched = await bcrypt.compare(
        oldPassword,
        admin.password
    );

    if (!isPasswordMatched) {
        throw new Error("Old password is incorrect");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
        newPassword,
        10
    );

    // Update password
    await repository.updatePassword(
        adminId,
        hashedPassword
    );

    return {
        message: "Password updated successfully"
    };
};

module.exports = {
    loginAdmin,
    updateAdminPassword
};