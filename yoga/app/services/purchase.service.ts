import { API_ENDPOINTS } from '../lib/api-config';
import { AuthService } from './auth.service';

export interface PurchaseData {
  id: number;
  userId: number;
  videoId: number;
  amount: number;
  status: string;
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
  video?: {
    title: string;
    price: number;
  };
}

export const PurchaseService = {
  getAllPurchases: async (): Promise<PurchaseData[]> => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(API_ENDPOINTS.GET_ALL_PURCHASES, {
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch purchases');
      return result.data;
    } catch (error: any) {
      console.error('PurchaseService getAllPurchases Error:', error);
      throw error;
    }
  }
};
