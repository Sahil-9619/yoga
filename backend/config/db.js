require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",

        logging: false,

        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("MySQL Connected Successfully");

        // Sync all models — creates tables if they don't exist
        const db = require('../models');
        await db.sequelize.sync({ alter: true });
        console.log("Database synced successfully");

        // Auto-seed default admin if no admin exists
        const bcrypt = require('bcrypt');
        const adminCount = await db.Admin.count();
        if (adminCount === 0) {
            const hashedPassword = await bcrypt.hash('admin@yogausa2026', 10);
            await db.Admin.create({
                name: 'Super Admin',
                email: 'admin@yoga.in',
                password: hashedPassword
            });
            console.log("Default Admin created!");
        }

    } catch (error) {
        console.error("Database Connection Failed:", error.message);
        process.exit(1);
    }
};

module.exports = {
    sequelize,
    connectDB
};