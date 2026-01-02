import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroHomeLoan from "@/assets/hero-home-loan.jpg";
import heroCarLoan from "@/assets/hero-car-loan.jpg";
import heroBusinessLoan from "@/assets/hero-business-loan.jpg";

const slides = [{
  id: 1,
  title: "Own Your Dream Home",
  subtitle: "Home Loan",
  description: "Get the best home loan rates starting at 8.5% p.a. with quick approval and minimal documentation.",
  cta: "Apply for Home Loan",
  ctaLink: "/services/home-loan",
  image: heroHomeLoan,
  rate: "8.5%",
  mascotLine: "Let me help you find your perfect home! 🏠"
}, {
  id: 2,
  title: "Drive Your Dreams",
  subtitle: "Car Loan",
  description: "Finance your dream car with instant approval and flexible EMI options starting at just 9% p.a.",
  cta: "Apply for Car Loan",
  ctaLink: "/services/car-loan",
  image: heroCarLoan,
  rate: "9%",
  mascotLine: "Ready to hit the road? I've got great deals! 🚗"
}, {
  id: 3,
  title: "Fuel Your Business Growth",
  subtitle: "Business Loan",
  description: "Expand your business with loans up to ₹2 Crore. Quick disbursal within 48 hours.",
  cta: "Apply for Business Loan",
  ctaLink: "/services/business-loan",
  image: heroBusinessLoan,
  rate: "11%",
  mascotLine: "Your business growth is my priority! 💼"
}];
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);
  const slide = slides[currentSlide];
  return <section className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-gradient-hero pt-20 md:pt-24">
      {/* Background Image */}
      <div className="absolute inset-0">
        {slides.map((s, index) => <div key={s.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}>
            <img src={s.image} alt={s.title} className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60 md:via-background/90 md:to-background/40" />
          </div>)}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-2 rounded-full bg-primary/10 text-primary text-[11px] sm:text-sm font-semibold mb-3 sm:mb-6 animate-fade-in">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
              {slide.subtitle} - Starting {slide.rate} p.a.
            </span>

            <h1 key={slide.id + "-title"} className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-3 sm:mb-6 animate-slide-up leading-tight">
              {slide.title.split(" ").map((word, i) => <span key={i}>
                  {i === slide.title.split(" ").length - 1 ? <span className="text-gradient-primary">{word}</span> : word + " "}
                </span>)}
            </h1>

            <p key={slide.id + "-desc"} className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-8 animate-slide-up delay-100 line-clamp-3 sm:line-clamp-none">
              {slide.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 animate-slide-up delay-200">
              <Button variant="hero" size="default" className="group w-full sm:w-auto text-sm sm:text-base" asChild>
                <a href={slide.ctaLink}>
                  <span className="relative z-10">{slide.cta}</span>
                  <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="outline" size="default" className="w-full sm:w-auto text-sm sm:text-base" asChild>
                <a href="/emi-calculator">Calculate EMI</a>
              </Button>
            </div>

            {/* Trust Indicators */}
            
          </div>

          {/* Right Side - Empty for now */}
          
        </div>
      </div>

      {/* Navigation Arrows - Hidden on very small screens */}
      <button onClick={prevSlide} className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center hover:bg-card transition-colors z-20" aria-label="Previous slide">
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-foreground" />
      </button>
      <button onClick={nextSlide} className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center hover:bg-card transition-colors z-20" aria-label="Next slide">
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-foreground" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 md:gap-3 z-20">
        {slides.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-5 sm:w-6 md:w-8 bg-primary" : "w-1.5 sm:w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"}`} aria-label={`Go to slide ${index + 1}`} />)}
      </div>
    </section>;
};
export default HeroCarousel;