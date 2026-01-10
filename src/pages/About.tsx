import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Loader2 } from "lucide-react";
import api from "@/lib/api";
import DynamicBlock from "@/components/DynamicBlock";

const About = () => {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const res = await api.publicCMS.getPageBySlug('about');
        if (res && res.status === 'ok' && res.data) {
          setPageData(res.data);
        }
      } catch (error) {
        console.error('Failed to load about page:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </>
    );
  }

  if (!pageData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
            <p className="text-muted-foreground">The about page content is not available.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageData.seo?.metaTitle || pageData.title || "About Us"} - Finonest India Pvt. Ltd.</title>
        <meta name="description" content={pageData.seo?.metaDescription || "Learn about Finonest India Pvt. Ltd."} />
        <meta name="keywords" content="Finonest about, loan company Rajasthan, used car loan, financial services, trusted loan partner" />
        <link rel="canonical" href="https://finonest.com/about" />
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-background pb-16 lg:pb-0">
        {pageData.blocks?.map((block: any, index: number) => (
          <DynamicBlock key={index} block={block} />
        ))}
      </main>

      <Footer />
      <WhatsAppButton />
      <BottomNavigation />
    </>
  );
};

export default About;
