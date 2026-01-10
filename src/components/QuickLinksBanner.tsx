import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Car, Home, CreditCard, TrendingUp, Wallet, Building, ChevronRight, ChevronLeft } from "lucide-react";
const quickLinks = [{
  icon: Home,
  text: "Apply Home Loan",
  href: "/services/home-loan",
  color: "bg-blue-500"
}, {
  icon: Car,
  text: "Used Car Loan",
  href: "/services/used-car-loan",
  color: "bg-emerald-500",
  highlight: true
}, {
  icon: TrendingUp,
  text: "Check Credit Score FREE",
  href: "/contact",
  color: "bg-orange-500"
}, {
  icon: Wallet,
  text: "Personal Loan",
  href: "/services/personal-loan",
  color: "bg-purple-500"
}, {
  icon: CreditCard,
  text: "Best Credit Cards",
  href: "/services/credit-cards",
  color: "bg-pink-500"
}, {
  icon: Building,
  text: "Business Loan",
  href: "/services/business-loan",
  color: "bg-cyan-500"
}];
const QuickLinksBanner = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({
            left: 0,
            behavior: "smooth"
          });
        } else {
          container.scrollBy({
            left: 150,
            behavior: "smooth"
          });
        }
      }, 3000);
    };
    startAutoScroll();
    const stopAutoScroll = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
    const resumeAutoScroll = () => {
      stopAutoScroll();
      setTimeout(startAutoScroll, 5000);
    };
    container.addEventListener("touchstart", stopAutoScroll);
    container.addEventListener("mousedown", stopAutoScroll);
    container.addEventListener("touchend", resumeAutoScroll);
    container.addEventListener("mouseup", resumeAutoScroll);
    return () => {
      stopAutoScroll();
      container.removeEventListener("touchstart", stopAutoScroll);
      container.removeEventListener("mousedown", stopAutoScroll);
      container.removeEventListener("touchend", resumeAutoScroll);
      container.removeEventListener("mouseup", resumeAutoScroll);
    };
  }, []);
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -200,
      behavior: "smooth"
    });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 200,
      behavior: "smooth"
    });
  };
  return (
    <div className="bg-muted/50 border-y border-border py-4 md:py-6">
      <div className="container px-4">
        <div className="relative">
          {/* Scroll buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-card border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-card border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-secondary transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex items-center gap-3 overflow-x-auto px-10 py-2 scrollbar-thin scroll-smooth"
            style={{ scrollbarWidth: 'thin' }}
          >
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 whitespace-nowrap flex-shrink-0 ${
                  link.highlight 
                    ? 'bg-accent text-accent-foreground shadow-md' 
                    : 'bg-card text-foreground border border-border hover:border-primary/50'
                }`}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.text}</span>
                <ChevronRight className="w-3 h-3 opacity-50" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuickLinksBanner;