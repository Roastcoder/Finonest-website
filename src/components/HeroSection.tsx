import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, MapPin, Building2, IndianRupee, Home, Briefcase, Car, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import heroHomeLoan from "@/assets/hero-home-loan.jpg";
import heroCarLoan from "@/assets/hero-car-loan.jpg";
import heroBusinessLoan from "@/assets/hero-business-loan.jpg";
const slides = [{
  id: 1,
  title: "Your Dream Home",
  subtitle: "with Simpler Faster Friendlier Home Loans",
  description: "Get the best home loan rates with 100% paperless processing",
  cta: "Check Now",
  ctaLink: "/services/home-loan",
  image: heroHomeLoan,
  highlight: "Dream Home"
}, {
  id: 2,
  title: "Your Dream Car",
  subtitle: "with Simpler Faster Friendlier Vehicle Loans",
  description: "Get the lowest vehicle loan rates with 100% paperless processing",
  cta: "Check Now",
  ctaLink: "/services/car-loan",
  image: heroCarLoan,
  highlight: "Dream Car"
}, {
  id: 3,
  title: "Business Growth",
  subtitle: "with Simpler Faster Friendlier Business Loans",
  description: "Expand your business with quick disbursal within 48 hours",
  cta: "Check Now",
  ctaLink: "/services/business-loan",
  image: heroBusinessLoan,
  highlight: "Business Growth"
}];
const stats = [{
  icon: Users,
  value: "5.8 Lacs",
  suffix: "+",
  label: "Customers Annually"
}, {
  icon: MapPin,
  value: "150",
  suffix: "+",
  label: "Cities Covered"
}, {
  icon: Building2,
  value: "587",
  suffix: "+",
  label: "Branches"
}, {
  icon: IndianRupee,
  value: "61,000",
  suffix: "Cr+",
  label: "Disbursed Annually"
}];
const services = [{
  icon: Home,
  title: "Home Loan",
  badge: "Quick Sanction",
  description: "Instant approval at lowest interest rates",
  href: "/services/home-loan"
}, {
  icon: Briefcase,
  title: "Personal Loan",
  badge: "Quick Disbursal",
  description: "Paperless process at low rate",
  href: "/services/personal-loan"
}, {
  icon: Car,
  title: "New Car Loan",
  badge: "Lowest EMI Ride",
  description: "Drive away your dream car today.",
  href: "/services/car-loan"
}, {
  icon: CreditCard,
  title: "Credit Card",
  badge: "Rewards Unlimited",
  description: "Choose cards from all top banks",
  href: "/services/credit-cards"
}];
const rotatingWords = ["Credit Card", "Home Loan", "Personal Loan", "Car Loan"];
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord(prev => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(wordInterval);
  }, []);
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
  const slide = slides[currentSlide];
  return <section className="relative bg-gradient-to-b from-background via-background to-primary pt-20 md:pt-24 overflow-hidden">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Side - Tagline, Stats, Services */}
            <div className="space-y-8">
              {/* Tagline */}
              <div>
                <h1 className="font-display text-4xl xl:text-5xl font-bold text-foreground leading-tight">
                  Upgrade the Way
                  <br />
                  You Choose{" "}
                  <span key={currentWord} className="text-primary animate-fade-in inline-block">
                    {rotatingWords[currentWord]}
                  </span>
                </h1>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">
                        {stat.value}{" "}
                        <span className="text-primary">{stat.suffix}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  </div>)}
              </div>

              {/* Services Grid - Desktop */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {services.map((service, index) => <Link key={index} to={service.href} className="relative bg-card backdrop-blur border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-lg transition-all group">
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium whitespace-nowrap">
                      {service.badge}
                    </span>
                    <div className="flex items-start gap-3 mt-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm mb-0.5">
                          {service.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3 text-xs">
                      Apply Now
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>)}
              </div>
            </div>

            {/* Right Side - Banner Carousel */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {slides.map((s, index) => <div key={s.id} className={`transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"}`}>
                    <div className="relative aspect-[4/3]">
                      <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-center">
                        <h2 className="font-display text-2xl font-bold text-primary-foreground mb-1">
                          Your{" "}
                          <span className="text-yellow-400">{slide.highlight}</span>
                        </h2>
                        <p className="text-sm text-primary-foreground/90 mb-2">
                          {s.subtitle}
                        </p>
                        <p className="text-xs text-primary-foreground/70 mb-4 max-w-[200px]">
                          {s.description}
                        </p>
                        <Button variant="outline" size="sm" className="w-fit bg-foreground text-background hover:bg-foreground/90 border-0" asChild>
                          <Link to={s.ctaLink}>
                            {s.cta}
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>)}
                
                {/* Navigation Dots */}
                <div className="absolute bottom-4 right-4 flex gap-1.5">
                  {slides.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "bg-accent w-4" : "bg-primary-foreground/40"}`} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Banner only */}
      <div className="lg:hidden">
        <div className="relative">
          {slides.map((s, index) => <div key={s.id} className={`transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"}`}>
              <div className="relative aspect-[16/10]">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="font-display text-xl font-bold text-primary-foreground mb-1">
                    Your <span className="text-yellow-400">{slide.highlight}</span>
                  </h2>
                  <p className="text-xs text-primary-foreground/80 mb-3">
                    {s.description}
                  </p>
                  <Button variant="outline" size="sm" className="bg-foreground text-background hover:bg-foreground/90 border-0 text-xs" asChild>
                    <Link to={s.ctaLink}>
                      {s.cta}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>)}

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {slides.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className={`h-2 rounded-full transition-all ${index === currentSlide ? "bg-accent w-4" : "bg-primary-foreground/40 w-2"}`} />)}
          </div>
        </div>

        {/* Mobile Tagline */}
        <div className="bg-card py-6 px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Upgrade the Way You Choose
          </h2>
          <p key={currentWord} className="text-2xl font-display font-bold text-accent animate-fade-in">
            {rotatingWords[currentWord]}
          </p>
        </div>

        {/* Mobile Services Grid - 2x2 no scroll */}
        <div className="bg-card px-4 pb-6">
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {services.map((service, index) => <Link key={index} to={service.href} className="relative bg-background rounded-xl border border-border p-4 hover:border-primary/50 transition-all group">
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium whitespace-nowrap">
                  {service.badge}
                </span>
                <div className="flex items-start gap-2 mt-1">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm">
                      {service.title}
                    </h3>
                    <p className="text-[10px] text-muted-foreground line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3 text-[10px] h-7">
                  Apply Now
                  <ArrowRight className="w-2.5 h-2.5 ml-1" />
                </Button>
              </Link>)}
          </div>
        </div>

        {/* Mobile Stats Bar */}
        
      </div>
    </section>;
};
export default HeroSection;