import { API_ENDPOINTS, BASE_URL } from '../lib/api-config';
import { AuthService } from './auth.service';

export interface Video {
  id: number;
  title: string;
  description?: string;
  duration?: string;
  thumbnail?: string;
  videoLink: string;
  price?: number;
  createdAt: string;
}

export class VideoService {
  static async getAllVideos(): Promise<Video[]> {
    const res = await fetch(API_ENDPOINTS.GET_ALL_VIDEOS, { cache: 'no-store' });
    const result = await res.json();
    if (!result.success) throw new Error(result.message || 'Failed to fetch videos');
    return result.data;
  }

  static async createVideo(formData: FormData): Promise<Video> {
    const token = AuthService.getToken();
    const res = await fetch(API_ENDPOINTS.CREATE_VIDEO, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const result = await res.json();
    if (!result.success) throw new Error(result.message || 'Failed to create video');
    return result.data;
  }

  static async updateVideo(id: number | string, formData: FormData): Promise<Video> {
    const token = AuthService.getToken();
    const res = await fetch(API_ENDPOINTS.UPDATE_VIDEO(id), {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const result = await res.json();
    if (!result.success) throw new Error(result.message || 'Failed to update video');
    return result.data;
  }

  static async deleteVideo(id: number | string): Promise<void> {
    const token = AuthService.getToken();
    const res = await fetch(API_ENDPOINTS.DELETE_VIDEO(id), {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    if (!result.success) throw new Error(result.message || 'Failed to delete video');
  }

  static getThumbnailUrl(path?: string) {
    if (!path) return null;
    return `${BASE_URL}${path}`;
  }
}
