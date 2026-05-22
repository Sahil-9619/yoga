import { API_ENDPOINTS } from '../lib/api-config';
import { AuthService } from './auth.service';

export class BookingService {
  static async createBooking(data: {
    name: string;
    email: string;
    phone: string;
    workshopId: number | string;
    workshopTitle?: string;
    categoryName?: string;
    amount?: number | string;
    priceType?: string;
  }) {
    const response = await fetch(API_ENDPOINTS.CREATE_BOOKING, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Booking failed');
    return result;
  }

  static async sendOtp(email: string) {
    const response = await fetch(API_ENDPOINTS.SEND_OTP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to send OTP');
    return result;
  }

  static async verifyOtp(email: string, otp: string) {
    const response = await fetch(API_ENDPOINTS.VERIFY_OTP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Invalid OTP');
    return result;
  }

  static async getAllBookings() {
    const token = AuthService.getToken();
    const response = await fetch(API_ENDPOINTS.GET_ALL_BOOKINGS, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch bookings');
    return result.data;
  }

  static async deleteBooking(id: string | number) {
    const token = AuthService.getToken();
    const response = await fetch(API_ENDPOINTS.DELETE_BOOKING(id), {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Delete failed');
    return result;
  }
}
