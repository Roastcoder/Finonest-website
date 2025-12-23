const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiClient = {
  async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  },

  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }
};

// Replace MySQL direct connection with API calls
export const getContent = async (key: string) => {
  try {
    return await apiClient.get(`/api/content/${key}`);
  } catch (error) {
    console.error(`Error fetching content for key: ${key}`, error);
    return null;
  }
};

export const getTheme = async () => {
  try {
    return await apiClient.get('/api/theme');
  } catch (error) {
    console.error('Error fetching theme:', error);
    return {};
  }
};

export const getPageComponents = async (slug: string) => {
  try {
    return await apiClient.get(`/api/pages/${slug}/components`);
  } catch (error) {
    console.error(`Error fetching components for page: ${slug}`, error);
    return [];
  }
};