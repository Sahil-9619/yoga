import { API_ENDPOINTS } from '../lib/api-config';

export class PaymentService {
  static async createPaypalOrder(amount: number | string) {
    const response = await fetch(API_ENDPOINTS.CREATE_PAYPAL_ORDER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to create PayPal order');

    return result.orderId;
  }

  static async capturePaypalOrder(orderId: string) {
    const response = await fetch(API_ENDPOINTS.CAPTURE_PAYPAL_ORDER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to capture PayPal payment');

    return result.data;
  }
}
