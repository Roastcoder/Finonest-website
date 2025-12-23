import { Home, Car, Briefcase, Building, CreditCard, Landmark, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import serviceHomeLoan from "@/assets/service-home-loan.jpg";
import serviceCarLoan from "@/assets/service-car-loan.jpg";
import servicePersonalLoan from "@/assets/service-personal-loan.jpg";
import serviceBusinessLoan from "@/assets/service-business-loan.jpg";
import serviceCreditCards from "@/assets/service-credit-cards.jpg";
import serviceLap from "@/assets/service-lap.jpg";
const services = [{
  icon: Home,
  title: "Home Loan",
  description: "Turn your dream home into reality with our competitive home loan rates starting at 6.5% p.a.",
  rate: "6.5%",
  highlight: false,
  image: serviceHomeLoan,
  link: "/services/home-loan"
}, {
  icon: Car,
  title: "Used Car Loan",
  description: "Get the best deals on used car loans with quick approval and minimal documentation. Our specialty!",
  rate: "7.5%",
  highlight: true,
  image: serviceCarLoan,
  link: "/services/used-car-loan"
}, {
  icon: Briefcase,
  title: "Personal Loan",
  description: "Instant approval up to ₹40 lakhs with minimal documentation required for all your needs.",
  rate: "10.5%",
  highlight: false,
  image: servicePersonalLoan,
  link: "/services/personal-loan"
}, {
  icon: Building,
  title: "Business Loan",
  description: "Fuel your business growth with flexible business loans up to ₹5 Crore.",
  rate: "11.0%",
  highlight: false,
  image: serviceBusinessLoan,
  link: "/services/business-loan"
}, {
  icon: CreditCard,
  title: "Credit Cards",
  description: "Premium credit cards with exclusive rewards, cashback, and travel benefits.",
  rate: "0% EMI",
  highlight: false,
  image: serviceCreditCards,
  link: "/services/credit-cards"
}, {
  icon: Landmark,
  title: "Loan Against Property",
  description: "Unlock the value of your property with our loan against property options.",
  rate: "9.5%",
  highlight: false,
  image: serviceLap,
  link: "/services/loan-against-property"
}];
const Services = () => {
  return (
    <section className="py-12 md:py-20 bg-muted/30" id="services">
      <div className="container px-4">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Financial Solutions for Everyone
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From home loans to business financing, we offer comprehensive solutions tailored to your needs
          </p>
        </div>

        {/* Horizontal scroll on mobile */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 md:overflow-visible md:mx-0 md:px-0">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 min-w-max md:min-w-0">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className={`group bg-card rounded-xl border overflow-hidden hover:shadow-xl transition-all duration-300 w-[280px] md:w-auto flex-shrink-0 ${
                  service.highlight ? 'border-accent ring-2 ring-accent/20' : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="relative h-32 md:h-40 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  {service.highlight && (
                    <span className="absolute top-2 right-2 px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      Popular
                    </span>
                  )}
                  <div className="absolute bottom-2 left-2 flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <service.icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-bold text-foreground bg-background/80 px-2 py-0.5 rounded">
                      From {service.rate}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {service.description}
                  </p>
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