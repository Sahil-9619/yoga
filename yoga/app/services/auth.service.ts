import { API_ENDPOINTS } from '../lib/api-config';

export class AuthService {
  static async login(email: string, password: string) {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.token) {
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.admin || data.user));
      }

      return data;
    } catch (error: any) {
      console.error('AuthService Login Error:', error);
      if (error.message === 'Failed to fetch') {
        throw new Error('Something went wrong. Please check your connection.');
      }
      throw error;
    }
  }

  static logout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.location.href = '/admin/login';
  }

  static getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_token');
    }
    return null;
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static getUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('admin_user');
      if (!user || user === 'undefined') return null;
      try {
        return JSON.parse(user);
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
        return null;
      }
    }
    return null;
  }

  static async updatePassword(
  oldPassword: string,
  newPassword: string
) {
  try {

    const token = this.getToken();

    const response = await fetch(
      API_ENDPOINTS.UPDATE_PASSWORD,
      {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || 'Password update failed'
      );
    }

    return data;

    } catch (error: any) {
      console.error('Update Password Error:', error);
      if (error.message === 'Failed to fetch') {
        throw new Error('Something went wrong. Please check your connection.');
      }
      throw error;
    }
}
}