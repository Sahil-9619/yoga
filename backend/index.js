require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { connectDB } = require("./config/db");

const app = express();


// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const adminRoutes   = require("./modules/admin/admin.routes");
const contactRoutes = require("./modules/contact/contact.routes");
const categoryRoutes = require("./modules/category/category.routes");
const workshopRoutes = require("./modules/workshop/workshop.routes");
const bookingRoutes  = require("./modules/booking/booking.routes");
const socialRoutes   = require("./modules/social/social.routes");
const videoRoutes    = require("./modules/video/video.routes");

// Routes
app.use("/api/admin",    adminRoutes);
app.use("/api/contact",  contactRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/workshop", workshopRoutes);
app.use("/api/booking",  bookingRoutes);
app.use("/api/social",   socialRoutes);
app.use("/api/video",    videoRoutes);


app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Backend Running Successfully"
    });
});


const PORT = process.env.PORT || 5000;


// Start Server
const startServer = async () => {

    try {

        await connectDB();

        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        server.on('error', (error) => {
            console.error("Server Error:", error.message);
        });

    } catch (error) {

        console.error("Server Failed:", error.message);

        process.exit(1);
    }
};

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('exit', (code) => {
    console.log(`Process exited with code: ${code}`);
});

startServer();