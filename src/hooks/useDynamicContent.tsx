import { useState, useEffect } from 'react';
import { useDynamicContent, subscribeToContentChanges } from '../lib/dynamicCMS';

// Hook for getting dynamic content
export const useContent = (key: string) => {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { getContent } = useDynamicContent();

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const data = await getContent(key);
      setContent(data);
      setLoading(false);
    };

    fetchContent();

    // Subscribe to real-time updates
    const unsubscribe = subscribeToContentChanges((payload) => {
      if (payload.table === 'content_blocks' && payload.new?.key === key) {
        setContent(payload.new.content);
      }
    });

    return unsubscribe;
  }, [key]);

  return { content, loading };
};

// Hook for getting theme settings
export const useTheme = () => {
  const [theme, setTheme] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { getAllThemeSettings } = useDynamicContent();

  useEffect(() => {
    const fetchTheme = async () => {
      setLoading(true);
      const data = await getAllThemeSettings();
      setTheme(data);
      setLoading(false);
    };

    fetchTheme();

    // Subscribe to theme updates
    const unsubscribe = subscribeToContentChanges((payload) => {
      if (payload.table === 'theme_settings') {
        fetchTheme(); // Refetch all theme settings
      }
    });

    return unsubscribe;
  }, []);

  // Apply theme to CSS variables
  useEffect(() => {
    if (Object.keys(theme).length > 0) {
      const root = document.documentElement;
      
      // Apply CSS custom properties
      if (theme.primary_color) root.style.setProperty('--primary', theme.primary_color);
      if (theme.secondary_color) root.style.setProperty('--secondary', theme.secondary_color);
      if (theme.accent_color) root.style.setProperty('--accent', theme.accent_color);
      if (theme.background_color) root.style.setProperty('--background', theme.background_color);
      if (theme.text_color) root.style.setProperty('--foreground', theme.text_color);
      if (theme.font_family) root.style.setProperty('--font-family', theme.font_family);
      if (theme.font_size_base) root.style.setProperty('--font-size-base', theme.font_size_base);
    }
  }, [theme]);

  return { theme, loading };
};

// Hook for getting page components
export const usePageComponents = (pageSlug: string) => {
  const [components, setComponents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { getPageComponents } = useDynamicContent();

  useEffect(() => {
    const fetchComponents = async () => {
      setLoading(true);
      const data = await getPageComponents(pageSlug);
      setComponents(data);
      setLoading(false);
    };

    fetchComponents();

    // Subscribe to component updates
    const unsubscribe = subscribeToContentChanges((payload) => {
      if (payload.table === 'page_components') {
        fetchComponents(); // Refetch components
      }
    });

    return unsubscribe;
  }, [pageSlug]);

  return { components, loading };
};

// Hook for multiple content blocks
export const useMultipleContent = (keys: string[]) => {
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const { getContent } = useDynamicContent();

  useEffect(() => {
    const fetchAllContent = async () => {
      setLoading(true);
      const contentMap: Record<string, any> = {};
      
      await Promise.all(
        keys.map(async (key) => {
          const data = await getContent(key);
          contentMap[key] = data;
        })
      );
      
      setContent(contentMap);
      setLoading(false);
    };

    fetchAllContent();

    // Subscribe to updates
    const unsubscribe = subscribeToContentChanges((payload) => {
      if (payload.table === 'content_blocks' && keys.includes(payload.new?.key)) {
        setContent(prev => ({
          ...prev,
          [payload.new.key]: payload.new.content
        }));
      }
    });

    return unsubscribe;
  }, [keys.join(',')]);

  return { content, loading };
};

// Dynamic component renderer hook
export const useDynamicComponent = (componentData: any, theme: any) => {
  const [renderedComponent, setRenderedComponent] = useState<any>(null);

  useEffect(() => {
    if (!componentData || !theme) return;

    const { componentRenderers } = require('../lib/dynamicCMS');
    const renderer = componentRenderers[componentData.component_type];
    
    if (renderer) {
      const rendered = renderer(componentData.component_data, theme);
      setRenderedComponent(rendered);
    }
  }, [componentData, theme]);

  return renderedComponent;
};