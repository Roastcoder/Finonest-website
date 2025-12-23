import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  CheckCircle, 
  FileText, 
  Calculator, 
  Clock, 
  Percent,
  TrendingUp,
  Shield,
  ArrowRight,
  Phone
} from "lucide-react";
import serviceImage from "@/assets/service-business-loan.jpg";
import { Link } from "react-router-dom";

const BusinessLoan = () => {
  const features = [
    { icon: Percent, title: "From 11.5% p.a.", description: "Competitive business rates" },
    { icon: TrendingUp, title: "Up to ₹5 Crore", description: "Scale your business" },
    { icon: Shield, title: "Collateral Free", description: "Up to ₹75 Lakhs" },
    { icon: Clock, title: "Quick Disbursal", description: "Within 72 hours" },
  ];

  const loanTypes = [
    { title: "Term Loan", description: "Lump sum for expansion", amount: "₹10L - ₹5Cr" },
    { title: "Working Capital", description: "Manage cash flow", amount: "₹5L - ₹2Cr" },
    { title: "Machinery Loan", description: "Equipment financing", amount: "₹10L - ₹3Cr" },
    { title: "MSME Loan", description: "For small businesses", amount: "₹1L - ₹1Cr" },
  ];

  const eligibility = [
    "Business vintage: 2+ years",
    "Annual turnover: ₹25 Lakhs+",
    "Profitable for last 2 years",
    "ITR filed for last 2 years",
    "Good credit history",
    "Valid business registration",
  ];

  const documents = [
    "Business Registration/GST Certificate",
    "PAN & Aadhaar of promoters",
    "Last 2 years ITR with computation",
    "12 months bank statements",
    "Last 2 years audited financials",
    "Business proof & address proof",
  ];

  return (
    <>
      <Helmet>
        <title>Business Loan - Finonest | Up to ₹5 Crore | Collateral Free Options</title>
        <meta name="description" content="Grow your business with Finonest business loans. Up to ₹5 crore financing, collateral-free options up to ₹75 lakhs, competitive rates from 11.5% p.a." />
        <meta name="keywords" content="business loan, MSME loan, working capital loan, term loan, business finance India, commercial loan" />
        <link rel="canonical" href="https://finonest.com/services/business-loan" />
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
                    <Briefcase className="w-4 h-4" />
                    Business Loan
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-bold">
                    MSME SPECIAL
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                  Fuel Your Business <span className="text-gradient">Growth</span>
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Take your business to new heights with our flexible financing solutions. 
                  Get up to ₹5 crore for expansion, working capital, or equipment – 
                  with collateral-free options available.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <Button size="lg" className="shadow-lg" asChild>
                    <Link to="/services/business-loan/apply">
                      Apply Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="tel:+919462553887">
                      <Phone className="w-5 h-5 mr-2" />
                      Talk to Expert
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
                    alt="Successful business owner" 
                    className="w-full h-[450px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-card/90 backdrop-blur p-4 rounded-xl border border-border">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">₹5Cr</div>
                          <div className="text-xs text-muted-foreground">Max Amount</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">₹75L</div>
                          <div className="text-xs text-muted-foreground">Collateral Free</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">11.5%</div>
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

        {/* Loan Types */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Loan Types
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Choose What Suits You
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {loanTypes.map((loan, index) => (
                <div 
                  key={index}
                  className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all text-center"
                >
                  <Briefcase className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{loan.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{loan.description}</p>
                  <div className="text-primary font-bold">{loan.amount}</div>
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
                  Ready to Scale Your Business?
                </h2>
                <p className="text-primary-foreground/80 max-w-xl">
                  Our business loan experts will help you find the right financing 
                  solution for your growth plans.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/services/business-loan/apply">
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

export default BusinessLoan;
