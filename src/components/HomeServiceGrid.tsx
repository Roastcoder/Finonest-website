import { useEffect, useState } from "react";
import { Home, Briefcase, Car, CreditCard, Building, Gauge, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { publicCMSAPI } from "@/lib/api";

interface ServiceItem {
  _id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  highlight?: boolean;
}

const iconMap: Record<string, any> = {
  home: Home,
  "home-loan": Home,
  personal: Briefcase,
  "personal-loan": Briefcase,
  car: Car,
  "car-loan": Car,
  credit: CreditCard,
  "credit-card": CreditCard,
  business: Building,
  "business-loan": Building,
  score: Gauge,
  "credit-score": Gauge,
};

const HomeServiceGrid = () => {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.05 });
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await publicCMSAPI.listServices({ limit: 6 });
        if (res.status === 'ok' && res.data?.items) {
          setServices(res.data.items || []);
        }
      } catch (error) {
        console.error('Failed to load services:', error);
        setServices([]);
      }
    };
    loadServices();
  }, []);

  const getIcon = (service: ServiceItem) => {
    const slug = service.slug.toLowerCase();
    for (const [key, Icon] of Object.entries(iconMap)) {
      if (slug.includes(key)) return Icon;
    }
    return Briefcase;
  };

  return (
    <section className="py-6 md:py-10 bg-card">
      <div ref={ref} className="container px-3 md:px-4">
        {/* 2x2 grid on mobile, adjusts on larger screens */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 max-w-3xl mx-auto lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = getIcon(service);
            const badgeColor = service.highlight ? "bg-emerald-500 text-white" : "bg-blue-500 text-white";
            return (
            <Link
              key={service._id}
              to={`/services/${service.slug}`}
              className={`relative bg-background rounded-xl md:rounded-2xl border border-border p-3 sm:p-4 md:p-5 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group flex flex-col card-scroll-reveal ${isRevealed ? 'revealed' : ''}`}
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              {/* Badge - positioned at top right */}
              <span
                className={`absolute -top-2 right-2 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto text-[8px] sm:text-[9px] md:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-semibold whitespace-nowrap shadow-sm ${service.badgeColor}`}
              >
                {service.highlight ? "Featured" : "Popular"}
              </span>

              {/* Icon */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center mb-2 sm:mb-3 mt-1">
                <Icon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-semibold text-foreground text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">
                {service.title}
              </h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2 mb-2 sm:mb-3 flex-grow">
                {service.shortDescription || ''}
              </p>

              {/* CTA Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full text-[10px] sm:text-xs h-7 sm:h-8 md:h-9 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                {service.slug.includes("credit-score") ? "Check Now" : "Apply Now"}
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeServiceGrid;