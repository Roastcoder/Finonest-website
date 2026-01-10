// API Service for connecting to external Node.js backend
// Check environment file
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Auth types
export interface User {
  id: string;
  email: string;
  fullName?: string;
  role?: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    token: string;
    user: User;
  };
  message?: string;
}

// Application types
export interface LoanApplication {
  id: string;
  loan_type: string;
  amount: number;
  status: string;
  full_name: string;
  email: string;
  phone: string;
  employment_type: string | null;
  monthly_income: number | null;
  notes: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
}

// Get auth token from localStorage
const getToken = (): string | null => localStorage.getItem("token");

// Set auth token
export const setToken = (token: string): void => localStorage.setItem("token", token);

// Remove auth token
export const removeToken = (): void => localStorage.removeItem("token");

// Check if user is logged in
export const isAuthenticated = (): boolean => !!getToken();

// Get current user from token
export const getCurrentUser = (): User | null => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.userId || payload.id,
      email: payload.email,
      fullName: payload.fullName,
      role: payload.role, // Include role from JWT
    };
  } catch {
    removeToken();
    return null;
  }
};

// API request helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    throw new Error(`Expected JSON but received: ${text.substring(0, 100)}...`);
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return data;
}

// Admin Auth API (email/password)
export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiRequest<{ status: string; data: { accessToken: string; user: any } }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    
    if (response.status === 'ok' && response.data?.accessToken) {
      setToken(response.data.accessToken);
      return {
        success: true,
        data: {
          token: response.data.accessToken,
          user: response.data.user
        }
      };
    }
    
    return {
      success: false,
      message: 'Login failed'
    };
  },

  logout: async (): Promise<void> => {
    try {
      await apiRequest('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      // ignore server errors, proceed to clear local token
    }
    removeToken();
  },

  refresh: async (): Promise<{ status: string; data: { accessToken: string } }> => {
    return apiRequest('/api/auth/refresh', { method: 'POST' });
  },

  me: async () => {
    return apiRequest<{ status: string; data: any }>('/api/auth/me');
  },
};

// Customer Auth API (OTP-based)
export const customerAuthAPI = {
  sendOTP: async (phone: string): Promise<{ status: string; message: string; expiresIn: number }> => {
    return apiRequest('/api/customer/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  },

  verifyOTP: async (phone: string, otp: string): Promise<{ status: string; data: { customer: any; accessToken: string } }> => {
    const response = await apiRequest<{ status: string; data: { customer: any; accessToken: string } }>('/api/customer/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, otp }),
    });
    if (response.data?.accessToken) {
      setToken(response.data.accessToken);
    }
    return response;
  },

  refresh: async (): Promise<{ status: string; data: { accessToken: string } }> => {
    return apiRequest('/api/customer/auth/refresh', { method: 'POST' });
  },

  logout: async (): Promise<void> => {
    try {
      await apiRequest('/api/customer/auth/logout', { method: 'POST' });
    } catch (e) {
      // ignore server errors
    }
    removeToken();
  },

  me: async () => {
    return apiRequest<{ status: string; data: any }>('/api/customer/auth/me');
  },
};

// Customer API (protected)
export const customerAPI = {
  // Profile
  getProfile: async () => apiRequest<{ status: string; data: any }>('/api/customer/profile'),
  updateProfile: async (data: Record<string, unknown>) => apiRequest('/api/customer/profile', { method: 'PATCH', body: JSON.stringify(data) }),

  // Dashboard
  getDashboard: async () => apiRequest<{ status: string; data: any }>('/api/customer/dashboard'),

  // Applications
  getApplications: async (params?: { page?: number; limit?: number; status?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.status) query.append('status', params.status);
    const queryStr = query.toString() ? `?${query.toString()}` : '';
    return apiRequest<{ status: string; data: any }>(`/api/customer/applications${queryStr}`);
  },
  getApplication: async (id: string) => apiRequest<{ status: string; data: any }>(`/api/customer/applications/${id}`),
};

// Applications API
export const applicationsAPI = {
  submit: async (data: {
    loanType: string;
    amount: number;
    fullName: string;
    email: string;
    phone: string;
    employmentType?: string;
    monthlyIncome?: number;
    notes?: string;
  }) => {
    return apiRequest<{ status: string; data: { applicationId: string } }>(
      "/api/customer/applications",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },

  getAll: async () => {
    return apiRequest<{ success: boolean; data: LoanApplication[] }>(
      "/api/v1/admin/applications"
    );
  },

  updateStatus: async (id: string, status: string) => {
    return apiRequest<{ success: boolean }>(
      `/api/v1/admin/applications/${id}/status`,
      {
        method: "PUT",
        body: JSON.stringify({ status }),
      }
    );
  },
};

// Profile API
export const profileAPI = {
  get: async () => {
    return apiRequest<{ success: boolean; data: Profile }>("/api/v1/profile");
  },

  update: async (data: Partial<Profile>) => {
    return apiRequest<{ success: boolean }>("/api/v1/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};

// Contact API
export const contactAPI = {
  submit: async (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    return apiRequest<{ success: boolean }>("/api/v1/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// Admin API
export const adminAPI = {
  checkRole: async (): Promise<boolean> => {
    try {
      const response = await apiRequest<{ status: string; data: { isAdmin: boolean } }>(
        "/api/admin/check-role"
      );
      return response.data?.isAdmin || false;
    } catch {
      return false;
    }
  },

  getStats: async () => {
    return apiRequest<{
      success: boolean;
      data: {
        totalApplications: number;
        pendingApplications: number;
        approvedApplications: number;
        rejectedApplications: number;
      };
    }>("/api/v1/admin/stats");
  },
};

// Public CMS API (no auth required)
export const publicCMSAPI = {
  // Pages
  getPageBySlug: async (slug: string, preview?: boolean) => {
    const query = preview ? '?preview=true' : '';
    return apiRequest<{ status: string; data: any }>(`/api/pages/${slug}${query}`);
  },
  listPages: async () => apiRequest<{ status: string; data: any }>('/api/pages'),

  // Services
  getServiceBySlug: async (slug: string, preview?: boolean) => {
    const query = preview ? '?preview=true' : '';
    return apiRequest<{ status: string; data: any }>(`/api/services/${slug}${query}`);
  },
  listServices: async (params?: { page?: number; limit?: number; featured?: boolean; q?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.featured) query.append('featured', 'true');
    if (params?.q) query.append('q', params.q);
    const queryStr = query.toString() ? `?${query.toString()}` : '';
    return apiRequest<{ status: string; data: any }>(`/api/services${queryStr}`);
  },

  // Blog
  getPostBySlug: async (slug: string, preview?: boolean) => {
    const query = preview ? '?preview=true' : '';
    return apiRequest<{ status: string; data: any }>(`/api/blog/${slug}${query}`);
  },
  listPosts: async (params?: { page?: number; limit?: number; category?: string; tag?: string; q?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.category) query.append('category', params.category);
    if (params?.tag) query.append('tag', params.tag);
    if (params?.q) query.append('q', params.q);
    const queryStr = query.toString() ? `?${query.toString()}` : '';
    return apiRequest<{ status: string; data: any }>(`/api/blog${queryStr}`);
  },

  // Categories & Tags
  listCategories: async () => apiRequest<{ status: string; data: any }>('/api/categories'),
  listTags: async () => apiRequest<{ status: string; data: any }>('/api/tags'),

  // Testimonials
  listTestimonials: async (params?: { limit?: number; featured?: boolean }) => {
    const query = new URLSearchParams();
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.featured) query.append('featured', 'true');
    const queryStr = query.toString() ? `?${query.toString()}` : '';
    return apiRequest<{ status: string; data: any }>(`/api/testimonials${queryStr}`);
  },
  getTestimonial: async (id: string) => apiRequest<{ status: string; data: any }>(`/api/testimonials/${id}`),

  // Partners
  listPartners: async (featured?: boolean) => {
    const query = featured ? '?featured=true' : '';
    return apiRequest<{ status: string; data: any }>(`/api/partners${query}`);
  },
  getPartnerBySlug: async (slug: string) => apiRequest<{ status: string; data: any }>(`/api/partners/${slug}`),

  // Banners
  listBanners: async () => apiRequest<{ status: string; data: any }>('/api/banners'),

  // Site Settings
  getSiteSettings: async () => apiRequest<{ status: string; data: any }>('/api/settings'),

  // Media
  listMedia: async () => apiRequest<{ status: string; data: any }>('/api/media'),
  getMediaById: async (id: string) => apiRequest<{ status: string; data: any }>(`/api/media/${id}`),

  // FAQ
  listFAQs: async (params?: { category?: string; serviceRef?: string }) => {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.serviceRef) query.append('serviceRef', params.serviceRef);
    const queryStr = query.toString() ? `?${queryStr}` : '';
    return apiRequest<{ status: string; data: any }>(`/api/faqs${queryStr}`);
  },
  getFAQ: async (id: string) => apiRequest<{ status: string; data: any }>(`/api/faqs/${id}`),

  // Stats
  listStats: async () => apiRequest<{ status: string; data: any }>('/api/stats'),

  // Process Steps
  listProcessSteps: async () => apiRequest<{ status: string; data: any }>('/api/process-steps'),

  // Navigation
  listNavItems: async (position?: 'header' | 'footer') => {
    const query = position ? `?position=${position}` : '';
    return apiRequest<{ status: string; data: any }>(`/api/nav-items${query}`);
  },

  // Footer
  getFooter: async () => apiRequest<{ status: string; data: any }>('/api/footer'),

  // EMI Calculator
  calculateEMI: async (data: { principal: number; rate: number; tenureMonths: number }) => {
    return apiRequest<{ status: string; data: { monthlyPayment: number; totalAmount: number; totalInterest: number; schedule: any[] } }>('/api/emi/calculate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // WhyUs Features
  listWhyUsFeatures: async () => apiRequest<{ status: string; data: any }>('/api/why-us-features'),
};

// CMS API (Pages, Services, Blog, Media, Forms) - Admin only
export const cmsAPI = {
  // Pages
  getPagesAdmin: async () => apiRequest('/api/admin/pages'),
  listPagesAdmin: async () => apiRequest('/api/admin/pages'),
  getPageAdmin: async (id: string) => apiRequest(`/api/admin/pages/${id}`),
  createPageAdmin: async (payload: Record<string, unknown>) => apiRequest('/api/admin/pages', { method: 'POST', body: JSON.stringify(payload) }),
  updatePageAdmin: async (id: string, payload: Record<string, unknown>) => apiRequest(`/api/admin/pages/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  deletePageAdmin: async (id: string) => apiRequest(`/api/admin/pages/${id}`, { method: 'DELETE' }),
  publishPageAdmin: async (id: string) => apiRequest(`/api/admin/pages/${id}/publish`, { method: 'POST' }),
  schedulePageAdmin: async (id: string, publishedAt: string) => apiRequest(`/api/admin/pages/${id}/schedule`, { method: 'POST', body: JSON.stringify({ publishedAt }) }),

  // Services
  listServicesAdmin: async () => apiRequest('/api/admin/services'),
  getServiceAdmin: async (id: string) => apiRequest(`/api/admin/services/${id}`),
  createServiceAdmin: async (payload: Record<string, unknown>) => apiRequest('/api/admin/services', { method: 'POST', body: JSON.stringify(payload) }),
  updateServiceAdmin: async (id: string, payload: Record<string, unknown>) => apiRequest(`/api/admin/services/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  deleteServiceAdmin: async (id: string) => apiRequest(`/api/admin/services/${id}`, { method: 'DELETE' }),

  // Blog
  listPostsAdmin: async () => apiRequest('/api/admin/blogposts'),
  getPostAdmin: async (id: string) => apiRequest(`/api/admin/blogposts/${id}`),
  createPostAdmin: async (payload: Record<string, unknown>) => apiRequest('/api/admin/blogposts', { method: 'POST', body: JSON.stringify(payload) }),
  updatePostAdmin: async (id: string, payload: Record<string, unknown>) => apiRequest(`/api/admin/blogposts/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  publishPostAdmin: async (id: string) => apiRequest(`/api/admin/blogposts/${id}/publish`, { method: 'POST' }),
  schedulePostAdmin: async (id: string, publishedAt: string) => apiRequest(`/api/admin/blogposts/${id}/schedule`, { method: 'POST', body: JSON.stringify({ publishedAt }) }),
  deletePostAdmin: async (id: string) => apiRequest(`/api/admin/blogposts/${id}`, { method: 'DELETE' }),

  // Media: upload uses multipart; listing
  listMediaPublic: async () => apiRequest('/api/media'),
  listMediaAdmin: async () => apiRequest('/api/admin/media'),
  uploadMediaAdmin: async (file: File) => {
    const token = getToken();
    const form = new FormData();
    form.append('file', file);

    const headers: HeadersInit = {
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const res = await fetch(`${API_URL}/api/media/upload`, {
      method: 'POST',
      body: form,
      headers,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Upload failed');
    return data;
  },

  // Forms
  listFormsAdmin: async () => apiRequest('/api/admin/forms'),
  getFormAdmin: async (id: string) => apiRequest(`/api/admin/forms/${id}`),
  createFormAdmin: async (payload: Record<string, unknown>) => apiRequest('/api/admin/forms', { method: 'POST', body: JSON.stringify(payload) }),
  updateFormAdmin: async (id: string, payload: Record<string, unknown>) => apiRequest(`/api/admin/forms/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),

  // Users & Roles
  listUsersAdmin: async () => apiRequest('/api/admin/users'),
  getUserAdmin: async (id: string) => apiRequest(`/api/admin/users/${id}`),
  createUserAdmin: async (payload: Record<string, unknown>) => apiRequest('/api/admin/users', { method: 'POST', body: JSON.stringify(payload) }),
  updateUserAdmin: async (id: string, payload: Record<string, unknown>) => apiRequest(`/api/admin/users/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  deleteUserAdmin: async (id: string) => apiRequest(`/api/admin/users/${id}`, { method: 'DELETE' }),

  // Leads
  listLeadsAdmin: async () => apiRequest('/api/admin/leads'),
  getLeadAdmin: async (id: string) => apiRequest(`/api/admin/leads/${id}`),
  updateLeadAdmin: async (id: string, payload: Record<string, unknown>) => apiRequest(`/api/admin/leads/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  exportLeadsCSVAdmin: async () => apiRequest('/api/admin/leads/export/csv'),

  // Site Settings
  getSiteSettingsAdmin: async () => apiRequest('/api/admin/settings'),
  updateSiteSettingsAdmin: async (payload: Record<string, unknown>) => apiRequest('/api/admin/settings', { method: 'PATCH', body: JSON.stringify(payload) }),
};

export default {
  auth: authAPI,
  customerAuth: customerAuthAPI,
  customer: customerAPI,
  applications: applicationsAPI,
  profile: profileAPI,
  contact: contactAPI,
  admin: adminAPI,
  cms: cmsAPI,
  publicCMS: publicCMSAPI,
};
