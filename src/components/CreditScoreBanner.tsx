import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CreditScoreBanner = () => {
  return (
    <section className="py-2 md:py-10">
      <div className="container px-2">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-background via-card to-accent/10 border border-border p-2 md:p-8">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/10 rounded-full blur-2xl" />

          <div className="relative z-10 flex flex-row items-center gap-3 md:gap-6">
            {/* Left content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-sm md:text-2xl font-bold text-foreground mb-0.5 md:mb-2">
                Get your{" "}
                <span className="text-accent">CIBIL Credit Report</span>
              </h3>
              <p className="text-xs md:text-xl font-semibold text-foreground mb-0.5 md:mb-2">
                worth <span className="line-through opacity-60">₹500</span> for{" "}
                <span className="text-accent">FREE</span>
              </p>
              <p className="text-[10px] md:text-sm text-muted-foreground mb-2 md:mb-4 hidden sm:block">
                5 Lac+ people have got their Credit Scores for FREE!
              </p>

              <Button variant="hero" size="sm" className="group text-xs md:text-sm h-8 md:h-10 px-3 md:px-4" asChild>
                <Link to="/credit-score">
                  Get Free Credit Score
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Right side - Credit score meter */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 md:w-36 md:h-36 rounded-full bg-card border-2 md:border-4 border-accent/30 flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <p className="text-[8px] md:text-xs text-muted-foreground">Credit Score</p>
                  <p className="text-base md:text-3xl font-bold text-accent">732</p>
                  <p className="text-[8px] md:text-xs text-accent font-medium">Excellent</p>
                </div>
              </div>
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border border-dashed md:border-2 border-accent/20 animate-spin-slow" style={{ animationDuration: "20s" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreditScoreBanner;
