// API Service for connecting to external Node.js backend
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Auth types
export interface User {
  id: string;
  email: string;
  fullName?: string;
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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (response.data?.token) {
      setToken(response.data.token);
    }
    return response;
  },

  register: async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
    const response = await apiRequest<AuthResponse>("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, fullName }),
    });
    if (response.data?.token) {
      setToken(response.data.token);
    }
    return response;
  },

  logout: (): void => {
    removeToken();
  },
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
    return apiRequest<{ success: boolean; data: { applicationId: string } }>(
      "/api/v1/applications",
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
      const response = await apiRequest<{ success: boolean; data: { isAdmin: boolean } }>(
        "/api/v1/admin/check-role"
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

export default {
  auth: authAPI,
  applications: applicationsAPI,
  profile: profileAPI,
  contact: contactAPI,
  admin: adminAPI,
};
