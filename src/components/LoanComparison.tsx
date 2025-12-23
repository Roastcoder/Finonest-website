import { Check, X, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const loanTypes = [
  {
    name: "Home Loan",
    description: "Own your dream home",
    rate: "8.5%",
    maxAmount: "₹5 Crore",
    tenure: "Up to 30 years",
    processing: "0.5%",
    featured: false,
    features: {
      quickApproval: true,
      noCollateral: false,
      flexibleTenure: true,
      lowProcessing: true,
      preApproval: true,
      balanceTransfer: true,
    },
    eligibility: ["Age 21-65", "Min Income ₹25,000/month", "CIBIL 700+"],
    icon: "🏠",
  },
  {
    name: "Personal Loan",
    description: "For all your needs",
    rate: "10.5%",
    maxAmount: "₹40 Lakh",
    tenure: "Up to 7 years",
    processing: "1%",
    featured: true,
    features: {
      quickApproval: true,
      noCollateral: true,
      flexibleTenure: true,
      lowProcessing: true,
      preApproval: true,
      balanceTransfer: true,
    },
    eligibility: ["Age 21-58", "Min Income ₹15,000/month", "CIBIL 650+"],
    icon: "💰",
  },
  {
    name: "Business Loan",
    description: "Grow your business",
    rate: "11%",
    maxAmount: "₹2 Crore",
    tenure: "Up to 5 years",
    processing: "1.5%",
    featured: false,
    features: {
      quickApproval: true,
      noCollateral: false,
      flexibleTenure: true,
      lowProcessing: false,
      preApproval: true,
      balanceTransfer: false,
    },
    eligibility: ["Business 2+ years", "ITR Required", "CIBIL 680+"],
    icon: "💼",
  },
  {
    name: "Car Loan",
    description: "Drive your dream",
    rate: "9%",
    maxAmount: "₹1 Crore",
    tenure: "Up to 7 years",
    processing: "0.5%",
    featured: false,
    features: {
      quickApproval: true,
      noCollateral: false,
      flexibleTenure: true,
      lowProcessing: true,
      preApproval: true,
      balanceTransfer: true,
    },
    eligibility: ["Age 21-65", "Min Income ₹20,000/month", "CIBIL 675+"],
    icon: "🚗",
  },
];

const featureLabels: Record<string, string> = {
  quickApproval: "24hr Approval",
  noCollateral: "No Collateral",
  flexibleTenure: "Flexible Tenure",
  lowProcessing: "Low Processing Fee",
  preApproval: "Pre-Approval Available",
  balanceTransfer: "Balance Transfer",
};

const LoanComparison = () => {
  return (
    <section id="compare" className="py-12 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-3 md:mb-4">
            Compare Loans
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6 text-foreground">
            Find the <span className="text-gradient-primary">Perfect Loan</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg px-2">
            Compare features, rates, and eligibility across all products
          </p>
        </div>

        {/* Comparison Cards - Horizontal scroll on mobile */}
        <div className="overflow-x-auto -mx-4 px-4 pb-4 md:overflow-visible md:mx-0 md:px-0 md:pb-0">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 min-w-max md:min-w-0">
          {loanTypes.map((loan, index) => (
            <div
              key={loan.name}
              className={`relative card-hover p-4 md:p-6 w-[260px] md:w-auto flex-shrink-0 ${
                loan.featured ? "ring-2 ring-primary shadow-lg" : ""
              }`}
            >
              {/* Featured Badge */}
              {loan.featured && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-gradient-primary text-primary-foreground text-[10px] md:text-xs font-semibold">
                    <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-4 md:mb-6 pt-2">
                <span className="text-3xl md:text-4xl mb-2 md:mb-3 block">{loan.icon}</span>
                <h3 className="font-display text-base md:text-xl font-bold text-foreground">{loan.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{loan.description}</p>
              </div>

              {/* Rate */}
              <div className="text-center py-3 md:py-4 border-y border-border mb-4 md:mb-6">
                <span className="text-[10px] md:text-xs text-muted-foreground block mb-0.5 md:mb-1">Starting from</span>
                <span className="text-2xl md:text-4xl font-display font-bold text-gradient-primary">{loan.rate}</span>
                <span className="text-xs md:text-sm text-muted-foreground"> p.a.</span>
              </div>

              {/* Key Details */}
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Max Amount</span>
                  <span className="font-semibold text-foreground">{loan.maxAmount}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Tenure</span>
                  <span className="font-semibold text-foreground">{loan.tenure}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Processing</span>
                  <span className="font-semibold text-foreground">{loan.processing}</span>
                </div>
              </div>

              {/* Features - Compact on mobile */}
              <div className="space-y-1.5 md:space-y-2 mb-4 md:mb-6">
                {Object.entries(loan.features).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                    {value ? (
                      <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground/50 flex-shrink-0" />
                    )}
                    <span className={value ? "text-foreground" : "text-muted-foreground/50"}>
                      {featureLabels[key]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Eligibility */}
              <div className="mb-4 md:mb-6">
                <p className="text-[10px] md:text-xs font-semibold text-muted-foreground mb-1.5 md:mb-2">ELIGIBILITY</p>
                <div className="flex flex-wrap gap-1">
                  {loan.eligibility.map((item) => (
                    <span key={item} className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full bg-secondary text-secondary-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button 
                variant={loan.featured ? "hero" : "outline"} 
                className="w-full group text-xs md:text-sm"
                size="sm"
              >
                Apply Now
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-muted-foreground text-sm md:text-base mb-3 md:mb-4">
            Not sure which loan is right? Our experts can help!
          </p>
          <Button variant="glass" size="default" className="group">
            Get Free Consultation
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LoanComparison;
