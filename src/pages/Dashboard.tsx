import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
  CreditCard,
  Shield,
  TrendingUp,
  Phone,
  Mail,
  Edit
} from "lucide-react";
import logo from "@/assets/logo.png";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface LoanApplication {
  id: string;
  loan_type: string;
  amount: number;
  status: string;
  created_at: string;
  notes: string | null;
}

interface Profile {
  full_name: string | null;
  phone: string | null;
}

const Dashboard = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"applications" | "credit" | "profile">("applications");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        // Check if user is admin and redirect
        checkAdminRole(session.user.id);
        fetchData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    
    if (data) {
      // User is admin, redirect to admin dashboard
      navigate("/admin");
    }
  };

  const fetchData = async (userId: string) => {
    setLoading(true);
    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, phone")
        .eq("user_id", userId)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      const { data: applicationsData } = await supabase
        .from("loan_applications")
        .select("id, loan_type, amount, status, created_at, notes")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (applicationsData) {
        setApplications(applicationsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "processing":
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-amber-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-amber-100 text-amber-800";
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
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
        <title>Dashboard - Finonest | Manage Your Loan Applications</title>
        <meta name="description" content="Track your loan applications, view status updates, and manage your Finonest account." />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        {/* Header */}
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
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Welcome, {profile?.full_name || user?.email?.split("@")[0]}!
            </h1>
            <p className="text-muted-foreground">
              Manage your loan applications, check credit score, and track your financial journey.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "applications" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              My Applications
            </button>
            <button
              onClick={() => setActiveTab("credit")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "credit" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              <Shield className="w-4 h-4 inline mr-2" />
              Credit Score
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "profile" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              My Profile
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{applications.length}</div>
                  <div className="text-xs text-muted-foreground">Total Applications</div>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">
                    {applications.filter((a) => a.status === "pending").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">
                    {applications.filter((a) => a.status === "processing").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Processing</div>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">
                    {applications.filter((a) => a.status === "approved").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Approved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "applications" && (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-xl font-display font-bold text-foreground">Your Applications</h2>
                <Button asChild>
                  <Link to="/apply">
                    <Plus className="w-4 h-4 mr-2" />
                    New Application
                  </Link>
                </Button>
              </div>

              {applications.length === 0 ? (
                <div className="p-12 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Applications Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start your financial journey by applying for a loan today.
                  </p>
                  <Button asChild>
                    <Link to="/apply">
                      Apply for Loan
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {applications.map((application) => (
                    <div key={application.id} className="p-6 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                          {getStatusIcon(application.status)}
                          <div>
                            <h3 className="font-semibold text-foreground">{application.loan_type}</h3>
                            <p className="text-sm text-muted-foreground">
                              Applied on {new Date(application.created_at).toLocaleDateString("en-IN")}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-foreground">{formatAmount(application.amount)}</div>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(application.status)}`}>
                            {application.status}
                          </span>
                        </div>
                      </div>
                      {application.notes && (
                        <p className="mt-3 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                          {application.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "credit" && (
            <div className="bg-card rounded-xl border border-border p-8">
              <div className="text-center max-w-md mx-auto">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  Check Your Credit Score
                </h2>
                <p className="text-muted-foreground mb-6">
                  Know your credit score to get better loan offers and faster approvals. 
                  A good score (750+) can help you save thousands on interest.
                </p>
                <Button variant="hero" size="lg" asChild>
                  <Link to="/credit-score">
                    Check Credit Score Free
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Score Ranges</h3>
                <div className="grid sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-center">
                    <div className="text-xl font-bold text-green-700">750-900</div>
                    <div className="text-sm text-green-600">Excellent</div>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-center">
                    <div className="text-xl font-bold text-blue-700">650-749</div>
                    <div className="text-sm text-blue-600">Good</div>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-center">
                    <div className="text-xl font-bold text-amber-700">550-649</div>
                    <div className="text-sm text-amber-600">Fair</div>
                  </div>
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-center">
                    <div className="text-xl font-bold text-red-700">300-549</div>
                    <div className="text-sm text-red-600">Poor</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-card rounded-xl border border-border p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold text-foreground">My Profile</h2>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Full Name</label>
                    <div className="text-foreground font-medium">{profile?.full_name || "Not set"}</div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <div className="text-foreground font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {user?.email}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Phone</label>
                    <div className="text-foreground font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {profile?.phone || "Not set"}
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-6 rounded-xl">
                  <h3 className="font-semibold text-foreground mb-4">Account Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member Since</span>
                      <span className="text-foreground">{user?.created_at ? new Date(user.created_at).toLocaleDateString("en-IN") : "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Applications</span>
                      <span className="text-foreground">{applications.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Approved Loans</span>
                      <span className="text-foreground">{applications.filter(a => a.status === "approved").length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/services/home-loan" className="bg-card p-4 rounded-xl border border-border hover:border-primary/50 transition-colors group">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Home Loan</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
            <Link to="/services/used-car-loan" className="bg-card p-4 rounded-xl border border-border hover:border-primary/50 transition-colors group">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Used Car Loan</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
            <Link to="/services/personal-loan" className="bg-card p-4 rounded-xl border border-border hover:border-primary/50 transition-colors group">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Personal Loan</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
            <Link to="/emi-calculator" className="bg-card p-4 rounded-xl border border-border hover:border-primary/50 transition-colors group">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">EMI Calculator</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
