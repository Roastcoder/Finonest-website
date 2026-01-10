import { useEffect, useState } from "react";
import { Home, Car, Briefcase, CreditCard, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
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
};

const QuickServices = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await publicCMSAPI.listServices({ featured: true, limit: 6 });
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
      <div className="container px-4">
        {/* Mobile: Horizontal scroll | Desktop: Grid */}
        <div className="overflow-x-auto -mx-4 px-4 pb-2 md:overflow-visible md:mx-0 md:px-0 md:pb-0">
          <div className="flex gap-3 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4">
            {services.map((service) => {
              const Icon = getIcon(service);
              const badge = service.highlight ? "Featured" : "Popular";
              const color = service.highlight ? "from-emerald-500 to-emerald-600" : "from-blue-500 to-blue-600";
              return (
              <Link
                key={service._id}
                to={`/services/${service.slug}`}
                className="relative flex-shrink-0 w-[200px] md:w-auto bg-background rounded-xl border border-border p-4 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Badge */}
                <span className="absolute -top-2 right-3 text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">
                  {badge}
                </span>

                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm mb-0.5">
                      {service.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {service.shortDescription || ''}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center text-primary text-xs font-medium group-hover:gap-2 transition-all">
                  Apply Now
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickServices;
