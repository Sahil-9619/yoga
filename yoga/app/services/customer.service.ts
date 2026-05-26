import { BASE_URL } from '../lib/api-config';

export const CustomerService = {
    login: async (credentials: any) => {
        const response = await fetch(`${BASE_URL}/api/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        const result = await response.json();
        if (result.success && result.data) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('customer_user', JSON.stringify(result.data));
                window.dispatchEvent(new Event('loginChange'));
            }
        }
        return result;
    },
    
    register: async (userData: any) => {
        const response = await fetch(`${BASE_URL}/api/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        const result = await response.json();
        if (result.success && result.data) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('customer_user', JSON.stringify(result.data));
                window.dispatchEvent(new Event('loginChange'));
            }
        }
        return result;
    },

    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('customer_user');
            window.dispatchEvent(new Event('loginChange'));
            window.location.href = '/';
        }
    },

    getCurrentUser: () => {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem('customer_user');
            if (!userStr || userStr === 'undefined') return null;
            try {
                return JSON.parse(userStr);
            } catch (e) {
                console.error("Error parsing customer_user from localStorage", e);
                return null;
            }
        }
        return null;
  },

  // Checks if a user is currently logged in (customer)
  isAuthenticated: () => {
    return !!CustomerService.getCurrentUser();
  },


    getMyVideos: async () => {
        const user = CustomerService.getCurrentUser();
        if (!user) return [];
        const response = await fetch(`${BASE_URL}/api/user/my-videos?userId=${user.id}`);
        const result = await response.json();
        return result.success ? result.data : [];
    },

    buyVideo: async (videoId: number) => {
        const user = CustomerService.getCurrentUser();
        if (!user) throw new Error("Must be logged in to purchase");
        
        const response = await fetch(`${BASE_URL}/api/purchase/checkout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id, videoId })
        });
        const result = await response.json();
        if (!response.ok || !result.success) {
            throw new Error(result.message || 'Failed to complete video purchase');
        }
        return result.data;
    },

    checkEmail: async (email: string) => {
        const response = await fetch(`${BASE_URL}/api/user/check-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Failed to check email availability.');
        }
        return result;
    }
};
