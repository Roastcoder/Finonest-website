import { useState, useEffect } from "react";
import { ArrowRight, Car, CheckCircle, Clock, BadgePercent, Shield, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { publicCMSAPI } from "@/lib/api";

interface Service {
  _id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  description?: string;
  heroImage?: { url?: string; altText?: string };
  rate?: string;
  features?: { title: string; description?: string }[];
}

const ServicePromoBanner = () => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedService = async () => {
      try {
        setLoading(true);
        const res = await publicCMSAPI.listServices({ featured: true, limit: 1 });
        if (res.status === 'ok' && res.data?.items && res.data.items.length > 0) {
          setService(res.data.items[0]);
        }
      } catch (error) {
        console.error('Failed to load featured service:', error);
        setService(null);
      } finally {
        setLoading(false);
      }
    };
    loadFeaturedService();
  }, []);

  // Icon mapping for features
  const iconMap: Record<string, any> = {
    rate: BadgePercent,
    rates: BadgePercent,
    approval: Clock,
    clock: Clock,
    partners: Shield,
    shield: Shield,
    documentation: CheckCircle,
    docs: CheckCircle,
    check: CheckCircle,
  };

  const getIcon = (text: string) => {
    const lower = text.toLowerCase();
    for (const [key, Icon] of Object.entries(iconMap)) {
      if (lower.includes(key)) {
        return Icon;
      }
    }
    return CheckCircle;
  };

  if (loading) {
    return (
      <section className="py-10 sm:py-16 relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (!service) {
    return null; // Don't render if no featured service
  }

  return (
    <section className="py-10 sm:py-16 relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6">
              <Car className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-primary font-semibold text-xs sm:text-sm">Our Flagship Product</span>
            </div>
            
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <span className="text-gradient-primary">{service.title}</span>
              <br />
              <span className="text-foreground">Made Simple & Fast</span>
            </h2>
            
            {service.shortDescription || service.description ? (
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
                {service.shortDescription || service.description}
              </p>
            ) : null}
            
            {/* Features Grid */}
            {service.features && service.features.length > 0 && (
              <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8">
                {service.features.slice(0, 4).map((feature, index) => {
                  const Icon = getIcon(feature.title);
                  return (
                    <div 
                      key={index}
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-card/50 border border-border/50"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-foreground">{feature.title}</span>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link to="/apply">
                <Button size="default" className="bg-gradient-primary hover:opacity-90 text-primary-foreground gap-2 text-sm sm:text-base">
                  Apply Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
              <Link to={`/services/${service.slug}`}>
                <Button size="default" variant="outline" className="gap-2 text-sm sm:text-base">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              {service.heroImage?.url ? (
                <img 
                  src={service.heroImage.url} 
                  alt={service.heroImage.altText || service.title} 
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                />
              ) : (
                <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-br from-primary/20 to-accent/20" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              
              {/* Stats overlay - Responsive */}
              {service.rate && (
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6">
                  <div className="flex justify-between items-end gap-2">
                    <div className="glass rounded-lg sm:rounded-xl px-2 sm:px-4 py-1.5 sm:py-3">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Starting Rate</p>
                      <p className="text-lg sm:text-2xl font-display font-bold text-gradient-primary">{service.rate}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePromoBanner;
