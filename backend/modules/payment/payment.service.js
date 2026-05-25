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
                        currency_code: "USD",
                        value: amount,
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

module.exports = { createPaypalOrderService };
