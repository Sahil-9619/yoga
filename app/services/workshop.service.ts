import { API_ENDPOINTS } from '../lib/api-config';
import { AuthService } from './auth.service';

export interface WorkshopData {
  title: string;
  description: string;
  photo: string;
  date: string;
  time: string;
  mode: 'online' | 'offline';
  location?: string;
  platform?: string;
  priceType: 'free' | 'paid';
  amount?: number;
  categoryId: number | string;
}

export class WorkshopService {
  static async getAllWorkshops() {
    try {
      const response = await fetch(API_ENDPOINTS.GET_ALL_WORKSHOPS);
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch workshops');
      return result.data;
    } catch (error: any) {
      console.error('WorkshopService getAllWorkshops Error:', error);
      throw error;
    }
  }

  static async createWorkshop(data: WorkshopData | FormData) {
    try {
      const token = AuthService.getToken();
      const isFormData = data instanceof FormData;
      
      const response = await fetch(API_ENDPOINTS.CREATE_WORKSHOP, {
        method: 'POST',
        headers: {
          ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
          'Authorization': `Bearer ${token}`,
        },
        body: isFormData ? data : JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to create workshop');
      return result.data;
    } catch (error: any) {
      console.error('WorkshopService createWorkshop Error:', error);
      throw error;
    }
  }

  static async updateWorkshop(id: string | number, data: Partial<WorkshopData> | FormData) {
    try {
      const token = AuthService.getToken();
      const isFormData = data instanceof FormData;

      const response = await fetch(API_ENDPOINTS.UPDATE_WORKSHOP(id), {
        method: 'PUT',
        headers: {
          ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
          'Authorization': `Bearer ${token}`,
        },
        body: isFormData ? data : JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to update workshop');
      return result;
    } catch (error: any) {
      console.error('WorkshopService updateWorkshop Error:', error);
      throw error;
    }
  }

  static async deleteWorkshop(id: string | number) {
    try {
      const token = AuthService.getToken();
      const response = await fetch(API_ENDPOINTS.DELETE_WORKSHOP(id), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to delete workshop');
      return result;
    } catch (error: any) {
      console.error('WorkshopService deleteWorkshop Error:', error);
      throw error;
    }
  }
}
