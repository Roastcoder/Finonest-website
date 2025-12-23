import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  FileText, 
  LogOut, 
  Clock, 
  CheckCircle, 
  XCircle,
  Home,
  Search,
  Filter,
  Loader2,
  Shield,
  TrendingUp,
  Settings,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  X,
  Save,
  Palette,
  Globe,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Plus,
  Image,
  Type,
  Blocks,
  Layout,
  Upload,
  Copy,
  Move,
  ToggleLeft,
  ToggleRight,
  ColorWheel,
  Monitor,
  Smartphone,
  Tablet
} from "lucide-react";
import logo from "@/assets/logo.png";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { 
  pagesAPI, 
  componentsAPI, 
  contentAPI, 
  themeAPI, 
  mediaAPI, 
  analyticsAPI,
  componentTemplates 
} from "@/lib/adminAPI";

interface LoanApplication {
  id: string;
  loan_type: string;
  amount: number;
  status: string;
  full_name: string;
  email: string;
  phone: string;
  employment_type: string | null;
  monthly_income: number | null;
  notes: string | null;
  created_at: string;
}

interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_type: string;
  category: string;
  description: string | null;
}

const AdminDashboard = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<LoanApplication[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"applications" | "analytics" | "settings" | "customize">("applications");
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<LoanApplication>>({});
  const [editNotes, setEditNotes] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  // Site customization state
  const [customSettings, setCustomSettings] = useState({
    site_name: "Finonest",
    site_tagline: "Your Trusted Loan Partner",
    primary_phone: "+91 9876543210",
    primary_email: "contact@finonest.com",
    address: "Mumbai, Maharashtra, India",
    whatsapp_number: "919876543210",
    facebook_url: "",
    instagram_url: "",
    linkedin_url: "",
    hero_title: "Upgrade the Way You Choose",
    hero_subtitle: "Get the best loan rates with 100% paperless processing",
  });

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
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .single();

      if (data) {
        setIsAdmin(true);
        fetchAllApplications();
        fetchSiteSettings();
      } else {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have admin privileges.",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      navigate("/dashboard");
    }
  };

  const fetchAllApplications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("loan_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        setApplications(data);
        setFilteredApplications(data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSiteSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*");

      if (error) throw error;

      if (data) {
        setSiteSettings(data);
        // Map settings to customSettings state
        const settingsMap: Record<string, string> = {};
        data.forEach(s => {
          settingsMap[s.setting_key] = s.setting_value;
        });
        setCustomSettings(prev => ({
          ...prev,
          ...settingsMap
        }));
      }
    } catch (error) {
      console.error("Error fetching site settings:", error);
    }
  };

  useEffect(() => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.phone.includes(searchTerm) ||
          app.loan_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  }, [searchTerm, statusFilter, applications]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("loan_applications")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );

      toast({
        title: "Status Updated",
        description: `Application status changed to ${newStatus}.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update status.",
      });
    }
  };

  const updateApplication = async (id: string) => {
    try {
      const { error } = await supabase
        .from("loan_applications")
        .update({
          full_name: editFormData.full_name,
          email: editFormData.email,
          phone: editFormData.phone,
          loan_type: editFormData.loan_type,
          amount: editFormData.amount,
          employment_type: editFormData.employment_type,
          monthly_income: editFormData.monthly_income,
          notes: editFormData.notes,
          status: editFormData.status,
        })
        .eq("id", id);

      if (error) throw error;

      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, ...editFormData } : app))
      );

      toast({
        title: "Application Updated",
        description: "Application details have been saved.",
      });
      setSelectedApplication(null);
      setEditMode(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update application.",
      });
    }
  };

  const deleteApplication = async (id: string) => {
    try {
      const { error } = await supabase
        .from("loan_applications")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setApplications((prev) => prev.filter((app) => app.id !== id));
      setDeleteConfirm(null);
      setSelectedApplication(null);

      toast({
        title: "Application Deleted",
        description: "The application has been permanently removed.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete application.",
      });
    }
  };

  const saveSiteSettings = async () => {
    setSavingSettings(true);
    try {
      // Save each setting to the database
      for (const [key, value] of Object.entries(customSettings)) {
        const existingSetting = siteSettings.find(s => s.setting_key === key);
        
        if (existingSetting) {
          await supabase
            .from("site_settings")
            .update({ setting_value: value })
            .eq("id", existingSetting.id);
        } else {
          await supabase
            .from("site_settings")
            .insert({
              setting_key: key,
              setting_value: value,
              setting_type: "text",
              category: "general"
            });
        }
      }

      toast({
        title: "Settings Saved",
        description: "Site customization settings have been updated.",
      });
      fetchSiteSettings();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save settings.",
      });
    } finally {
      setSavingSettings(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getLoanTypeStats = () => {
    const stats: Record<string, number> = {};
    applications.forEach((app) => {
      stats[app.loan_type] = (stats[app.loan_type] || 0) + 1;
    });
    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  };

  const getTotalAmount = () => {
    return applications.reduce((sum, app) => sum + app.amount, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You don't have admin privileges.</p>
          <Button asChild>
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Finonest | Manage Applications</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="bg-primary text-primary-foreground sticky top-0 z-40">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <img src={logo} alt="Finonest" className="h-10 object-contain brightness-0 invert" />
              </Link>
              <span className="px-2 py-1 bg-primary-foreground/20 rounded text-xs font-medium">Admin Panel</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground flex items-center gap-1 text-sm">
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "applications" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Applications
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "analytics" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("customize")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "customize" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              <Palette className="w-4 h-4 inline mr-2" />
              Customize
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === "settings" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Settings
            </button>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-5 gap-4 mb-8">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{applications.length}</div>
                  <div className="text-xs text-muted-foreground">Total</div>
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
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">
                    {applications.filter((a) => a.status === "rejected").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Rejected</div>
                </div>
              </div>
            </div>
          </div>

          {activeTab === "applications" && (
            <>
              {/* Filters */}
              <div className="bg-card rounded-xl border border-border p-4 mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, phone, or loan type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-muted-foreground" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <Button variant="outline" size="sm" onClick={fetchAllApplications}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Applications Table */}
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Applicant</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Loan Type</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredApplications.map((application) => (
                        <tr key={application.id} className="hover:bg-muted/30">
                          <td className="p-4">
                            <div>
                              <div className="font-medium text-foreground">{application.full_name}</div>
                              <div className="text-sm text-muted-foreground">{application.email}</div>
                              <div className="text-sm text-muted-foreground">{application.phone}</div>
                            </div>
                          </td>
                          <td className="p-4 text-foreground">{application.loan_type}</td>
                          <td className="p-4 font-medium text-foreground">{formatAmount(application.amount)}</td>
                          <td className="p-4 text-muted-foreground">
                            {new Date(application.created_at).toLocaleDateString("en-IN")}
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                              {getStatusIcon(application.status)}
                              <span className="capitalize">{application.status}</span>
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedApplication(application);
                                  setEditFormData(application);
                                  setEditMode(false);
                                }}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedApplication(application);
                                  setEditFormData(application);
                                  setEditMode(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:bg-red-50"
                                onClick={() => setDeleteConfirm(application.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredApplications.length === 0 && (
                  <div className="p-12 text-center">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No Applications Found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm || statusFilter !== "all"
                        ? "Try adjusting your filters."
                        : "No loan applications have been submitted yet."}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Applications by Loan Type</h3>
                  <div className="space-y-3">
                    {getLoanTypeStats().map(([type, count]) => (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-muted-foreground">{type}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${(count / applications.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-foreground font-medium w-8">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Total Loan Amount Requested</span>
                      <span className="text-xl font-bold text-foreground">{formatAmount(getTotalAmount())}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Approval Rate</span>
                      <span className="text-xl font-bold text-green-600">
                        {applications.length > 0 
                          ? Math.round((applications.filter(a => a.status === "approved").length / applications.length) * 100) 
                          : 0}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Average Loan Amount</span>
                      <span className="text-xl font-bold text-foreground">
                        {formatAmount(applications.length > 0 ? getTotalAmount() / applications.length : 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "customize" && (
            <div className="space-y-6">
              {/* Site Information */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Site Information</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Site Name</label>
                    <Input
                      value={customSettings.site_name}
                      onChange={(e) => setCustomSettings(prev => ({ ...prev, site_name: e.target.value }))}
                      placeholder="Enter site name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Tagline</label>
                    <Input
                      value={customSettings.site_tagline}
                      onChange={(e) => setCustomSettings(prev => ({ ...prev, site_tagline: e.target.value }))}
                      placeholder="Enter tagline"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Hero Title</label>
                    <Input
                      value={customSettings.hero_title}
                      onChange={(e) => setCustomSettings(prev => ({ ...prev, hero_title: e.target.value }))}
                      placeholder="Enter hero section title"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Hero Subtitle</label>
                    <Textarea
                      value={customSettings.hero_subtitle}
                      onChange={(e) => setCustomSettings(prev => ({ ...prev, hero_subtitle: e.target.value }))}
                      placeholder="Enter hero section subtitle"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Phone className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Primary Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={customSettings.primary_phone}
                        onChange={(e) => setCustomSettings(prev => ({ ...prev, primary_phone: e.target.value }))}
                        placeholder="+91 9876543210"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Primary Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={customSettings.primary_email}
                        onChange={(e) => setCustomSettings(prev => ({ ...prev, primary_email: e.target.value }))}
                        placeholder="contact@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">WhatsApp Number</label>
                    <Input
                      value={customSettings.whatsapp_number}
                      onChange={(e) => setCustomSettings(prev => ({ ...prev, whatsapp_number: e.target.value }))}
                      placeholder="919876543210 (without +)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={customSettings.address}
                        onChange={(e) => setCustomSettings(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="City, State, Country"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Social Media Links</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Facebook URL</label>
                    <Input
                      value={customSettings.facebook_url}
                      onChange={(e) => setCustomSettings(prev => ({ ...prev, facebook_url: e.target.value }))}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Instagram URL</label>
                    <Input
                      value={customSettings.instagram_url}
                      onChange={(e) => setCustomSettings(prev => ({ ...prev, instagram_url: e.target.value }))}
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">LinkedIn URL</label>
                    <Input
                      value={customSettings.linkedin_url}
                      onChange={(e) => setCustomSettings(prev => ({ ...prev, linkedin_url: e.target.value }))}
                      placeholder="https://linkedin.com/..."
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={saveSiteSettings} disabled={savingSettings} size="lg">
                  {savingSettings ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save All Changes
                </Button>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-card rounded-xl border border-border p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Admin Settings</h2>
              <div className="space-y-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">Admin Account</h3>
                  <p className="text-sm text-muted-foreground mb-2">Logged in as: {user?.email}</p>
                  <p className="text-sm text-muted-foreground">Role: Administrator</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">Quick Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" onClick={fetchAllApplications}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Data
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/">
                        <Globe className="w-4 h-4 mr-2" />
                        View Website
                      </Link>
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  More admin features coming soon: User management, Blog management, and more.
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Application Detail/Edit Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl border border-border shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  {editMode ? "Edit Application" : "Application Details"}
                </h2>
                <div className="flex items-center gap-2">
                  {!editMode && (
                    <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  )}
                  <button onClick={() => { setSelectedApplication(null); setEditMode(false); }} className="p-2 hover:bg-muted rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Full Name</label>
                    {editMode ? (
                      <Input
                        value={editFormData.full_name || ""}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, full_name: e.target.value }))}
                      />
                    ) : (
                      <div className="font-medium text-foreground">{selectedApplication.full_name}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Loan Type</label>
                    {editMode ? (
                      <select
                        value={editFormData.loan_type || ""}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, loan_type: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                      >
                        <option value="Home Loan">Home Loan</option>
                        <option value="Personal Loan">Personal Loan</option>
                        <option value="Car Loan">Car Loan</option>
                        <option value="Business Loan">Business Loan</option>
                        <option value="Loan Against Property">Loan Against Property</option>
                        <option value="Credit Card">Credit Card</option>
                      </select>
                    ) : (
                      <div className="font-medium text-foreground">{selectedApplication.loan_type}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    {editMode ? (
                      <Input
                        type="email"
                        value={editFormData.email || ""}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    ) : (
                      <div className="font-medium text-foreground">{selectedApplication.email}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Phone</label>
                    {editMode ? (
                      <Input
                        value={editFormData.phone || ""}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    ) : (
                      <div className="font-medium text-foreground">{selectedApplication.phone}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Amount</label>
                    {editMode ? (
                      <Input
                        type="number"
                        value={editFormData.amount || ""}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, amount: Number(e.target.value) }))}
                      />
                    ) : (
                      <div className="font-medium text-foreground">{formatAmount(selectedApplication.amount)}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Status</label>
                    {editMode ? (
                      <select
                        value={editFormData.status || ""}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    ) : (
                      <div className="font-medium text-foreground capitalize">{selectedApplication.status}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Employment</label>
                    {editMode ? (
                      <select
                        value={editFormData.employment_type || ""}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, employment_type: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                      >
                        <option value="">Select</option>
                        <option value="salaried">Salaried</option>
                        <option value="self-employed">Self Employed</option>
                        <option value="business">Business Owner</option>
                      </select>
                    ) : (
                      <div className="font-medium text-foreground capitalize">{selectedApplication.employment_type || "N/A"}</div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Monthly Income</label>
                    {editMode ? (
                      <Input
                        type="number"
                        value={editFormData.monthly_income || ""}
                        onChange={(e) => setEditFormData(prev => ({ ...prev, monthly_income: Number(e.target.value) }))}
                      />
                    ) : (
                      <div className="font-medium text-foreground">
                        {selectedApplication.monthly_income ? formatAmount(selectedApplication.monthly_income) : "N/A"}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Notes</label>
                  <Textarea
                    value={editMode ? (editFormData.notes || "") : (selectedApplication.notes || "")}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Add notes about this application..."
                    rows={4}
                    disabled={!editMode}
                  />
                </div>
                <div className="flex justify-between gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => setDeleteConfirm(selectedApplication.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => { setSelectedApplication(null); setEditMode(false); }}>
                      Cancel
                    </Button>
                    {editMode && (
                      <Button onClick={() => updateApplication(selectedApplication.id)}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl border border-border shadow-xl max-w-md w-full p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Delete Application?</h3>
                <p className="text-muted-foreground mb-6">
                  This action cannot be undone. The application will be permanently removed from the database.
                </p>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => deleteApplication(deleteConfirm)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
