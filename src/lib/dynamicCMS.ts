import { supabase } from '../integrations/supabase/client';

// Dynamic Content Hook for Frontend Components
export const useDynamicContent = () => {
  const getContent = async (key: string) => {
    try {
      const { data, error } = await supabase
        .from('content_blocks')
        .select('content')
        .eq('key', key)
        .eq('is_active', true)
        .single();
      
      if (error) throw error;
      return data?.content || {};
    } catch (error) {
      console.error(`Error fetching content for key: ${key}`, error);
      return {};
    }
  };

  const getTheme = async (key: string) => {
    try {
      const { data, error } = await supabase
        .from('theme_settings')
        .select('value')
        .eq('key', key)
        .single();
      
      if (error) throw error;
      return data?.value?.value || '';
    } catch (error) {
      console.error(`Error fetching theme for key: ${key}`, error);
      return '';
    }
  };

  const getAllThemeSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('theme_settings')
        .select('*');
      
      if (error) throw error;
      
      const themeObj: Record<string, any> = {};
      data?.forEach(setting => {
        themeObj[setting.key] = setting.value?.value || setting.value;
      });
      
      return themeObj;
    } catch (error) {
      console.error('Error fetching all theme settings:', error);
      return {};
    }
  };

  const getPageComponents = async (pageSlug: string) => {
    try {
      // First get the page
      const { data: page, error: pageError } = await supabase
        .from('pages')
        .select('id')
        .eq('slug', pageSlug)
        .eq('is_active', true)
        .single();
      
      if (pageError) throw pageError;
      
      // Then get components for this page
      const { data: components, error: componentsError } = await supabase
        .from('page_components')
        .select('*')
        .eq('page_id', page.id)
        .eq('is_visible', true)
        .order('order_index');
      
      if (componentsError) throw componentsError;
      return components || [];
    } catch (error) {
      console.error(`Error fetching components for page: ${pageSlug}`, error);
      return [];
    }
  };

  return {
    getContent,
    getTheme,
    getAllThemeSettings,
    getPageComponents
  };
};

// Real-time Content Updates
export const subscribeToContentChanges = (callback: (payload: any) => void) => {
  const subscription = supabase
    .channel('content_changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'content_blocks' }, 
      callback
    )
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'theme_settings' }, 
      callback
    )
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'page_components' }, 
      callback
    )
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
};

// Component Templates for Dynamic Rendering
export const componentRenderers = {
  hero: (data: any, theme: any) => ({
    type: 'hero',
    props: {
      title: data.title || 'Welcome',
      subtitle: data.subtitle || 'Your success is our mission',
      backgroundImage: data.backgroundImage || '',
      ctaText: data.ctaText || 'Get Started',
      ctaLink: data.ctaLink || '/apply',
      backgroundColor: theme.primary_color || '#3B82F6',
      textColor: theme.text_color || '#1F2937'
    }
  }),

  services: (data: any, theme: any) => ({
    type: 'services',
    props: {
      title: data.title || 'Our Services',
      services: data.services || [],
      backgroundColor: theme.background_color || '#FFFFFF',
      accentColor: theme.accent_color || '#F59E0B'
    }
  }),

  testimonials: (data: any, theme: any) => ({
    type: 'testimonials',
    props: {
      title: data.title || 'What Our Customers Say',
      testimonials: data.testimonials || [],
      backgroundColor: theme.secondary_color || '#10B981'
    }
  }),

  contact: (data: any, theme: any) => ({
    type: 'contact',
    props: {
      title: data.title || 'Get In Touch',
      fields: data.fields || ['name', 'email', 'phone', 'message'],
      primaryColor: theme.primary_color || '#3B82F6'
    }
  }),

  stats: (data: any, theme: any) => ({
    type: 'stats',
    props: {
      stats: data.stats || [],
      backgroundColor: theme.background_color || '#FFFFFF',
      textColor: theme.text_color || '#1F2937'
    }
  }),

  text_block: (data: any, theme: any) => ({
    type: 'text_block',
    props: {
      content: data.content || '',
      alignment: data.alignment || 'left',
      fontSize: data.fontSize || theme.font_size_base || '16px',
      color: data.color || theme.text_color || '#1F2937'
    }
  }),

  image_gallery: (data: any, theme: any) => ({
    type: 'image_gallery',
    props: {
      images: data.images || [],
      layout: data.layout || 'grid',
      columns: data.columns || 3
    }
  }),

  cta_banner: (data: any, theme: any) => ({
    type: 'cta_banner',
    props: {
      title: data.title || 'Ready to Get Started?',
      description: data.description || 'Join thousands of satisfied customers',
      buttonText: data.buttonText || 'Apply Now',
      buttonLink: data.buttonLink || '/apply',
      backgroundColor: theme.primary_color || '#3B82F6',
      textColor: '#FFFFFF'
    }
  })
};

// Advanced CMS Functions
export const advancedCMS = {
  // Bulk operations
  async bulkUpdateComponents(updates: Array<{id: string, data: any}>) {
    try {
      const promises = updates.map(update => 
        supabase
          .from('page_components')
          .update({ component_data: update.data })
          .eq('id', update.id)
      );
      
      const results = await Promise.all(promises);
      return { success: true, results };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Page duplication
  async duplicatePage(pageId: string, newSlug: string, newTitle: string) {
    try {
      // Get original page
      const { data: originalPage } = await supabase
        .from('pages')
        .select('*')
        .eq('id', pageId)
        .single();

      // Create new page
      const { data: newPage, error: pageError } = await supabase
        .from('pages')
        .insert({
          slug: newSlug,
          title: newTitle,
          meta_description: originalPage.meta_description
        })
        .select()
        .single();

      if (pageError) throw pageError;

      // Get original components
      const { data: originalComponents } = await supabase
        .from('page_components')
        .select('*')
        .eq('page_id', pageId);

      // Duplicate components
      if (originalComponents?.length) {
        const newComponents = originalComponents.map(comp => ({
          page_id: newPage.id,
          component_type: comp.component_type,
          component_data: comp.component_data,
          order_index: comp.order_index,
          is_visible: comp.is_visible
        }));

        await supabase
          .from('page_components')
          .insert(newComponents);
      }

      return { success: true, page: newPage };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Component library management
  async saveComponentTemplate(name: string, type: string, data: any) {
    try {
      const { data, error } = await supabase
        .from('component_templates')
        .insert({
          name,
          component_type: type,
          template_data: data,
          is_public: true
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, template: data };
    } catch (error) {
      return { success: false, error };
    }
  },

  // SEO management
  async updatePageSEO(pageId: string, seoData: {
    title?: string;
    meta_description?: string;
    meta_keywords?: string;
    og_title?: string;
    og_description?: string;
    og_image?: string;
  }) {
    try {
      const { data, error } = await supabase
        .from('pages')
        .update(seoData)
        .eq('id', pageId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, page: data };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Analytics integration
  async trackPageView(pageSlug: string, userAgent?: string, ip?: string) {
    try {
      await supabase
        .from('page_analytics')
        .insert({
          page_slug: pageSlug,
          user_agent: userAgent,
          ip_address: ip,
          viewed_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  },

  // Content scheduling
  async scheduleContent(contentId: string, publishAt: string, unpublishAt?: string) {
    try {
      const { data, error } = await supabase
        .from('content_schedule')
        .insert({
          content_id: contentId,
          publish_at: publishAt,
          unpublish_at: unpublishAt,
          status: 'scheduled'
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, schedule: data };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Multi-language support
  async getTranslatedContent(key: string, language: string = 'en') {
    try {
      const { data, error } = await supabase
        .from('content_translations')
        .select('translated_content')
        .eq('content_key', key)
        .eq('language', language)
        .single();

      if (error) {
        // Fallback to default language
        const { data: fallback } = await supabase
          .from('content_blocks')
          .select('content')
          .eq('key', key)
          .single();
        
        return fallback?.content || {};
      }

      return data?.translated_content || {};
    } catch (error) {
      console.error('Error fetching translated content:', error);
      return {};
    }
  },

  // Version control
  async createContentVersion(contentId: string, data: any, comment?: string) {
    try {
      const { data: version, error } = await supabase
        .from('content_versions')
        .insert({
          content_id: contentId,
          version_data: data,
          comment: comment || 'Auto-saved version',
          created_by: (await supabase.auth.getUser()).data.user?.id
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, version };
    } catch (error) {
      return { success: false, error };
    }
  },

  async restoreContentVersion(versionId: string) {
    try {
      // Get version data
      const { data: version } = await supabase
        .from('content_versions')
        .select('*')
        .eq('id', versionId)
        .single();

      if (!version) throw new Error('Version not found');

      // Update content with version data
      const { data, error } = await supabase
        .from('content_blocks')
        .update({ content: version.version_data })
        .eq('id', version.content_id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, content: data };
    } catch (error) {
      return { success: false, error };
    }
  }
};

// Export all APIs
export * from './adminAPI';