import { useEffect, useRef } from 'react';

const banks = [
  { name: "HDFC Bank", short: "HDFC", logo: "https://logo.clearbit.com/hdfcbank.com", color: "#004C8F", bg: "#E8F0F8" },
  { name: "ICICI Bank", short: "ICICI", logo: "https://logo.clearbit.com/icicibank.com", color: "#F58220", bg: "#FFF5EC" },
  { name: "Axis Bank", short: "AXIS", logo: "https://logo.clearbit.com/axisbank.com", color: "#97144D", bg: "#FCE8F0" },
  { name: "Kotak Mahindra", short: "KOTAK", logo: "https://logo.clearbit.com/kotak.com", color: "#ED1C24", bg: "#FDECEC" },
  { name: "Bajaj Finserv", short: "BAJAJ", logo: "https://logo.clearbit.com/bajajfinserv.in", color: "#00529B", bg: "#E6EEF6" },
  { name: "Yes Bank", short: "YES", logo: "https://logo.clearbit.com/yesbank.in", color: "#00518F", bg: "#E6EEF5" },
  { name: "Federal Bank", short: "FEDERAL", logo: "https://logo.clearbit.com/federalbank.co.in", color: "#003399", bg: "#E6E9F2" },
  { name: "Tata Capital", short: "TATA", logo: "https://logo.clearbit.com/tatacapital.com", color: "#486AAE", bg: "#EBF0F8" },
  { name: "Poonawalla", short: "POONAWALLA", logo: "https://logo.clearbit.com/poonawallafincorp.com", color: "#E31837", bg: "#FCE8EB" },
  { name: "HDB Financial", short: "HDB", logo: "https://logo.clearbit.com/hdbfs.com", color: "#ED1C24", bg: "#FDECEC" },
  { name: "IndusInd Bank", short: "INDUSIND", logo: "https://logo.clearbit.com/indusind.com", color: "#98272A", bg: "#F8E8E9" },
  { name: "IDFC First", short: "IDFC", logo: "https://logo.clearbit.com/idfcfirstbank.com", color: "#9C1D26", bg: "#F8E9EA" },
  { name: "Bandhan Bank", short: "BANDHAN", logo: "https://logo.clearbit.com/bandhanbank.com", color: "#E31E24", bg: "#FCE8E9" },
  { name: "AU Bank", short: "AU", logo: "https://logo.clearbit.com/aubank.in", color: "#FF6600", bg: "#FFF2E6" },
  { name: "RBL Bank", short: "RBL", logo: "https://logo.clearbit.com/rblbank.com", color: "#E4002B", bg: "#FCE6EA" },
  { name: "TVS Credit", short: "TVS", logo: "https://logo.clearbit.com/tvscredit.com", color: "#00529B", bg: "#E6EEF6" },
  { name: "Hero FinCorp", short: "HERO", logo: "https://logo.clearbit.com/herofincorp.com", color: "#ED1C24", bg: "#FDECEC" },
  { name: "Cholamandalam", short: "CHOLA", logo: "https://logo.clearbit.com/cholamandalam.com", color: "#E31E25", bg: "#FCE8E9" },
  { name: "Mahindra Finance", short: "MAHINDRA", logo: "https://logo.clearbit.com/mahindrafinance.com", color: "#ED1C24", bg: "#FDECEC" },
  { name: "Shriram Finance", short: "SHRIRAM", logo: "https://logo.clearbit.com/shriramfinance.in", color: "#E31E24", bg: "#FCE8E9" },
  { name: "Toyota Finance", short: "TOYOTA", logo: "https://logo.clearbit.com/toyota.com", color: "#EB0A1E", bg: "#FDE7E9" },
  { name: "Piramal Finance", short: "PIRAMAL", logo: "https://logo.clearbit.com/piramal.com", color: "#003366", bg: "#E6E9F0" },
  { name: "Muthoot Capital", short: "MUTHOOT", logo: "https://logo.clearbit.com/muthootcapital.com", color: "#C7A041", bg: "#F9F5EB" },
  { name: "Manappuram", short: "MANAPPURAM", logo: "https://logo.clearbit.com/manappuram.com", color: "#006400", bg: "#E6F0E6" },
  { name: "Jana Bank", short: "JANA", logo: "https://logo.clearbit.com/janabank.com", color: "#00A651", bg: "#E6F5ED" },
  { name: "Equitas SFB", short: "EQUITAS", logo: "https://logo.clearbit.com/equitasbank.com", color: "#E21B22", bg: "#FCE8E9" },
  { name: "ESAF Bank", short: "ESAF", logo: "https://logo.clearbit.com/esafbank.com", color: "#1E8449", bg: "#E8F3EC" },
  { name: "Suryoday Bank", short: "SURYODAY", logo: "https://logo.clearbit.com/suryodaybank.com", color: "#FF6600", bg: "#FFF2E6" },
  { name: "Saraswat Bank", short: "SARASWAT", logo: "https://logo.clearbit.com/saraswatbank.com", color: "#003366", bg: "#E6E9F0" },
  { name: "SBI", short: "SBI", logo: "https://logo.clearbit.com/sbi.co.in", color: "#22409A", bg: "#E8EBF5" },
  { name: "Punjab National Bank", short: "PNB", logo: "https://logo.clearbit.com/pnbindia.in", color: "#ED1C24", bg: "#FDECEC" },
  { name: "Bank of Baroda", short: "BOB", logo: "https://logo.clearbit.com/bankofbaroda.in", color: "#F15A22", bg: "#FEF0E9" },
  { name: "Union Bank", short: "UNION", logo: "https://logo.clearbit.com/unionbankofindia.co.in", color: "#004B87", bg: "#E6EDF4" },
  { name: "Canara Bank", short: "CANARA", logo: "https://logo.clearbit.com/canarabank.com", color: "#0072BC", bg: "#E6F1F9" },
];

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

  const BankCard = ({ bank }: { bank: typeof banks[0] }) => (
    <div className="flex-shrink-0">
      <div 
        className="rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 min-w-[80px] md:min-w-[120px] h-10 md:h-14 transition-all duration-300 hover:scale-105 border border-border/30 shadow-sm" 
        style={{ backgroundColor: bank.bg }}
      >
        <img 
          src={bank.logo} 
          alt={bank.name}
          className="w-5 h-5 md:w-7 md:h-7 object-contain rounded"
          onError={(e) => {
            // Hide image on error and show text fallback
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <span 
          className="font-bold text-[9px] md:text-xs tracking-tight text-center leading-tight" 
          style={{ color: bank.color }}
        >
          {bank.short}
        </span>
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
            40+ <span className="text-gradient-primary">Banking Partners</span>
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
              {banks.map((bank, index) => <BankCard key={`first-${index}`} bank={bank} />)}
              {banks.map((bank, index) => <BankCard key={`second-${index}`} bank={bank} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerBanks;