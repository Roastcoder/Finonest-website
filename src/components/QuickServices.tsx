import { Home, Car, Briefcase, CreditCard, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const quickServices = [
  {
    icon: Home,
    title: "Home Loan",
    badge: "Quick Sanction",
    description: "Instant approval at lowest rates",
    href: "/services/home-loan",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Briefcase,
    title: "Personal Loan",
    badge: "Quick Disbursal",
    description: "Paperless process at low rate",
    href: "/services/personal-loan",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Car,
    title: "Car Loan",
    badge: "Lowest EMI Ride",
    description: "Drive away your dream car",
    href: "/services/car-loan",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: CreditCard,
    title: "Credit Card",
    badge: "Rewards Unlimited",
    description: "Cards from all top banks",
    href: "/services/credit-cards",
    color: "from-purple-500 to-purple-600",
  },
];

const QuickServices = () => {
  return (
    <section className="py-6 md:py-10 bg-card">
      <div className="container px-4">
        {/* Mobile: Horizontal scroll | Desktop: Grid */}
        <div className="overflow-x-auto -mx-4 px-4 pb-2 md:overflow-visible md:mx-0 md:px-0 md:pb-0">
          <div className="flex gap-3 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4">
            {quickServices.map((service, index) => (
              <Link
                key={index}
                to={service.href}
                className="relative flex-shrink-0 w-[200px] md:w-auto bg-background rounded-xl border border-border p-4 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Badge */}
                <span className="absolute -top-2 right-3 text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">
                  {service.badge}
                </span>

                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}>
                    <service.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm mb-0.5">
                      {service.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center text-primary text-xs font-medium group-hover:gap-2 transition-all">
                  Apply Now
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickServices;
