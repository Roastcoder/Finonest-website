import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  CheckCircle, 
  FileText, 
  Calculator, 
  Clock, 
  Percent,
  Shield,
  Users,
  ArrowRight,
  Phone
} from "lucide-react";
import serviceImage from "@/assets/service-home-loan.jpg";
import { Link } from "react-router-dom";

const HomeLoan = () => {
  const features = [
    { icon: Percent, title: "Starting 8.35% p.a.", description: "Industry's lowest interest rates" },
    { icon: Clock, title: "24 Hour Approval", description: "Quick sanction & disbursement" },
    { icon: Shield, title: "100% Transparent", description: "No hidden charges guaranteed" },
    { icon: Users, title: "50+ Bank Partners", description: "Best rates from top lenders" },
  ];

  const eligibility = [
    "Indian Resident or NRI",
    "Age: 21-65 years",
    "Minimum income: ₹25,000/month",
    "Employment: Salaried or Self-employed",
    "Minimum work experience: 2 years",
    "Good credit score (650+)",
  ];

  const documents = [
    "Identity Proof (Aadhaar, PAN, Passport)",
    "Address Proof (Utility bills, Rent agreement)",
    "Income Proof (Salary slips, ITR, Bank statements)",
    "Property Documents",
    "Passport size photographs",
    "Employment/Business proof",
  ];

  const loanAmounts = [
    { range: "₹10L - ₹25L", rate: "8.50%", tenure: "Up to 20 years" },
    { range: "₹25L - ₹50L", rate: "8.45%", tenure: "Up to 25 years" },
    { range: "₹50L - ₹1Cr", rate: "8.40%", tenure: "Up to 30 years" },
    { range: "₹1Cr+", rate: "8.35%", tenure: "Up to 30 years" },
  ];

  return (
    <>
      <Helmet>
        <title>Home Loan - Finonest | Rates Starting 8.35% p.a. | Quick Approval</title>
        <meta name="description" content="Get home loans starting at 8.35% p.a. with Finonest. Up to ₹5Cr financing, 30-year tenure, 24-hour approval. Compare rates from 50+ banks. Apply now!" />
        <meta name="keywords" content="home loan, housing loan, property loan, home finance, mortgage loan India, best home loan rates" />
        <link rel="canonical" href="https://finonest.com/services/home-loan" />
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
                    <Home className="w-4 h-4" />
                    Home Loan
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-bold">
                    LOWEST RATES
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                  Your Dream Home <span className="text-gradient">Awaits You</span>
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Get the keys to your dream home with our affordable home loans. 
                  Enjoy competitive interest rates starting at just 8.35% p.a., 
                  flexible tenure up to 30 years, and hassle-free approval process.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <Button size="lg" className="shadow-lg" asChild>
                    <Link to="/services/home-loan/apply">
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
                    alt="Happy family with new home keys" 
                    className="w-full h-[450px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                  
                  {/* Stats Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-card/90 backdrop-blur p-4 rounded-xl border border-border">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">₹5Cr</div>
                          <div className="text-xs text-muted-foreground">Max Amount</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">30 Yrs</div>
                          <div className="text-xs text-muted-foreground">Max Tenure</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">8.35%</div>
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

        {/* Interest Rate Table */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Interest Rates
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Transparent Pricing
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                No hidden charges. What you see is what you get.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
                <div className="grid grid-cols-3 bg-primary text-primary-foreground p-4 font-semibold text-center">
                  <div>Loan Amount</div>
                  <div>Interest Rate</div>
                  <div>Max Tenure</div>
                </div>
                {loanAmounts.map((loan, index) => (
                  <div 
                    key={index}
                    className={`grid grid-cols-3 p-4 text-center ${
                      index % 2 === 0 ? 'bg-muted/30' : 'bg-card'
                    }`}
                  >
                    <div className="font-medium text-foreground">{loan.range}</div>
                    <div className="text-primary font-bold">{loan.rate}</div>
                    <div className="text-muted-foreground">{loan.tenure}</div>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                * Rates are subject to credit profile and may vary. Terms & conditions apply.
              </p>
            </div>
          </div>
        </section>

        {/* Eligibility & Documents */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Eligibility */}
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

              {/* Documents */}
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
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Ready to Own Your Dream Home?
                </h2>
                <p className="text-primary-foreground/80 max-w-xl">
                  Get pre-approved in minutes and find the best home loan rates from our 
                  50+ partner banks. Our experts will guide you through every step.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/services/home-loan/apply">
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

export default HomeLoan;
