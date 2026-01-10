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
    // Fallback content when CMS is not available
    const fallbackContent = {
      title: "About Us - Finonest",
      blocks: [
        {
          type: 'hero',
          props: {
            title: 'About Finonest',
            subtitle: 'Your Trusted Financial Partner',
            description: 'We are committed to simplifying your financial journey with transparency, speed, and personalized solutions.'
          }
        },
        {
          type: 'content',
          props: {
            title: 'Our Story',
            content: '<div class="prose max-w-none"><p>Finonest is your trusted partner for all financial needs. We simplify the loan process with transparency, speed, and personalized solutions.</p><p>With over 50+ banking partners and a team of experienced professionals, we help you find the best financial products tailored to your needs.</p><p>Located in Jaipur, Rajasthan, we serve customers across India with our comprehensive range of financial services including home loans, personal loans, car loans, and credit cards.</p></div>'
          }
        }
      ],
      seo: {
        metaTitle: 'About Finonest - Your Trusted Financial Partner',
        metaDescription: 'Learn about Finonest, your trusted partner for loans and financial services. 50+ banking partners, transparent process, quick approval.'
      }
    };
    setPageData(fallbackContent);
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
