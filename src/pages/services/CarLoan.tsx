import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  CheckCircle, 
  FileText, 
  Calculator, 
  Clock, 
  Percent,
  Shield,
  Zap,
  ArrowRight,
  Phone
} from "lucide-react";
import serviceImage from "@/assets/service-car-loan.jpg";
import { Link } from "react-router-dom";

const CarLoan = () => {
  const features = [
    { icon: Percent, title: "From 7.99% p.a.", description: "Competitive interest rates" },
    { icon: Zap, title: "Same Day Approval", description: "Drive home today" },
    { icon: Shield, title: "100% Financing", description: "Including on-road price" },
    { icon: Clock, title: "7 Year Tenure", description: "Flexible repayment options" },
  ];

  const eligibility = [
    "Indian Resident",
    "Age: 21-65 years",
    "Minimum income: ₹20,000/month",
    "Employment: Salaried or Self-employed",
    "Minimum work experience: 1 year",
    "Credit score: 650+ preferred",
  ];

  const documents = [
    "Identity Proof (Aadhaar, PAN)",
    "Address Proof",
    "Income Proof (Last 3 months salary slips)",
    "Bank Statements (6 months)",
    "Passport size photographs",
    "Vehicle quotation from dealer",
  ];

  const carTypes = [
    { type: "New Car", rate: "7.99%", funding: "100%", tenure: "7 years" },
    { type: "Used Car (0-3 yrs)", rate: "9.50%", funding: "85%", tenure: "5 years" },
    { type: "Used Car (3-5 yrs)", rate: "10.50%", funding: "75%", tenure: "4 years" },
    { type: "Luxury Car", rate: "8.25%", funding: "90%", tenure: "7 years" },
  ];

  return (
    <>
      <Helmet>
        <title>Car Loan - Finonest | Rates from 7.99% | 100% Financing Available</title>
        <meta name="description" content="Drive your dream car with Finonest car loans. Interest rates from 7.99% p.a., 100% financing, same-day approval. New & used car loans available. Apply now!" />
        <meta name="keywords" content="car loan, auto loan, vehicle loan, new car finance, used car loan, best car loan rates India" />
        <link rel="canonical" href="https://finonest.com/services/car-loan" />
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
                    <Car className="w-4 h-4" />
                    Car Loan
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-bold">
                    INSTANT APPROVAL
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                  Drive Your Dream <span className="text-gradient">Car Today</span>
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Get behind the wheel of your dream car with our easy car loans. 
                  Enjoy competitive rates starting at 7.99% p.a., 100% on-road 
                  financing, and same-day approval.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <Button size="lg" className="shadow-lg" asChild>
                    <Link to="/contact">
                      Apply Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="tel:+919876543210">
                      <Phone className="w-5 h-5 mr-2" />
                      Call Expert
                    </a>
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="text-center p-3 bg-card rounded-lg border border-border">
                      <feature.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-sm font-semibold text-foreground">{feature.title}</div>
                      <div className="text-xs text-muted-foreground">{feature.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative animate-slide-up">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={serviceImage} 
                    alt="Happy customer receiving car keys" 
                    className="w-full h-[450px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                  
                  {/* Stats Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-card/90 backdrop-blur p-4 rounded-xl border border-border">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">₹1Cr</div>
                          <div className="text-xs text-muted-foreground">Max Amount</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">7 Yrs</div>
                          <div className="text-xs text-muted-foreground">Max Tenure</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">7.99%</div>
                          <div className="text-xs text-muted-foreground">Starting Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Car Loan Types */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Loan Types
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Choose Your Car Loan
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Whether it's a new sedan or a pre-owned SUV, we've got you covered.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {carTypes.map((car, index) => (
                <div 
                  key={index}
                  className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all text-center"
                >
                  <Car className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-4">{car.type}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rate from</span>
                      <span className="font-bold text-primary">{car.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Funding</span>
                      <span className="font-medium text-foreground">{car.funding}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tenure</span>
                      <span className="font-medium text-foreground">{car.tenure}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility & Documents */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Eligibility</h2>
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

              <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Documents</h2>
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
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Ready to Hit the Road?
                </h2>
                <p className="text-primary-foreground/80 max-w-xl">
                  Get pre-approved for your car loan in minutes. Our experts will 
                  help you find the best deal from our partner banks.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/contact">
                    Apply Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to="/#calculator">
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

export default CarLoan;
