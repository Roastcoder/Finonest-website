import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Car, Home, CreditCard, TrendingUp, Wallet, Building, ChevronRight, ChevronLeft } from "lucide-react";
import { publicCMSAPI } from "@/lib/api";

interface NavLinkItem {
  _id: string;
  label: string;
  href: string;
  target?: '_self' | '_blank';
  highlight?: boolean;
}

const iconMap: Record<string, any> = {
  home: Home,
  "home-loan": Home,
  car: Car,
  "car-loan": Car,
  credit: CreditCard,
  "credit-card": CreditCard,
  personal: Wallet,
  "personal-loan": Wallet,
  business: Building,
  "business-loan": Building,
  score: TrendingUp,
  contact: TrendingUp,
};
const QuickLinksBanner = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const [links, setLinks] = useState<NavLinkItem[]>([]);

  useEffect(() => {
    const loadLinks = async () => {
      try {
        const res = await publicCMSAPI.listNavItems('footer');
        if (res.status === 'ok' && res.data) {
          setLinks(res.data || []);
        }
      } catch (error) {
        console.error('Failed to load quick links:', error);
        setLinks([]);
      }
    };
    loadLinks();
  }, []);
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
            {links.map((link, index) => {
              const key = link.href.toLowerCase();
              const Icon = Object.entries(iconMap).find(([k]) => key.includes(k))?.[1] || ChevronRight;
              const isExternal = link.href.startsWith('http');
              const item = (
                <div
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 whitespace-nowrap flex-shrink-0 ${
                    link.highlight 
                      ? 'bg-accent text-accent-foreground shadow-md' 
                      : 'bg-card text-foreground border border-border hover:border-primary/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                  <ChevronRight className="w-3 h-3 opacity-50" />
                </div>
              );
              return isExternal ? (
                <a key={link._id || index} href={link.href} target={link.target || '_blank'} rel="noopener noreferrer">
                  {item}
                </a>
              ) : (
                <Link key={link._id || index} to={link.href}>
                  {item}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuickLinksBanner;