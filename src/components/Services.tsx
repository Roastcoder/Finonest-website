import { useEffect, useState } from "react";
import { Home, Car, Briefcase, Building, CreditCard, Landmark, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { publicCMSAPI } from "@/lib/api";

interface ServiceData {
  slug: string;
  title: string;
  shortDescription?: string;
  rate?: string;
  highlight?: boolean;
  heroImage?: {
    url?: string;
    altText?: string;
  };
}

interface ServicesProps {
  services?: ServiceData[];
  title?: string;
  subtitle?: string;
  description?: string;
  featured?: boolean;
  limit?: number;
}

const iconMap: Record<string, any> = {
  'home-loan': Home,
  'car-loan': Car,
  'personal-loan': Briefcase,
  'business-loan': Building,
  'credit-cards': CreditCard,
  'loan-against-property': Landmark,
};

const Services: React.FC<ServicesProps> = ({ 
  services: propsServices, 
  title,
  subtitle,
  description,
  featured,
  limit
}) => {
  const [services, setServices] = useState<ServiceData[]>(propsServices || []);
  const [loading, setLoading] = useState(!propsServices);

  useEffect(() => {
    // If props are provided, use them
    if (propsServices) {
      setServices(propsServices);
      setLoading(false);
      return;
    }

    // Otherwise, fetch from CMS
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await publicCMSAPI.listServices({ featured, limit });
        if (response.status === 'ok' && response.data?.items && Array.isArray(response.data.items)) {
          setServices(response.data.items.map((s: any) => ({
            slug: s.slug,
            title: s.title,
            shortDescription: s.shortDescription,
            rate: s.rate,
            highlight: s.highlight,
            heroImage: s.heroImage
          })));
        }
      } catch (err) {
        console.error('Failed to fetch services:', err);
        // Keep empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [propsServices, featured, limit]);

  if (loading) {
    return null; // Or a loading skeleton
  }

  if (services.length === 0) {
    return null;
  }
  return (
    <section className="py-12 md:py-20 bg-muted/30" id="services">
      <div className="container px-4">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {subtitle || "Our Services"}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {title || "Financial Solutions for Everyone"}
          </h2>
          {description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Horizontal scroll on mobile */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 md:overflow-visible md:mx-0 md:px-0">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 min-w-max md:min-w-0">
            {services.map((service, index) => (
              <Link
                key={service.slug || index}
                to={`/services/${service.slug}`}
                className={`group bg-card rounded-xl border overflow-hidden hover:shadow-xl transition-all duration-300 w-[280px] md:w-auto flex-shrink-0 ${
                  service.highlight ? 'border-accent ring-2 ring-accent/20' : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="relative h-32 md:h-40 overflow-hidden">
                  {service.heroImage?.url ? (
                    <img 
                      src={service.heroImage.url} 
                      alt={service.heroImage.altText || service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  {service.highlight && (
                    <span className="absolute top-2 right-2 px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      Popular
                    </span>
                  )}
                  <div className="absolute bottom-2 left-2 flex items-center gap-2">
                    {iconMap[service.slug] && (
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        {(() => {
                          const IconComponent = iconMap[service.slug];
                          return <IconComponent className="w-4 h-4 text-primary-foreground" />;
                        })()}
                      </div>
                    )}
                    {service.rate && (
                      <span className="text-sm font-bold text-foreground bg-background/80 px-2 py-0.5 rounded">
                        From {service.rate}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  {service.shortDescription && (
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {service.shortDescription}
                    </p>
                  )}
                  <div className="mt-3 flex items-center text-primary text-sm font-medium">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Services;