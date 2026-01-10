import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import DynamicPageRenderer from "@/components/DynamicPageRenderer";
import { publicCMSAPI } from "@/lib/api";

const Index = () => {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        setLoading(true);
        // Fetch homepage by slug "/" - use direct fetch to pages list and find home page
        const response = await fetch('http://localhost:4000/api/pages');
        const data = await response.json();
        
        if (data.status === 'ok' && data.data && data.data.items) {
          const homePage = data.data.items.find((page: any) => page.slug === '/');
          if (homePage) {
            console.log('Home page data loaded:', homePage);
            setPageData(homePage);
          } else {
            console.log('Home page not found in pages list');
            // Fallback: use hardcoded structure if CMS page not found
            setPageData({
              slug: '/',
              template: 'home',
              blocks: [
                { type: 'hero', props: {} },
                { type: 'creditScoreBanner', props: {} },
                { type: 'services', props: {} },
                { type: 'processSteps', props: {} },
                { type: 'whyUs', props: {} },
                { type: 'testimonials', props: {} },
                { type: 'faq', props: {} },
                { type: 'contact', props: {} },
                { type: 'partnerBanks', props: {} },
              ]
            });
          }
        }
      } catch (err: any) {
        console.error('Failed to fetch homepage:', err);
        setError(err.message);
        // Fallback structure on error
        setPageData({
          slug: '/',
          template: 'home',
          blocks: [
            { type: 'hero', props: {} },
            { type: 'creditScoreBanner', props: {} },
            { type: 'services', props: {} },
            { type: 'processSteps', props: {} },
            { type: 'whyUs', props: {} },
            { type: 'testimonials', props: {} },
            { type: 'faq', props: {} },
            { type: 'contact', props: {} },
            { type: 'partnerBanks', props: {} },
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHomePage();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Navbar />
      {pageData ? (
        <DynamicPageRenderer pageData={pageData} />
      ) : (
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold mb-2">Welcome to Finonest</h1>
          <p className="text-muted-foreground">{error || 'Loading content...'}</p>
        </div>
      )}
      <Footer />
      <WhatsAppButton />
      <BottomNavigation />
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
