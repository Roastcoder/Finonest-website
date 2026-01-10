import { useState, useEffect } from "react";
import { Check, X, ArrowRight, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { publicCMSAPI } from "@/lib/api";

interface Service {
  _id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  rate?: string;
  highlight?: boolean;
  eligibility?: string[];
  features?: { title: string; description?: string }[];
}

const featureLabels: Record<string, string> = {
  quickApproval: "24hr Approval",
  noCollateral: "No Collateral",
  flexibleTenure: "Flexible Tenure",
  lowProcessing: "Low Processing Fee",
  preApproval: "Pre-Approval Available",
  balanceTransfer: "Balance Transfer",
};

const LoanComparison = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const res = await publicCMSAPI.listServices({ limit: 20 });
        if (res.status === 'ok' && res.data?.items) {
          setServices(res.data.items || []);
        }
      } catch (error) {
        console.error('Failed to load services for comparison:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);
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
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Services will appear here once published.
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 px-4 pb-4 md:overflow-visible md:mx-0 md:px-0 md:pb-0">
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 min-w-max md:min-w-0">
              {services.slice(0, 4).map((service) => (
                <div
                  key={service._id}
                  className={`relative card-hover p-4 md:p-6 w-[260px] md:w-auto flex-shrink-0 ${
                    service.highlight ? "ring-2 ring-primary shadow-lg" : ""
                  }`}
                >
                  {/* Featured Badge */}
                  {service.highlight && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-gradient-primary text-primary-foreground text-[10px] md:text-xs font-semibold">
                        <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="text-center mb-4 md:mb-6 pt-2">
                    <span className="text-3xl md:text-4xl mb-2 md:mb-3 block">💰</span>
                    <h3 className="font-display text-base md:text-xl font-bold text-foreground">{service.title}</h3>
                    {service.shortDescription && (
                      <p className="text-xs md:text-sm text-muted-foreground">{service.shortDescription}</p>
                    )}
                  </div>

                  {/* Rate */}
                  {service.rate && (
                    <div className="text-center py-3 md:py-4 border-y border-border mb-4 md:mb-6">
                      <span className="text-[10px] md:text-xs text-muted-foreground block mb-0.5 md:mb-1">Starting from</span>
                      <span className="text-2xl md:text-4xl font-display font-bold text-gradient-primary">{service.rate}</span>
                      <span className="text-xs md:text-sm text-muted-foreground"> p.a.</span>
                    </div>
                  )}

                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-1.5 md:space-y-2 mb-4 md:mb-6">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                          <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                          <span className="text-foreground">{feature.title}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Eligibility */}
                  {service.eligibility && service.eligibility.length > 0 && (
                    <div className="mb-4 md:mb-6">
                      <p className="text-[10px] md:text-xs font-semibold text-muted-foreground mb-1.5 md:mb-2">ELIGIBILITY</p>
                      <div className="flex flex-wrap gap-1">
                        {service.eligibility.slice(0, 3).map((item, idx) => (
                          <span key={idx} className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full bg-secondary text-secondary-foreground">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <Button 
                    variant={service.highlight ? "hero" : "outline"} 
                    className="w-full group text-xs md:text-sm"
                    size="sm"
                    asChild
                  >
                    <Link to={`/services/${service.slug}`}>
                      Apply Now
                      <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

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
