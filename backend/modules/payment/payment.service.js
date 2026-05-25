const paypal = require("@paypal/checkout-server-sdk");
const client = require("../../config/paypal");

const createPaypalOrderService = async (amount) => {
    try {
        const request = new paypal.orders.OrdersCreateRequest();

        request.prefer("return=representation");

        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: process.env.PAYPAL_CURRENCY || "USD",
                        value: parseFloat(amount).toFixed(2),
                    },
                },
            ],
        });

        const order = await client.execute(request);

        return order.result.id;
    } catch (error) {
        console.error("PayPal Create Order Error:", error);
        throw error;
    }
};

const capturePaypalOrderService = async (orderId) => {
    try {
        const request = new paypal.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});

        const response = await client.execute(request);

        return response.result;
    } catch (error) {
        console.error("PayPal Capture Order Error:", error);
        throw error;
    }
};

module.exports = { createPaypalOrderService, capturePaypalOrderService };
