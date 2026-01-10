import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  FileText, 
  Calculator, 
  ArrowRight,
  Phone,
  Percent,
  Clock,
  Shield,
  Users
} from "lucide-react";
import { publicCMSAPI } from "@/lib/api";

interface ServiceData {
  slug: string;
  title: string;
  shortDescription?: string;
  heroHeading?: string;
  overview?: string;
  heroImage?: {
    url?: string;
    altText?: string;
  };
  rate?: string;
  benefits?: { title: string; description?: string }[];
  features?: { title: string; description?: string }[];
  eligibility?: string[];
  requiredDocs?: string[];
  faqs?: { question: string; answer: string }[];
  partnerBanks?: any[];
  relatedServices?: any[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonical?: string;
  };
}

const ServiceDetail = () => {
  const { service } = useParams<{ service: string }>();
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      if (!service) {
        setError('Service slug is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await publicCMSAPI.getServiceBySlug(service);
        if (response.status === 'ok' && response.data) {
          setServiceData(response.data);
        } else {
          setError('Service not found');
        }
      } catch (err: any) {
        console.error('Failed to fetch service:', err);
        setError(err.message || 'Failed to load service');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [service]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
        <WhatsAppButton />
        <BottomNavigation />
      </>
    );
  }

  if (error || !serviceData) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Service Not Found</h1>
            <p className="text-muted-foreground mb-4">{error || 'The requested service could not be found.'}</p>
            <Button asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
        <BottomNavigation />
      </>
    );
  }

  const features = serviceData.features || serviceData.benefits || [];
  const eligibility = serviceData.eligibility || [];
  const documents = serviceData.requiredDocs || [];
  const faqs = serviceData.faqs || [];

  return (
    <>
      <Helmet>
        <title>{serviceData.seo?.metaTitle || `${serviceData.title} - Finonest`}</title>
        <meta name="description" content={serviceData.seo?.metaDescription || serviceData.shortDescription || ''} />
        {serviceData.seo?.canonical && <link rel="canonical" href={serviceData.seo.canonical} />}
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-background pb-16 lg:pb-0">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {serviceData.title}
                  </span>
                  {serviceData.rate && (
                    <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-bold">
                      FROM {serviceData.rate}
                    </span>
                  )}
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                  {serviceData.heroHeading || serviceData.title}
                </h1>
                
                {serviceData.shortDescription && (
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {serviceData.shortDescription}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 mb-8">
                  <Button size="lg" className="shadow-lg" asChild>
                    <Link to={`/services/${serviceData.slug}/apply`}>
                      Apply Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="tel:+919462553887">
                      <Phone className="w-5 h-5 mr-2" />
                      Call Expert
                    </a>
                  </Button>
                </div>

                {features.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {features.slice(0, 4).map((feature, index) => {
                      const icons = [Percent, Clock, Shield, Users];
                      const IconComponent = icons[index % icons.length];
                      return (
                        <div key={index} className="text-center p-3 bg-card rounded-lg border border-border">
                          <IconComponent className="w-6 h-6 text-primary mx-auto mb-2" />
                          <div className="text-sm font-semibold text-foreground">{feature.title}</div>
                          {feature.description && (
                            <div className="text-xs text-muted-foreground">{feature.description}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="relative animate-slide-up">
                {serviceData.heroImage?.url && (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={serviceData.heroImage.url} 
                      alt={serviceData.heroImage.altText || serviceData.title} 
                      className="w-full h-[450px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                    
                    {serviceData.rate && (
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-card/90 backdrop-blur p-4 rounded-xl border border-border">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{serviceData.rate}</div>
                            <div className="text-xs text-muted-foreground">Starting Rate</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        {serviceData.overview && (
          <section className="py-16">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: serviceData.overview }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Features/Benefits Section */}
        {features.length > 4 && (
          <section className="py-16 bg-muted/30">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  Key Features & Benefits
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {features.map((feature, index) => (
                  <div key={index} className="bg-card p-6 rounded-xl border border-border">
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    {feature.description && (
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Eligibility & Documents */}
        {(eligibility.length > 0 || documents.length > 0) && (
          <section className="py-16">
            <div className="container">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Eligibility */}
                {eligibility.length > 0 && (
                  <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-display font-bold text-foreground">Eligibility Criteria</h2>
                    </div>
                    <ul className="space-y-3">
                      {eligibility.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Documents */}
                {documents.length > 0 && (
                  <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-accent" />
                      </div>
                      <h2 className="text-2xl font-display font-bold text-foreground">Documents Required</h2>
                    </div>
                    <ul className="space-y-3">
                      {documents.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        {faqs.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-card p-6 rounded-xl border border-border">
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-primary-foreground/80 max-w-xl">
                  Apply now and get the best rates from our partner banks. Our experts will guide you through every step.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to={`/services/${serviceData.slug}/apply`}>
                    Apply Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to="/emi-calculator">
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate EMI
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <BottomNavigation />
    </>
  );
};

export default ServiceDetail;
