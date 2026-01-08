import { Home, Calculator, CreditCard, User, Phone, X, Building2, Car, Wallet, Briefcase, FileText, CarFront, GraduationCap, LogIn } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const getNavItems = (isLoggedIn: boolean) => [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: CreditCard,
    label: "Services",
    href: "/services",
    hasDropdown: true,
  },
  {
    icon: Calculator,
    label: "EMI",
    href: "/emi-calculator",
  },
  {
    icon: Phone,
    label: "Contact",
    href: "/contact",
  },
  isLoggedIn ? {
    icon: User,
    label: "Profile",
    href: "/dashboard",
  } : {
    icon: LogIn,
    label: "Login",
    href: "/auth",
  },
];

const serviceItems = [
  { icon: Building2, label: "Home Loan", href: "/services/home-loan" },
  { icon: Wallet, label: "Personal Loan", href: "/services/personal-loan" },
  { icon: Briefcase, label: "Business Loan", href: "/services/business-loan" },
  { icon: Car, label: "Car Loan", href: "/services/car-loan" },
  { icon: CarFront, label: "Used Car Loan", href: "/services/used-car-loan" },
  { icon: FileText, label: "Loan Against Property", href: "/services/loan-against-property" },
  { icon: CreditCard, label: "Credit Cards", href: "/services/credit-cards" },
  { icon: GraduationCap, label: "Finobizz Learning", href: "/services/finobizz-learning" },
];

const BottomNavigation = () => {
  const location = useLocation();
  const [showServices, setShowServices] = useState(false);
  const { isLoggedIn } = useAuth();

  const navItems = getNavItems(isLoggedIn);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleServiceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowServices(!showServices);
  };

  return (
    <>
      {/* Services Grid Overlay */}
      {showServices && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setShowServices(false)}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div 
            className="absolute bottom-16 left-0 right-0 bg-card border-t border-border rounded-t-2xl p-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Our Services</h3>
              <button 
                onClick={() => setShowServices(false)}
                className="p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {serviceItems.map((service) => (
                <Link
                  key={service.label}
                  to={service.href}
                  onClick={() => setShowServices(false)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-primary/10 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[10px] font-medium text-center text-foreground leading-tight">
                    {service.label}
                  </span>
                </Link>
              ))}
            </div>
            <Link
              to="/services"
              onClick={() => setShowServices(false)}
              className="mt-4 w-full block text-center py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/95 backdrop-blur-lg border-t border-border shadow-lg">
        <div className="flex items-center justify-around py-2 px-2 max-w-md mx-auto">
          {navItems.map((item) => {
            const active = isActive(item.href);
            
            if (item.hasDropdown) {
              return (
                <button
                  key={item.label}
                  onClick={handleServiceClick}
                  className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-300 ${
                    showServices || active
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 transition-transform ${
                      showServices || active ? "scale-110" : ""
                    }`}
                  />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              );
            }
            
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setShowServices(false)}
                className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-300 ${
                  active
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 transition-transform ${
                    active ? "scale-110" : ""
                  }`}
                />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
        {/* Safe area for notched phones */}
        <div className="h-safe-area-inset-bottom bg-card" />
      </nav>
    </>
  );
};

export default BottomNavigation;
