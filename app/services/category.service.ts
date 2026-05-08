import { API_ENDPOINTS } from '../lib/api-config';
import { AuthService } from './auth.service';

export class CategoryService {
  static async getAllCategories() {
    try {
      const response = await fetch(API_ENDPOINTS.GET_ALL_CATEGORIES);
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch categories');
      return result.data;
    } catch (error: any) {
      console.error('CategoryService getAllCategories Error:', error);
      throw error;
    }
  }

  static async createCategory(name: string) {
    try {
      const token = AuthService.getToken();
      const response = await fetch(API_ENDPOINTS.CREATE_CATEGORY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to create category');
      return result.data;
    } catch (error: any) {
      console.error('CategoryService createCategory Error:', error);
      throw error;
    }
  }

  static async deleteCategory(id: string | number) {
    try {
      const token = AuthService.getToken();
      const response = await fetch(API_ENDPOINTS.DELETE_CATEGORY(id), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to delete category');
      return result;
    } catch (error: any) {
      console.error('CategoryService deleteCategory Error:', error);
      throw error;
    }
  }
}
