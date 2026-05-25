const { createPaypalOrderService } = require("./payment.service");

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

module.exports = { createOrder };
