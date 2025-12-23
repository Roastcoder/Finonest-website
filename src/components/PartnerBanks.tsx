import { useEffect, useRef } from 'react';
import { bankingPartners } from '@/data/bankingPartners';

const PartnerBanks = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = window.innerWidth < 768 ? 0.3 : 0.5;
    
    const animate = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };
    const handleTouchStart = () => cancelAnimationFrame(animationId);
    const handleTouchEnd = () => {
      setTimeout(() => {
        animationId = requestAnimationFrame(animate);
      }, 2000);
    };
    
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const BankCard = ({ bank }: { bank: typeof bankingPartners[0] }) => (
    <div className="flex-shrink-0">
      <div className="rounded-lg md:rounded-xl min-w-[80px] md:min-w-[120px] h-10 md:h-14 transition-all duration-300 hover:scale-105 border border-border/30 shadow-sm bg-card overflow-hidden">
        <img 
          src={bank.logo}
          alt={bank.name}
          className="w-full h-full object-contain p-1"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" viewBox="0 0 100 40"><rect width="100" height="40" fill="#f3f4f6"/><text x="50" y="25" text-anchor="middle" font-family="Arial" font-size="8" fill="#6b7280">${bank.name}</text></svg>`)}`;
          }}
        />
      </div>
    </div>
  );

  return (
    <section className="py-4 sm:py-6 md:py-14 relative overflow-hidden border-y border-primary/10 bg-gradient-section-alt">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-0 sm:px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-3 sm:mb-4 md:mb-8 px-4">
          <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-secondary text-muted-foreground text-[9px] sm:text-xs font-medium mb-1 sm:mb-2">
            Trusted Partners
          </span>
          <h2 className="font-display text-base sm:text-xl md:text-3xl font-bold mb-1">
            50+ <span className="text-gradient-primary">Banking Partners</span>
          </h2>
          <p className="text-muted-foreground text-[9px] sm:text-xs md:text-sm max-w-lg mx-auto px-2 hidden sm:block">
            We work with India's leading banks and NBFCs
          </p>
        </div>

        {/* Auto-scrolling Container - Both Mobile & Desktop */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div 
            ref={scrollRef} 
            className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-2 md:gap-3 py-1" style={{ width: 'max-content' }}>
              {bankingPartners.map((bank, index) => <BankCard key={`first-${index}`} bank={bank} />)}
              {bankingPartners.map((bank, index) => <BankCard key={`second-${index}`} bank={bank} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerBanks;