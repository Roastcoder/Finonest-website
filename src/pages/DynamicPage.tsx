import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { usePageComponents, useTheme } from '../hooks/useDynamicContent';
import DynamicComponent from '../components/DynamicComponent';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

interface DynamicPageProps {
  pageSlug?: string;
}

const DynamicPage: React.FC<DynamicPageProps> = ({ pageSlug }) => {
  const { slug } = useParams();
  const currentSlug = pageSlug || slug || 'home';
  
  const { components, loading: componentsLoading } = usePageComponents(currentSlug);
  const { theme, loading: themeLoading } = useTheme();

  if (componentsLoading || themeLoading) {
    return <LoadingScreen onLoadingComplete={() => {}} />;
  }

  // Get page metadata from first component or default
  const pageTitle = components.find(c => c.component_type === 'hero')?.component_data?.title || 'FinoNest';
  const pageDescription = components.find(c => c.component_type === 'hero')?.component_data?.subtitle || 'Your trusted financial partner';

  return (
    <>
      <Helmet>
        <title>{pageTitle} - FinoNest</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={`${pageTitle} - FinoNest`} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          {components.length > 0 ? (
            components.map((component, index) => (
              <DynamicComponent
                key={component.id}
                type={component.component_type}
                data={component.component_data}
                theme={theme}
                className={index === 0 ? 'first-component' : ''}
              />
            ))
          ) : (
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
                <p className="text-muted-foreground mb-8">
                  The page "{currentSlug}" doesn't exist or has no content.
                </p>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Go Home
                </button>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DynamicPage;