import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { 
  Building, 
  CheckCircle, 
  FileText, 
  Calculator, 
  Clock, 
  Percent,
  Shield,
  TrendingUp,
  ArrowRight,
  Phone
} from "lucide-react";
import serviceImage from "@/assets/service-lap.jpg";
import { Link } from "react-router-dom";

const LoanAgainstProperty = () => {
  const features = [
    { icon: Percent, title: "From 8.75% p.a.", description: "Low interest rates" },
    { icon: TrendingUp, title: "Up to 70% LTV", description: "Of property value" },
    { icon: Shield, title: "Retain Ownership", description: "Property stays yours" },
    { icon: Clock, title: "20 Yr Tenure", description: "Flexible repayment" },
  ];

  const propertyTypes = [
    { title: "Residential", description: "Apartments, houses, villas", ltv: "70%" },
    { title: "Commercial", description: "Shops, offices, warehouses", ltv: "60%" },
    { title: "Industrial", description: "Factories, manufacturing units", ltv: "55%" },
    { title: "Land", description: "Plots (with construction)", ltv: "50%" },
  ];

  const eligibility = [
    "Clear property title",
    "Property age < 40 years",
    "Applicant age: 25-70 years",
    "Stable income source",
    "Good credit score (650+)",
    "Property in municipal limits",
  ];

  const documents = [
    "Property documents (original)",
    "Identity & address proof",
    "Income proof (ITR/Salary slips)",
    "Bank statements (12 months)",
    "Property valuation report",
    "NOC from society/builder",
  ];

  return (
    <>
      <Helmet>
        <title>Loan Against Property - Finonest | Up to 70% LTV | Low Rates 8.75%</title>
        <meta name="description" content="Unlock your property's value with Finonest LAP. Get up to 70% of property value, rates from 8.75% p.a., 20-year tenure. Residential & commercial properties accepted." />
        <meta name="keywords" content="loan against property, LAP, property loan, mortgage loan, home equity loan, secured loan India" />
        <link rel="canonical" href="https://finonest.com/services/loan-against-property" />
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
                    <Building className="w-4 h-4" />
                    Loan Against Property
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-bold">
                    HIGH VALUE
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                  Unlock Your Property's <span className="text-gradient">True Value</span>
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Convert your property into cash without selling it. Get up to 70% 
                  of your property value at attractive interest rates starting 8.75% p.a. 
                  with tenure up to 20 years.
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
                      Free Consultation
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
                    alt="Commercial property building" 
                    className="w-full h-[450px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-card/90 backdrop-blur p-4 rounded-xl border border-border">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">₹10Cr</div>
                          <div className="text-xs text-muted-foreground">Max Amount</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">20 Yrs</div>
                          <div className="text-xs text-muted-foreground">Max Tenure</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">8.75%</div>
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

        {/* Property Types */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Accepted Properties
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                What Properties We Accept
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {propertyTypes.map((property, index) => (
                <div 
                  key={index}
                  className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all text-center"
                >
                  <Building className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{property.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{property.description}</p>
                  <div className="pt-3 border-t border-border">
                    <span className="text-muted-foreground text-sm">LTV: </span>
                    <span className="font-bold text-primary">{property.ltv}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Use Cases
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Use Your Funds For
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { title: "Business Expansion", description: "Scale your operations" },
                { title: "Debt Consolidation", description: "Clear high-interest loans" },
                { title: "Education", description: "Higher studies abroad" },
                { title: "Medical Treatment", description: "Healthcare expenses" },
                { title: "Wedding Expenses", description: "Grand celebrations" },
                { title: "Working Capital", description: "Business cash flow" },
              ].map((useCase, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border"
                >
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">{useCase.title}</h3>
                    <p className="text-muted-foreground text-sm">{useCase.description}</p>
                  </div>
                </div>
              ))}
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
                  Get Maximum Value from Your Property
                </h2>
                <p className="text-primary-foreground/80 max-w-xl">
                  Our experts will help you get the best valuation and loan terms 
                  for your property. Free property evaluation included.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/contact">
                    Get Free Valuation
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

export default LoanAgainstProperty;
