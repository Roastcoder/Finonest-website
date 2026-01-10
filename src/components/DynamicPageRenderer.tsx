import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { publicCMSAPI } from '@/lib/api';
import HeroSection from './HeroSection';
import Services from './Services';
import ProcessSteps from './ProcessSteps';
import WhyUs from './WhyUs';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Contact from './Contact';
import PartnerBanks from './PartnerBanks';
import CreditScoreBanner from './CreditScoreBanner';
import { AnimateOnScroll } from '@/hooks/useScrollAnimation';

interface Block {
  type: string;
  props: Record<string, any>;
}

interface PageData {
  slug: string;
  title?: string;
  template?: string;
  blocks: Block[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

interface DynamicPageRendererProps {
  pageData?: PageData;
  slug?: string;
}

// Block type mapping to components
const blockComponents: Record<string, React.ComponentType<any>> = {
  hero: HeroSection,
  services: Services,
  processSteps: ProcessSteps,
  whyUs: WhyUs,
  testimonials: Testimonials,
  faq: FAQ,
  contact: Contact,
  partnerBanks: PartnerBanks,
  creditScoreBanner: CreditScoreBanner,
};

const DynamicPageRenderer: React.FC<DynamicPageRendererProps> = ({ pageData, slug }) => {
  const [page, setPage] = useState<PageData | null>(pageData || null);
  const [loading, setLoading] = useState(!pageData);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    // If pageData is provided, use it directly
    if (pageData) {
      setPage(pageData);
      setLoading(false);
      return;
    }

    // Otherwise, fetch by slug
    const pageSlug = slug || params.slug || '/';
    
    const fetchPage = async () => {
      try {
        setLoading(true);
        const response = await publicCMSAPI.getPageBySlug(pageSlug);
        if (response.status === 'ok' && response.data) {
          setPage(response.data);
        } else {
          setError('Page not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [pageData, slug, params.slug]);

  // Update document title and meta description
  useEffect(() => {
    if (page?.seo?.metaTitle) {
      document.title = page.seo.metaTitle;
    }
    if (page?.seo?.metaDescription) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', page.seo.metaDescription);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = page.seo.metaDescription;
        document.head.appendChild(meta);
      }
    }
  }, [page]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
          <p className="text-muted-foreground">{error || 'The requested page could not be found.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {page.blocks && page.blocks.length > 0 ? (
        page.blocks.map((block, index) => {
          const Component = blockComponents[block.type];
          
          if (!Component) {
            console.warn(`Unknown block type: ${block.type}`);
            return null;
          }

          // Special handling for hero block to convert carouselImages to slides
          let blockProps = block.props;
          if (block.type === 'hero' && block.props.carouselImages) {
            blockProps = {
              ...block.props,
              slides: block.props.carouselImages.map((image: string, index: number) => ({
                id: index + 1,
                title: block.props.heading || 'Loan Service',
                subtitle: block.props.subheading || 'Quick approval',
                description: block.props.subheading || 'Get instant approval',
                cta: block.props.ctas?.[0]?.label || 'Apply Now',
                ctaLink: block.props.ctas?.[0]?.link || '/apply',
                image: image,
                highlight: 'Quick Disbursal'
              }))
            };
          }

          // Apply animation wrapper for certain block types
          const shouldAnimate = !['hero', 'creditScoreBanner'].includes(block.type);
          
          const blockElement = <Component key={`block-${index}`} props={blockProps} />;

          return shouldAnimate ? (
            <AnimateOnScroll key={`block-${index}`} animation="fade-up">
              {blockElement}
            </AnimateOnScroll>
          ) : (
            blockElement
          );
        })
      ) : (
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-4">{page.title || 'Page'}</h1>
          <p className="text-muted-foreground">No content blocks configured for this page.</p>
        </div>
      )}
    </div>
  );
};

export default DynamicPageRenderer;
