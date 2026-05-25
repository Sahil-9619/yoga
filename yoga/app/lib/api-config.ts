export const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/api\/?$/, '');
export const API_BASE_URL = `${BASE_URL}/api`;

export const API_ENDPOINTS = {
  ADMIN_LOGIN: `${API_BASE_URL}/admin/login`,
  ADMIN_PROFILE: `${API_BASE_URL}/admin/profile`,
  UPDATE_PASSWORD: `${API_BASE_URL}/admin/update-password`,
  CONTACT: `${API_BASE_URL}/contact/create`,
  GET_ALL_CONTACTS: `${API_BASE_URL}/contact/all`,
  DELETE_CONTACT: (id: string | number) => `${API_BASE_URL}/contact/${id}`,

  // Categories
  GET_ALL_CATEGORIES: `${API_BASE_URL}/category/all`,
  CREATE_CATEGORY: `${API_BASE_URL}/category/create`,
  DELETE_CATEGORY: (id: string | number) => `${API_BASE_URL}/category/${id}`,

  // Workshops
  GET_ALL_WORKSHOPS: `${API_BASE_URL}/workshop/all`,
  CREATE_WORKSHOP: `${API_BASE_URL}/workshop/create`,
  UPDATE_WORKSHOP: (id: string | number) => `${API_BASE_URL}/workshop/${id}`,
  DELETE_WORKSHOP: (id: string | number) => `${API_BASE_URL}/workshop/${id}`,

  // Bookings
  CREATE_BOOKING: `${API_BASE_URL}/booking/create`,
  SEND_OTP: `${API_BASE_URL}/booking/send-otp`,
  VERIFY_OTP: `${API_BASE_URL}/booking/verify-otp`,
  GET_ALL_BOOKINGS: `${API_BASE_URL}/booking/all`,
  DELETE_BOOKING: (id: string | number) => `${API_BASE_URL}/booking/${id}`,

  // Social Links
  GET_SOCIAL_LINKS: `${API_BASE_URL}/social/all`,
  UPDATE_SOCIAL_LINKS: `${API_BASE_URL}/social/update`,

  // Videos
  GET_ALL_VIDEOS: `${API_BASE_URL}/video/all`,
  CREATE_VIDEO: `${API_BASE_URL}/video/create`,
  UPDATE_VIDEO: (id: string | number) => `${API_BASE_URL}/video/${id}`,
  DELETE_VIDEO: (id: string | number) => `${API_BASE_URL}/video/${id}`,

  // Testimonials
  GET_ALL_TESTIMONIALS: `${API_BASE_URL}/testimonial/all`,
  CREATE_TESTIMONIAL: `${API_BASE_URL}/testimonial/create`,
  UPDATE_TESTIMONIAL: (id: string | number) => `${API_BASE_URL}/testimonial/${id}`,
  DELETE_TESTIMONIAL: (id: string | number) => `${API_BASE_URL}/testimonial/${id}`,
  // Reels
  GET_ALL_REELS: `${API_BASE_URL}/reel/all`,
  CREATE_REEL: `${API_BASE_URL}/reel/create`,
  UPDATE_REEL: (id: string | number) => `${API_BASE_URL}/reel/${id}`,
  DELETE_REEL: (id: string | number) => `${API_BASE_URL}/reel/${id}`,
  // Users
  GET_ALL_USERS: `${API_BASE_URL}/user/all`,
  // Purchases
  GET_ALL_PURCHASES: `${API_BASE_URL}/purchase/all`,
};