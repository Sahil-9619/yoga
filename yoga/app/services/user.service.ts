import { API_ENDPOINTS } from '../lib/api-config';
import { AuthService } from './auth.service';

export interface UserData {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  purchases?: any[];
}

export const UserService = {
  getAllUsers: async (page = 1, limit = 10, search = ''): Promise<{ data: UserData[]; totalItems: number; totalPages: number; currentPage: number }> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${API_ENDPOINTS.GET_ALL_USERS}?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`, {
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch users');
      return result;
    } catch (error: any) {
      console.error('UserService getAllUsers Error:', error);
      throw error;
    }
  },

  deleteUser: async (id: number | string): Promise<any> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(API_ENDPOINTS.DELETE_USER(id), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to delete user');
      return result;
    } catch (error: any) {
      console.error('UserService deleteUser Error:', error);
      throw error;
    }
  }
};
