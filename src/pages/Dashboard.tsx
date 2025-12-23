import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  FileText, 
  LogOut, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle,
  Home,
  ChevronRight,
  Loader2,
  Shield,
  TrendingUp,
  Phone,
  Mail,
  Edit
} from "lucide-react";
import logo from "@/assets/logo.png";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
      return;
    }
    
    // Decode token to get user info
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    } catch (error) {
      localStorage.removeItem('token');
      navigate('/auth');
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Finonest | Welcome Back</title>
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        <header className="bg-card border-b border-border sticky top-0 z-40">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/">
              <img src={logo} alt="Finonest" className="h-10 object-contain" />
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm">
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">
              Welcome back, {user?.email?.split('@')[0]}!
            </h1>
            <p className="text-muted-foreground mb-8">
              Your dashboard is ready. Start exploring our loan services and manage your applications.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <Link to="/apply" className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors group">
                <Plus className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Apply for Loan</h3>
                <p className="text-sm text-muted-foreground">Start your loan application process</p>
              </Link>
              
              <Link to="/cibil-check" className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors group">
                <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Check Credit Score</h3>
                <p className="text-sm text-muted-foreground">Get your free credit report</p>
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <Link to="/services/home-loan" className="bg-card p-4 rounded-xl border border-border hover:border-primary/50 transition-colors">
                <span className="font-medium text-foreground">Home Loan</span>
              </Link>
              <Link to="/services/personal-loan" className="bg-card p-4 rounded-xl border border-border hover:border-primary/50 transition-colors">
                <span className="font-medium text-foreground">Personal Loan</span>
              </Link>
              <Link to="/emi-calculator" className="bg-card p-4 rounded-xl border border-border hover:border-primary/50 transition-colors">
                <span className="font-medium text-foreground">EMI Calculator</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;