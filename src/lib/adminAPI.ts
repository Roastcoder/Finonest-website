import { supabase } from '../integrations/supabase/client';

// Admin Authentication
export const adminAuth = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  }
};

// Site Settings Management (uses existing site_settings table)
export const settingsAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('category', { ascending: true });
    return { data, error };
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('category', category);
    return { data, error };
  },

  async getByKey(key: string) {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('setting_key', key)
      .single();
    return { data, error };
  },

  async update(id: string, updates: {
    setting_value?: string;
    description?: string;
  }) {
    const { data, error } = await supabase
      .from('site_settings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  async upsert(setting: {
    setting_key: string;
    setting_value: string;
    setting_type?: string;
    category?: string;
    description?: string;
  }) {
    const { data, error } = await supabase
      .from('site_settings')
      .upsert(setting, { onConflict: 'setting_key' })
      .select()
      .single();
    return { data, error };
  }
};

// Loan Applications Management
export const applicationsAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('loan_applications')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('loan_applications')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  async updateStatus(id: string, status: string, notes?: string) {
    const { data, error } = await supabase
      .from('loan_applications')
      .update({ status, notes, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  }
};

// User Profiles Management
export const profilesAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  }
};

// Analytics and Stats
export const analyticsAPI = {
  async getDashboardStats() {
    const [applicationsCount, profilesCount, settingsCount] = await Promise.all([
      supabase.from('loan_applications').select('id', { count: 'exact', head: true }),
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('site_settings').select('id', { count: 'exact', head: true })
    ]);

    return {
      applications: applicationsCount.count || 0,
      profiles: profilesCount.count || 0,
      settings: settingsCount.count || 0
    };
  }
};

// Legacy exports for backward compatibility (now empty stubs)
export const pagesAPI = {
  async getAll() { return { data: [], error: null }; },
  async getBySlug(_slug: string) { return { data: null, error: null }; },
  async create(_page: unknown) { return { data: null, error: null }; },
  async update(_id: string, _updates: unknown) { return { data: null, error: null }; },
  async delete(_id: string) { return { error: null }; }
};

export const componentsAPI = {
  async getByPageId(_pageId: string) { return { data: [], error: null }; },
  async create(_component: unknown) { return { data: null, error: null }; },
  async update(_id: string, _updates: unknown) { return { data: null, error: null }; },
  async delete(_id: string) { return { error: null }; },
  async reorder(_components: unknown[]) { return []; }
};

export const contentAPI = {
  async getAll() { return { data: [], error: null }; },
  async getByKey(_key: string) { return { data: null, error: null }; },
  async create(_content: unknown) { return { data: null, error: null }; },
  async update(_id: string, _updates: unknown) { return { data: null, error: null }; },
  async delete(_id: string) { return { error: null }; }
};

export const themeAPI = {
  async getAll() { return { data: [], error: null }; },
  async getByCategory(_category: string) { return { data: [], error: null }; },
  async update(_key: string, _value: unknown) { return { data: null, error: null }; },
  async bulkUpdate(_settings: unknown[]) { return { data: [], error: null }; }
};

export const mediaAPI = {
  async getAll() { return { data: [], error: null }; },
  async upload(_file: File, _altText?: string) { return { data: null, error: null }; },
  async delete(_id: string) { return { error: null }; },
  getPublicUrl(_filePath: string) { return ''; }
};

// Component Templates
export const componentTemplates = {
  hero: {
    type: 'hero',
    name: 'Hero Section',
    defaultData: {
      title: 'Welcome to Our Platform',
      subtitle: 'Your success is our mission',
      backgroundImage: '',
      ctaText: 'Get Started',
      ctaLink: '/apply'
    }
  },
  services: {
    type: 'services',
    name: 'Services Grid',
    defaultData: {
      title: 'Our Services',
      services: [
        { title: 'Personal Loans', description: 'Quick and easy personal loans', icon: 'user' },
        { title: 'Home Loans', description: 'Affordable home financing', icon: 'home' },
        { title: 'Car Loans', description: 'Drive your dream car', icon: 'car' }
      ]
    }
  },
  testimonials: {
    type: 'testimonials',
    name: 'Testimonials',
    defaultData: {
      title: 'What Our Customers Say',
      testimonials: [
        { name: 'John Doe', text: 'Excellent service!', rating: 5 },
        { name: 'Jane Smith', text: 'Highly recommended!', rating: 5 }
      ]
    }
  },
  contact: {
    type: 'contact',
    name: 'Contact Form',
    defaultData: {
      title: 'Get In Touch',
      fields: ['name', 'email', 'phone', 'message']
    }
  },
  stats: {
    type: 'stats',
    name: 'Statistics',
    defaultData: {
      stats: [
        { label: 'Happy Customers', value: '10,000+' },
        { label: 'Loans Approved', value: '₹500Cr+' },
        { label: 'Years Experience', value: '15+' }
      ]
    }
  }
};
