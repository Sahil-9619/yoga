import { API_ENDPOINTS, BASE_URL } from '../lib/api-config';
import { AuthService } from './auth.service';

export interface Reel {
  id: number;
  title: string;
  description?: string;
  duration?: string;
  thumbnail?: string;
  videoLink: string;
  createdAt?: string;
}

export const ReelService = {
  getAllReels: async (): Promise<Reel[]> => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_ALL_REELS, {
        cache: 'no-store'
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch reels');
      return result.data;
    } catch (error: any) {
      console.error('ReelService getAllReels Error:', error);
      throw error;
    }
  },

  createReel: async (data: any | FormData) => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const isFormData = data instanceof FormData;

      const response = await fetch(API_ENDPOINTS.CREATE_REEL, {
        method: 'POST',
        headers: {
          ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
          'Authorization': `Bearer ${token}`,
        },
        body: isFormData ? data : JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to create reel');
      return result.data;
    } catch (error: any) {
      console.error('ReelService createReel Error:', error);
      throw error;
    }
  },

  updateReel: async (id: number | string, data: any | FormData) => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const isFormData = data instanceof FormData;

      const response = await fetch(API_ENDPOINTS.UPDATE_REEL(id), {
        method: 'PUT',
        headers: {
          ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
          'Authorization': `Bearer ${token}`,
        },
        body: isFormData ? data : JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to update reel');
      return result;
    } catch (error: any) {
      console.error('ReelService updateReel Error:', error);
      throw error;
    }
  },

  deleteReel: async (id: number | string) => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(API_ENDPOINTS.DELETE_REEL(id), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to delete reel');
      return result;
    } catch (error: any) {
      console.error('ReelService deleteReel Error:', error);
      throw error;
    }
  },

  getThumbnailUrl: (path?: string) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${BASE_URL}${path}`;
  }
};
