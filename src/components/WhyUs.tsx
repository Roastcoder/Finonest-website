import { useState, useEffect } from "react";
import { CheckCircle2, Users, Award, Headphones, FileCheck, Zap, Loader2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { publicCMSAPI } from "@/lib/api";

interface WhyUsFeature {
  _id: string;
  title: string;
  description?: string;
  icon?: string;
  image?: {
    url?: string;
    altText?: string;
  };
  order?: number;
}

// Icon mapping
const iconMap: Record<string, any> = {
  zap: Zap,
  quick: Zap,
  filecheck: FileCheck,
  file: FileCheck,
  award: Award,
  rates: Award,
  headphones: Headphones,
  support: Headphones,
  users: Users,
  partners: Users,
  checkcircle: CheckCircle2,
  check: CheckCircle2,
  transparent: CheckCircle2,
};

const WhyUs = () => {
  const [features, setFeatures] = useState<WhyUsFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    ref: headerRef,
    isRevealed: headerRevealed
  } = useScrollReveal();
  const {
    ref: gridRef,
    isRevealed: gridRevealed
  } = useScrollReveal({
    threshold: 0.05
  });

  useEffect(() => {
    const loadFeatures = async () => {
      try {
        setLoading(true);
        const res = await publicCMSAPI.listWhyUsFeatures();
        if (res.status === 'ok' && res.data) {
          setFeatures(res.data || []);
        }
      } catch (error) {
        console.error('Failed to load WhyUs features:', error);
        setFeatures([]);
      } finally {
        setLoading(false);
      }
    };
    loadFeatures();
  }, []);

  const getIcon = (iconName?: string) => {
    if (!iconName) return Zap;
    const key = iconName.toLowerCase().replace(/\s+/g, '');
    for (const [mapKey, Icon] of Object.entries(iconMap)) {
      if (key.includes(mapKey)) {
        return Icon;
      }
    }
    return Zap;
  };

  return (
    <section id="why-us" className="py-10 md:py-24 relative overflow-hidden bg-gradient-section-alt">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-16 items-center">
          {/* Left Content */}
          <div ref={headerRef} className={`reveal-on-scroll ${headerRevealed ? 'revealed' : ''}`}>
            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-accent/10 text-accent text-xs md:text-sm font-medium mb-2 md:mb-4">
              Why Choose Us
            </span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6 leading-tight">
              We Make{" "}
              <span className="text-gradient-accent">Financial Freedom</span>{" "}
              Accessible
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg mb-4 md:mb-8 hidden md:block">
              With over 5 years of experience and 50,000+ satisfied customers, 
              Finonest has become India's trusted partner for all financial needs. 
              We believe everyone deserves access to fair and transparent financial services.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              
              
            </div>
          </div>

          {/* Right Grid - 2x2 on mobile */}
          <div ref={gridRef} className="grid grid-cols-2 gap-3 md:gap-4">
            {loading ? (
              <div className="col-span-2 flex justify-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : features.length === 0 ? (
              <div className="col-span-2 text-center py-10 text-muted-foreground">
                Features will appear here once published.
              </div>
            ) : (
              features.map((feature, index) => {
                const Icon = getIcon(feature.icon);
                return (
                  <div 
                    key={feature._id} 
                    className={`bg-card rounded-xl md:rounded-2xl overflow-hidden shadow-lg card-hover group card-scroll-reveal ${gridRevealed ? 'revealed' : ''}`} 
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    {/* Image */}
                    <div className="relative h-20 md:h-32 overflow-hidden">
                      {feature.image?.url ? (
                        <img 
                          src={feature.image.url} 
                          alt={feature.image.altText || feature.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
                      )}
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
                      <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-background/90 flex items-center justify-center shadow-lg">
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-3 md:p-4">
                      <h3 className="font-display text-xs md:text-base font-semibold mb-1">{feature.title}</h3>
                      {feature.description && (
                        <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed hidden md:block">{feature.description}</p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;