import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  CheckCircle, 
  FileText, 
  Gift, 
  Plane, 
  ShoppingBag,
  Fuel,
  Percent,
  ArrowRight,
  Phone,
  Star
} from "lucide-react";
import serviceImage from "@/assets/service-credit-cards.jpg";
import { Link } from "react-router-dom";

const CreditCards = () => {
  const cardTypes = [
    { 
      title: "Rewards Card", 
      icon: Gift, 
      benefits: ["5X reward points", "Welcome bonus", "Lounge access"],
      annualFee: "₹499",
      highlight: "Best for everyday spends"
    },
    { 
      title: "Travel Card", 
      icon: Plane, 
      benefits: ["Air miles", "Free lounge", "Travel insurance"],
      annualFee: "₹2,999",
      highlight: "For frequent flyers"
    },
    { 
      title: "Shopping Card", 
      icon: ShoppingBag, 
      benefits: ["Cashback offers", "EMI options", "Brand discounts"],
      annualFee: "₹999",
      highlight: "For shopaholics"
    },
    { 
      title: "Fuel Card", 
      icon: Fuel, 
      benefits: ["Fuel surcharge waiver", "1% cashback", "Partner offers"],
      annualFee: "₹0",
      highlight: "For daily commuters"
    },
  ];

  const eligibility = [
    "Indian Resident",
    "Age: 21-65 years",
    "Minimum income: ₹25,000/month",
    "Salaried or Self-employed",
    "Good credit score (700+)",
    "Clean repayment history",
  ];

  const documents = [
    "PAN Card",
    "Aadhaar Card",
    "Latest salary slip",
    "Bank statement (3 months)",
    "Passport size photo",
  ];

  const banks = ["HDFC", "ICICI", "SBI", "Axis", "Kotak", "RBL", "IndusInd", "Yes Bank"];

  return (
    <>
      <Helmet>
        <title>Credit Cards - FinoNest | Best Rewards, Travel & Cashback Cards</title>
        <meta name="description" content="Compare and apply for the best credit cards in India with FinoNest. Rewards, travel, cashback cards from HDFC, ICICI, SBI & more. Instant approval available." />
        <meta name="keywords" content="credit card, best credit card India, rewards credit card, travel credit card, cashback card, credit card apply" />
        <link rel="canonical" href="https://finonest.in/services/credit-cards" />
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
                    <CreditCard className="w-4 h-4" />
                    Credit Cards
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-bold">
                    BEST OFFERS
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                  Smart Cards for <span className="text-gradient">Smart Spenders</span>
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Find the perfect credit card that matches your lifestyle. Compare 
                  rewards, travel, and cashback cards from India's top banks and 
                  get instant approval.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <Button size="lg" className="shadow-lg" asChild>
                    <Link to="/contact">
                      Get Your Card
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="tel:+919876543210">
                      <Phone className="w-5 h-5 mr-2" />
                      Expert Advice
                    </a>
                  </Button>
                </div>

                {/* Partner Banks */}
                <div className="bg-card p-4 rounded-xl border border-border">
                  <div className="text-sm text-muted-foreground mb-3">Partner Banks:</div>
                  <div className="flex flex-wrap gap-3">
                    {banks.map((bank) => (
                      <span key={bank} className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-foreground">
                        {bank}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative animate-slide-up">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={serviceImage} 
                    alt="Premium credit cards" 
                    className="w-full h-[450px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Card Types */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Card Categories
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Choose Your Card Type
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cardTypes.map((card, index) => (
                <div 
                  key={index}
                  className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <card.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-primary text-sm font-medium mb-4">{card.highlight}</p>
                  <ul className="space-y-2 mb-4">
                    {card.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-accent" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-border">
                    <span className="text-muted-foreground text-sm">Annual Fee: </span>
                    <span className="font-bold text-foreground">{card.annualFee}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Why FinoNest?
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  Get More Than Just a Card
                </h2>
                <div className="space-y-4">
                  {[
                    "Compare cards from 15+ banks in one place",
                    "Expert guidance to choose the right card",
                    "Instant approval and doorstep delivery",
                    "Exclusive welcome offers and bonuses",
                    "Lifetime free options available",
                    "Higher credit limits based on profile",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-6 rounded-xl border border-border text-center">
                  <Percent className="w-10 h-10 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">0%</div>
                  <div className="text-sm text-muted-foreground">Interest on EMI</div>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border text-center">
                  <Gift className="w-10 h-10 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">5X</div>
                  <div className="text-sm text-muted-foreground">Reward Points</div>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border text-center">
                  <Plane className="w-10 h-10 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">8+</div>
                  <div className="text-sm text-muted-foreground">Lounge Visits</div>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border text-center">
                  <CreditCard className="w-10 h-10 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">₹10L</div>
                  <div className="text-sm text-muted-foreground">Max Credit Limit</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility & Documents */}
        <section className="py-16 bg-muted/30">
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
                <p className="text-sm text-muted-foreground mt-6 pt-4 border-t border-border">
                  Most cards can be applied with just Aadhaar & PAN!
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
                  Ready to Upgrade Your Wallet?
                </h2>
                <p className="text-primary-foreground/80 max-w-xl">
                  Get expert help to find the perfect credit card for your needs. 
                  Instant approval, exclusive offers, and doorstep delivery.
                </p>
              </div>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">
                  Apply Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
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

export default CreditCards;
