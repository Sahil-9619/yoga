const { createPaypalOrderService, capturePaypalOrderService } = require("./payment.service");

const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({
                success: false,
                message: "Amount is required",
            });
        }

        const orderId = await createPaypalOrderService(amount);

        return res.status(200).json({
            success: true,
            orderId,
        });
    } catch (error) {
        console.error("Create Order Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create PayPal order",
        });
    }
};

const captureOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "orderId is required",
            });
        }

        const captureResult = await capturePaypalOrderService(orderId);

        if (captureResult.status === "COMPLETED") {
            return res.status(200).json({
                success: true,
                message: "Payment captured successfully",
                data: captureResult,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: `Payment status is ${captureResult.status}`,
                data: captureResult,
            });
        }
    } catch (error) {
        console.error("Capture Order Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to capture PayPal order: " + error.message,
        });
    }
};

module.exports = { createOrder, captureOrder };
