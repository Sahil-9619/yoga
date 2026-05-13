import { API_ENDPOINTS } from '../lib/api-config';
import { AuthService } from './auth.service';

export class ContactService {
  static async getAllContacts(page: number = 1, limit: number = 10, search: string = '') {
    try {
      const token = AuthService.getToken();
      const response = await fetch(`${API_ENDPOINTS.GET_ALL_CONTACTS}?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch contacts');
      }

      return result;
    } catch (error: any) {
      console.error('ContactService getAllContacts Error:', error);
      if (error.message === 'Failed to fetch') {
        throw new Error('Something went wrong. Please try again later.');
      }
      throw error;
    }
  }

  static async deleteContact(id: string | number) {
    try {
      const token = AuthService.getToken();
      const response = await fetch(API_ENDPOINTS.DELETE_CONTACT(id), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete contact');
      }

      return result;
    } catch (error: any) {
      console.error('ContactService deleteContact Error:', error);
      if (error.message === 'Failed to fetch') {
        throw new Error('Something went wrong. Please try again later.');
      }
      throw error;
    }
  }

  static async sendMessage(data: { name: string; phone: string; email: string; message: string }) {
    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message');
      }

      return result;
    } catch (error: any) {
      console.error('ContactService sendMessage Error:', error);
      if (error.message === 'Failed to fetch') {
        throw new Error('Something went wrong. Please try again later.');
      }
      throw error;
    }
  }
}
