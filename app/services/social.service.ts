import { API_ENDPOINTS } from '../lib/api-config';
import { AuthService } from './auth.service';

export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
}

export class SocialService {
  static async getLinks(): Promise<SocialLinks> {
    const res = await fetch(API_ENDPOINTS.GET_SOCIAL_LINKS, { cache: 'no-store' });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to fetch social links');
    return result.data;
  }

  static async updateLinks(links: Partial<SocialLinks>): Promise<SocialLinks> {
    const token = AuthService.getToken();
    const res = await fetch(API_ENDPOINTS.UPDATE_SOCIAL_LINKS, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(links),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Update failed');
    return result.data;
  }
}
