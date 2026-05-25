const paypal = require("@paypal/checkout-server-sdk");

function environment() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_SECRET_KEY;

    if (process.env.PAYPAL_ENV === "live") {
        return new paypal.core.LiveEnvironment(
            clientId,
            clientSecret
        );
    }

    return new paypal.core.SandboxEnvironment(
        clientId,
        clientSecret
    );
}

const client = new paypal.core.PayPalHttpClient(
    environment()
);

module.exports = client;