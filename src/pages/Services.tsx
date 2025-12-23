import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Car, 
  Wallet, 
  Briefcase, 
  CreditCard, 
  Building,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import serviceHomeLoan from "@/assets/service-home-loan.jpg";
import serviceCarLoan from "@/assets/service-car-loan.jpg";
import servicePersonalLoan from "@/assets/service-personal-loan.jpg";
import serviceBusinessLoan from "@/assets/service-business-loan.jpg";
import serviceCreditCards from "@/assets/service-credit-cards.jpg";
import serviceLap from "@/assets/service-lap.jpg";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Home Loan",
      description: "Make your dream home a reality with competitive rates starting at 8.35% p.a.",
      image: serviceHomeLoan,
      rate: "8.35%",
      maxAmount: "₹5 Crore",
      tenure: "30 Years",
      link: "/services/home-loan",
      features: ["Up to 90% financing", "Balance transfer option", "Tax benefits available"],
    },
    {
      icon: Car,
      title: "Car Loan",
      description: "Drive your dream car today with instant approval and 100% on-road financing.",
      image: serviceCarLoan,
      rate: "7.99%",
      maxAmount: "₹1 Crore",
      tenure: "7 Years",
      link: "/services/car-loan",
      features: ["100% on-road financing", "New & used cars", "Same day approval"],
    },
    {
      icon: Wallet,
      title: "Personal Loan",
      description: "Quick funds for all your needs with minimal documentation and instant disbursal.",
      image: servicePersonalLoan,
      rate: "10.49%",
      maxAmount: "₹40 Lakhs",
      tenure: "5 Years",
      link: "/services/personal-loan",
      features: ["No collateral required", "24-hour disbursal", "Flexible usage"],
    },
    {
      icon: Briefcase,
      title: "Business Loan",
      description: "Fuel your business growth with flexible financing options up to ₹5 crore.",
      image: serviceBusinessLoan,
      rate: "11.5%",
      maxAmount: "₹5 Crore",
      tenure: "7 Years",
      link: "/services/business-loan",
      features: ["Collateral-free options", "Quick processing", "MSME special rates"],
    },
    {
      icon: CreditCard,
      title: "Credit Cards",
      description: "Find the perfect credit card with amazing rewards, cashback, and travel benefits.",
      image: serviceCreditCards,
      rate: "Lifetime Free*",
      maxAmount: "₹10 Lakhs",
      tenure: "N/A",
      link: "/services/credit-cards",
      features: ["Best rewards", "Travel perks", "Welcome bonuses"],
    },
    {
      icon: Building,
      title: "Loan Against Property",
      description: "Unlock your property's value without selling it. Get up to 70% of property value.",
      image: serviceLap,
      rate: "8.75%",
      maxAmount: "₹10 Crore",
      tenure: "20 Years",
      link: "/services/loan-against-property",
      features: ["High LTV ratio", "Multiple property types", "Lower interest rates"],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Our Services - Finonest | Home, Car, Personal & Business Loans</title>
        <meta name="description" content="Explore Finonest's range of financial services including home loans, car loans, personal loans, business loans, credit cards, and loan against property. Best rates guaranteed." />
        <meta name="keywords" content="loan services, home loan, car loan, personal loan, business loan, credit cards, LAP, Finonest services" />
        <link rel="canonical" href="https://finonest.com/services" />
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-background pb-16 lg:pb-0">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          
          <div className="container relative z-10">
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                Our Services
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                Financial Solutions <span className="text-gradient">For Every Need</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                From buying your first home to expanding your business, we offer comprehensive 
                financial solutions tailored to your needs with the best rates from 50+ partner banks.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className={`grid lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                      
                      {/* Stats Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-card/90 backdrop-blur p-4 rounded-xl border border-border">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-lg font-bold text-primary">{service.rate}</div>
                              <div className="text-xs text-muted-foreground">Starting Rate</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-primary">{service.maxAmount}</div>
                              <div className="text-xs text-muted-foreground">Max Amount</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-primary">{service.tenure}</div>
                              <div className="text-xs text-muted-foreground">Max Tenure</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h2 className="text-3xl font-display font-bold text-foreground">{service.title}</h2>
                    </div>
                    
                    <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-4">
                      <Button size="lg" asChild>
                        <Link to={service.link}>
                          Learn More
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link to="/contact">Apply Now</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Not Sure Which Loan Is Right for You?
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Our expert advisors will help you find the perfect financial solution 
                based on your needs and eligibility. Get free consultation today!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/contact">
                    Get Free Consultation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <a href="tel:+919876543210">Call Now</a>
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

export default Services;
