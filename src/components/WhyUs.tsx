import { CheckCircle2, Users, Award, Headphones, FileCheck, Zap } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import whyQuickApproval from "@/assets/why-quick-approval.jpg";
import whySimpleProcess from "@/assets/why-simple-process.jpg";
import whyBestRates from "@/assets/why-best-rates.jpg";
import whySupport from "@/assets/why-support.jpg";
import whyPartners from "@/assets/why-partners.jpg";
import whyTransparent from "@/assets/why-transparent.jpg";

const features = [{
  icon: Zap,
  title: "Quick Approval",
  description: "Get your loan approved within 24 hours with minimal documentation",
  image: whyQuickApproval
}, {
  icon: FileCheck,
  title: "Simple Process",
  description: "Easy online application with doorstep document collection",
  image: whySimpleProcess
}, {
  icon: Award,
  title: "Best Rates",
  description: "Competitive interest rates with flexible repayment options",
  image: whyBestRates
}, {
  icon: Headphones,
  title: "24/7 Support",
  description: "Dedicated relationship managers for personalized assistance",
  image: whySupport
}, {
  icon: Users,
  title: "50+ Bank Partners",
  description: "Wide network of banking partners for best loan offers",
  image: whyPartners
}, {
  icon: CheckCircle2,
  title: "100% Transparent",
  description: "No hidden charges or processing fees surprises",
  image: whyTransparent
}];

const WhyUs = () => {
  const {
    ref: headerRef,
    isRevealed: headerRevealed
  } = useScrollReveal();
  const {
    ref: gridRef,
    isRevealed: gridRevealed
  } = useScrollReveal({
    threshold: 0.05
  });

  return (
    <section id="why-us" className="py-10 md:py-24 relative overflow-hidden bg-gradient-section-alt">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-16 items-center">
          {/* Left Content */}
          <div ref={headerRef} className={`reveal-on-scroll ${headerRevealed ? 'revealed' : ''}`}>
            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-accent/10 text-accent text-xs md:text-sm font-medium mb-2 md:mb-4">
              Why Choose Us
            </span>
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6 leading-tight">
              We Make{" "}
              <span className="text-gradient-accent">Financial Freedom</span>{" "}
              Accessible
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg mb-4 md:mb-8 hidden md:block">
              With over 5 years of experience and 50,000+ satisfied customers, 
              Finonest has become India's trusted partner for all financial needs. 
              We believe everyone deserves access to fair and transparent financial services.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              
              
            </div>
          </div>

          {/* Right Grid - 2x2 on mobile */}
          <div ref={gridRef} className="grid grid-cols-2 gap-3 md:gap-4">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className={`bg-card rounded-xl md:rounded-2xl overflow-hidden shadow-lg card-hover group card-scroll-reveal ${gridRevealed ? 'revealed' : ''}`} 
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-20 md:h-32 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
                  <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-background/90 flex items-center justify-center shadow-lg">
                    <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-3 md:p-4">
                  <h3 className="font-display text-xs md:text-base font-semibold mb-1">{feature.title}</h3>
                  <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed hidden md:block">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;