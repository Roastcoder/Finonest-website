import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { 
  Wallet, 
  CheckCircle, 
  FileText, 
  Calculator, 
  Clock, 
  Percent,
  Zap,
  FileCheck,
  ArrowRight,
  Phone
} from "lucide-react";
import serviceImage from "@/assets/service-personal-loan.jpg";
import { Link } from "react-router-dom";

const PersonalLoan = () => {
  const features = [
    { icon: Percent, title: "From 10.49% p.a.", description: "Attractive interest rates" },
    { icon: Zap, title: "Instant Disbursal", description: "Money in 24 hours" },
    { icon: FileCheck, title: "Minimal Docs", description: "Paperless process" },
    { icon: Clock, title: "5 Year Tenure", description: "Easy repayment" },
  ];

  const useCases = [
    { title: "Wedding Expenses", description: "Make your special day memorable" },
    { title: "Medical Emergency", description: "Healthcare when you need it" },
    { title: "Home Renovation", description: "Transform your living space" },
    { title: "Travel & Vacation", description: "Explore the world" },
    { title: "Debt Consolidation", description: "Simplify your finances" },
    { title: "Education", description: "Invest in your future" },
  ];

  const eligibility = [
    "Indian Resident",
    "Age: 21-60 years",
    "Minimum income: ₹25,000/month",
    "Salaried with 1+ year experience",
    "Credit score: 700+ preferred",
    "Stable employment history",
  ];

  const documents = [
    "PAN Card & Aadhaar Card",
    "Latest 3 months salary slips",
    "6 months bank statement",
    "Employment ID proof",
    "Passport size photograph",
  ];

  return (
    <>
      <Helmet>
        <title>Personal Loan - Finonest | Instant Approval | Up to ₹40 Lakhs</title>
        <meta name="description" content="Get instant personal loans up to ₹40 lakhs with Finonest. Interest from 10.49% p.a., minimal documentation, 24-hour disbursal. Apply online now!" />
        <meta name="keywords" content="personal loan, instant loan, quick loan, unsecured loan, personal finance, fast loan approval India" />
        <link rel="canonical" href="https://finonest.com/services/personal-loan" />
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
                    <Wallet className="w-4 h-4" />
                    Personal Loan
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-bold">
                    INSTANT MONEY
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                  Your Goals, <span className="text-gradient">Our Support</span>
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Whether it's a dream wedding, home renovation, or medical emergency – 
                  get instant personal loans up to ₹40 lakhs with minimal documentation 
                  and 24-hour disbursal.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <Button size="lg" className="shadow-lg" asChild>
                    <Link to="/services/personal-loan/apply">
                      Get Loan Now
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
                    alt="Person applying for personal loan online" 
                    className="w-full h-[450px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-card/90 backdrop-blur p-4 rounded-xl border border-border">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">₹40L</div>
                          <div className="text-xs text-muted-foreground">Max Amount</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">5 Yrs</div>
                          <div className="text-xs text-muted-foreground">Max Tenure</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">10.49%</div>
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

        {/* Use Cases */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Use Cases
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Use It For Anything
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                No restrictions on how you use your personal loan
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <div 
                  key={index}
                  className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{useCase.title}</h3>
                  <p className="text-muted-foreground text-sm">{useCase.description}</p>
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
                <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
                  * For salaried individuals. Self-employed may require additional documents.
                </p>
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
                  Need Funds Urgently?
                </h2>
                <p className="text-primary-foreground/80 max-w-xl">
                  Get instant approval and money in your account within 24 hours. 
                  Minimal documentation, maximum convenience.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/services/personal-loan/apply">
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

export default PersonalLoan;
