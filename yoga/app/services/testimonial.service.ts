import { API_ENDPOINTS } from '../lib/api-config';
import { AuthService } from './auth.service';

export const TestimonialService = {
  getAllTestimonials: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_ALL_TESTIMONIALS, {
        cache: 'no-store'
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch testimonials');
      return result.data;
    } catch (error: any) {
      console.error('TestimonialService getAllTestimonials Error:', error);
      throw error;
    }
  },

  createTestimonial: async (data: { text?: string; name: string; location: string; type: string; } | FormData) => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const isFormData = data instanceof FormData;

      const response = await fetch(API_ENDPOINTS.CREATE_TESTIMONIAL, {
        method: 'POST',
        headers: {
          ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
          'Authorization': `Bearer ${token}`,
        },
        body: isFormData ? data : JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to create testimonial');
      return result.data;
    } catch (error: any) {
      console.error('TestimonialService createTestimonial Error:', error);
      throw error;
    }
  },

  updateTestimonial: async (id: number | string, data: { text?: string; name: string; location: string; type: string; } | FormData) => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const isFormData = data instanceof FormData;

      const response = await fetch(API_ENDPOINTS.UPDATE_TESTIMONIAL(id), {
        method: 'PUT',
        headers: {
          ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
          'Authorization': `Bearer ${token}`,
        },
        body: isFormData ? data : JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to update testimonial');
      return result;
    } catch (error: any) {
      console.error('TestimonialService updateTestimonial Error:', error);
      throw error;
    }
  },

  deleteTestimonial: async (id: number | string) => {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(API_ENDPOINTS.DELETE_TESTIMONIAL(id), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to delete testimonial');
      return result;
    } catch (error: any) {
      console.error('TestimonialService deleteTestimonial Error:', error);
      throw error;
    }
  },
};
