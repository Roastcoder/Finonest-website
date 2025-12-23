import { FileText, Search, CheckCircle, Wallet, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import stepApplyOnline from "@/assets/step-apply-online.jpg";
import stepDocumentVerify from "@/assets/step-document-verify.jpg";
import stepApproval from "@/assets/step-approval.jpg";
import stepDisbursement from "@/assets/step-disbursement.jpg";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Apply Online",
    description: "Fill out our simple online application form in just 5 minutes with basic details",
    color: "primary",
    image: stepApplyOnline,
  },
  {
    icon: Search,
    step: "02", 
    title: "Document Verification",
    description: "Upload documents digitally or opt for doorstep pickup by our executive",
    color: "accent",
    image: stepDocumentVerify,
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Quick Approval",
    description: "Get approval within 24 hours after document verification is complete",
    color: "primary",
    image: stepApproval,
  },
  {
    icon: Wallet,
    step: "04",
    title: "Loan Disbursement",
    description: "Amount credited directly to your bank account within 48 hours of approval",
    color: "accent",
    image: stepDisbursement,
  },
];

const ProcessSteps = () => {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { ref: stepsRef, isRevealed: stepsRevealed } = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="process" className="py-10 md:py-24 relative overflow-hidden bg-gradient-section">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-6 md:mb-20 reveal-on-scroll ${headerRevealed ? 'revealed' : ''}`}
        >
          <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-accent/10 text-accent text-xs md:text-sm font-medium mb-2 md:mb-4">
            How It Works
          </span>
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-6">
            Get Your Loan in{" "}
            <span className="text-gradient-accent">4 Simple Steps</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg hidden md:block">
            Our streamlined process ensures you get your funds quickly with minimum hassle
          </p>
        </div>

        {/* Steps Timeline */}
        <div ref={stepsRef} className="relative max-w-5xl mx-auto">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-32 left-[10%] right-[10%] h-0.5">
            <div className="w-full h-full bg-gradient-to-r from-primary via-accent to-primary opacity-30" />
            <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-primary to-transparent animate-pulse" 
                 style={{ animationDuration: '3s' }} />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className={`relative group card-scroll-reveal ${stepsRevealed ? 'revealed' : ''}`}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                {/* Step Card */}
                <div className="glass rounded-2xl md:rounded-3xl overflow-hidden card-hover h-full relative">
                  {/* Step Number Background */}
                  <div className="absolute top-2 right-2 md:-top-4 md:-right-4 text-4xl md:text-8xl font-display font-bold text-foreground/[0.05] select-none z-10">
                    {step.step}
                  </div>

                  {/* Image */}
                  <div className="relative h-20 md:h-32 overflow-hidden">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    
                    {/* Step Badge on Image */}
                    <div className={`absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] md:text-xs font-semibold ${
                      step.color === "primary" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-accent text-accent-foreground"
                    }`}>
                      Step {step.step}
                    </div>
                  </div>

                  <div className="p-3 md:p-6">
                    {/* Icon */}
                    <div className={`relative w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-4 transition-all duration-500 group-hover:scale-110 ${
                      step.color === "primary" 
                        ? "bg-primary/10 group-hover:bg-gradient-primary group-hover:glow-primary" 
                        : "bg-accent/10 group-hover:bg-gradient-accent group-hover:glow-accent"
                    }`}>
                      <step.icon className={`w-4 h-4 md:w-6 md:h-6 transition-colors duration-300 ${
                        step.color === "primary" 
                          ? "text-primary group-hover:text-primary-foreground" 
                          : "text-accent group-hover:text-accent-foreground"
                      }`} />
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-xs md:text-lg font-bold mb-1 md:mb-2 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-none">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow Connector - Hidden on mobile 2x2 grid */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex justify-center py-4">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-6 md:mt-16 hidden md:block">
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group"
          >
            Start Your Application Now
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;