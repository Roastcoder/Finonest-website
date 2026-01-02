import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Gift, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import creditScoreBanner from "@/assets/credit-score-banner.jpg";

const AdvertisementBanners = () => {
  return <section className="py-10 sm:py-16 bg-muted/30">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/10 text-accent rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1.5 sm:mr-2" />
            Special Offers
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground">
            Exclusive Deals Just For You
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Credit Score Banner */}
          <div className="md:col-span-2 lg:col-span-2 relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-5 sm:p-8">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-sm font-medium bg-primary-foreground/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">FREE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-2 sm:mb-3">
                Check Your Credit Score Now!
              </h3>
              <p className="text-primary-foreground/80 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
                Know your creditworthiness in just 2 minutes. Get personalized 
                loan recommendations based on your score.
              </p>
              <Button variant="secondary" size="default" className="text-sm sm:text-base" asChild>
                <Link to="/contact">
                  Check Score Free
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Link>
              </Button>
            </div>
            
            {/* Background decoration */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20">
              <img src={creditScoreBanner} alt="" className="w-full h-full object-cover" />
            </div>
            
          </div>

          {/* Referral Offer */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent to-accent/80 text-accent-foreground p-4 sm:p-6">
            <Gift className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 opacity-80" />
            <h3 className="text-lg sm:text-xl font-display font-bold mb-1 sm:mb-2">
              Refer & Earn ₹5,000
            </h3>
            <p className="text-accent-foreground/80 text-xs sm:text-sm mb-3 sm:mb-4">
              Refer a friend and earn ₹5,000 when they get their loan approved!
            </p>
            <Button variant="secondary" size="sm" className="text-xs sm:text-sm" asChild>
              <Link to="/contact">Refer Now</Link>
            </Button>
          </div>

          {/* Balance Transfer */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-card border border-border p-4 sm:p-6 group hover:border-primary/50 transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-foreground mb-1 sm:mb-2">
              Balance Transfer
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
              Save up to ₹2 Lakhs* by transferring your existing loan to us at lower rates.
            </p>
            <Link to="/contact" className="text-primary font-medium text-xs sm:text-sm inline-flex items-center gap-1 hover:underline">
              Transfer Now <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>

          {/* Low Interest */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-card border border-border p-4 sm:p-6 group hover:border-primary/50 transition-colors">
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
              <span className="bg-accent text-accent-foreground text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                LIMITED TIME
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary mb-1 sm:mb-2">0.25%</h3>
            <p className="text-foreground font-medium text-sm sm:text-base mb-1 sm:mb-2">Rate Discount</p>
            <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
              Get 0.25% discount on home loan interest rates this festive season!
            </p>
            <Link to="/services/home-loan" className="text-primary font-medium text-xs sm:text-sm inline-flex items-center gap-1 hover:underline">
              Learn More <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>

          {/* Quick Approval */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-muted to-muted/50 border border-border p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl sm:text-2xl font-bold text-primary-foreground">24</span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-foreground">Hour Approval</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Get your loan approved within 24 hours. Fastest in the industry!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-6 sm:mt-8 bg-card border border-border rounded-xl sm:rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
              <img alt="Finonest Advisor" className="w-full h-full object-contain" src="/lovable-uploads/d844aaf9-5d4b-4832-a7ad-69ea2e4492a7.png" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-foreground">
                Need Help Choosing?
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Our experts are here to guide you to the perfect loan!
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full md:w-auto">
            <Button variant="outline" size="default" className="flex-1 md:flex-none text-sm sm:text-base" asChild>
              <a href="tel:+919462553887">Call Us</a>
            </Button>
            <Button size="default" className="flex-1 md:flex-none text-sm sm:text-base" asChild>
              <Link to="/contact">
                Get Free Advice
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default AdvertisementBanners;