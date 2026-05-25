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
  getAllUsers: async (): Promise<UserData[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(API_ENDPOINTS.GET_ALL_USERS, {
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch users');
      return result.data;
    } catch (error: any) {
      console.error('UserService getAllUsers Error:', error);
      throw error;
    }
  }
};
