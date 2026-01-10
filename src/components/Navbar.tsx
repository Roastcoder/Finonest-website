import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight, ChevronDown, User, LogOut, LayoutDashboard } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { publicCMSAPI } from "@/lib/api";
import logo from "@/assets/logo.png";

interface NavItem {
  _id: string;
  label: string;
  href: string;
  children?: NavItem[];
  target?: '_self' | '_blank';
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadNavItems = async () => {
      try {
        setLoading(true);
        const res = await publicCMSAPI.listNavItems('header');
        if (res.status === 'ok' && res.data) {
          setNavItems(res.data || []);
        }
      } catch (error) {
        console.error('Failed to load navigation items:', error);
        // Fallback to empty array - navbar will just show logo and auth buttons
      } finally {
        setLoading(false);
      }
    };

    loadNavItems();
  }, []);

  const isActive = (href: string) => location.pathname === href;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-card/95 backdrop-blur-lg py-3 shadow-lg border-b border-border" : "py-4 bg-white"}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Finonest" className="h-10 object-contain" />
        </Link>

        {!loading && (
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <div 
                key={item._id} 
                className="relative"
                onMouseEnter={() => item.children && item.children.length > 0 && setActiveDropdown(item._id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.href.startsWith('http') ? (
                  <a
                    href={item.href}
                    target={item.target || '_blank'}
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center gap-1 ${
                      isActive(item.href) 
                        ? "text-primary bg-primary/10" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {item.label}
                    {item.children && item.children.length > 0 && <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item._id ? 'rotate-180' : ''}`} />}
                  </a>
                ) : (
                  <Link 
                    to={item.href} 
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center gap-1 ${
                      isActive(item.href) 
                        ? "text-primary bg-primary/10" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {item.label}
                    {item.children && item.children.length > 0 && <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item._id ? 'rotate-180' : ''}`} />}
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && item.children.length > 0 && activeDropdown === item._id && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-card rounded-xl border border-border shadow-xl p-2 animate-fade-in z-50">
                    {item.children.map(child => (
                      child.href.startsWith('http') ? (
                        <a
                          key={child._id}
                          href={child.href}
                          target={child.target || '_blank'}
                          rel="noopener noreferrer"
                          className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                        >
                          {child.label}
                        </a>
                      ) : (
                        <Link 
                          key={child._id}
                          to={child.href} 
                          className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                        >
                          {child.label}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="hidden lg:flex items-center gap-3">
          {/* Debug: Show current auth state */}
          {console.log('Auth state:', { isLoggedIn, user })}
          {(isLoggedIn && user && user.email) || localStorage.getItem('token') ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground max-w-[100px] truncate">
                    {user?.fullName || user?.name || user?.email?.split('@')[0] || 'User'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border border-border shadow-xl z-50">
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user?.fullName || user?.name || user?.email || 'User'}
                  </p>
                  {user?.email && (user?.fullName || user?.name) && (
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  )}
                </div>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/customer/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/auth">Login</Link>
            </Button>
          )}
          <Button variant="hero" size="default" className="group" asChild>
            <Link to="/apply">
              Apply Now
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-xl transition-all duration-300 overflow-y-auto ${isMobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
          {!loading && navItems.map(item => (
            <div key={item._id}>
              {item.children && item.children.length > 0 ? (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(activeDropdown === item._id ? null : item._id)}
                    className={`w-full flex items-center justify-between py-3 px-4 rounded-lg transition-colors ${isActive(item.href) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"}`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item._id ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`ml-4 mt-1 space-y-1 border-l-2 border-border pl-4 overflow-hidden transition-all duration-300 ${activeDropdown === item._id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {item.children.map(child => (
                      child.href.startsWith('http') ? (
                        <a
                          key={child._id}
                          href={child.href}
                          target={child.target || '_blank'}
                          rel="noopener noreferrer"
                          className="block py-2 px-4 text-sm text-muted-foreground hover:text-foreground rounded-lg" 
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </a>
                      ) : (
                        <Link 
                          key={child._id}
                          to={child.href} 
                          className="block py-2 px-4 text-sm text-muted-foreground hover:text-foreground rounded-lg" 
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      )
                    ))}
                  </div>
                </>
              ) : (
                item.href.startsWith('http') ? (
                  <a
                    href={item.href}
                    target={item.target || '_blank'}
                    rel="noopener noreferrer"
                    className={`block py-3 px-4 rounded-lg transition-colors ${isActive(item.href) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link 
                    to={item.href} 
                    className={`block py-3 px-4 rounded-lg transition-colors ${isActive(item.href) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          ))}
          <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-border">
            {isLoggedIn && user && user.email ? (
              <>
                <Button variant="ghost" className="w-full justify-center" asChild>
                  <Link to="/customer/dashboard">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-center text-destructive border-destructive/30 hover:bg-destructive/10"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="ghost" className="w-full justify-center" asChild>
                <Link to="/auth">Login</Link>
              </Button>
            )}
            <Button variant="hero" className="w-full justify-center" asChild>
              <Link to="/apply">Apply Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
