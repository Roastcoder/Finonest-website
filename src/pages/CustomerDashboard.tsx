import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  LogOut, 
  Plus, 
  Home,
  Loader2,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Settings,
  Phone,
  Mail,
  Calendar,
  IndianRupee,
  LayoutDashboard
} from "lucide-react";
import { customerAuthAPI, customerAPI } from "@/lib/api";
import logo from "@/assets/logo.png";

interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
}

interface Application {
  _id: string;
  applicationNumber?: string;
  loanType?: string;
  loanAmount?: number;
  status: string;
  createdAt: string;
  data?: Record<string, any>;
}

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        
        // Initialize empty customer data
        setCustomer(null);
        setStats({
          totalApplications: 0,
          pendingApplications: 0,
          approvedApplications: 0,
          rejectedApplications: 0
        });
        setApplications([]);
      } catch (error: any) {
        console.error('Dashboard load error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate, toast]);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
      new: { variant: "default", label: "New" },
      contacted: { variant: "secondary", label: "Contacted" },
      qualified: { variant: "secondary", label: "Qualified" },
      approved: { variant: "default", label: "Approved" },
      rejected: { variant: "destructive", label: "Rejected" },
      lost: { variant: "outline", label: "Lost" },
    };
    const config = statusConfig[status] || { variant: "outline" as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
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
        <title>Dashboard - Finonest | My Applications</title>
      </Helmet>

      <div className="min-h-screen bg-muted/30 flex">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 bg-card border-r border-border flex-col">
          <div className="p-6 border-b border-border">
            <Link to="/">
              <img src={logo} alt="Finonest" className="h-8 object-contain" />
            </Link>
          </div>
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'overview' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'applications' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <FileText className="w-5 h-5" />
                Applications
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'profile' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <User className="w-5 h-5" />
                Profile
              </button>
            </div>
          </nav>
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-4">
              <Link to="/" className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm">
                <Home className="w-4 h-4" />
                Home
              </Link>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <header className="md:hidden bg-card border-b border-border sticky top-0 z-40">
            <div className="px-6 py-4 flex items-center justify-between">
              <Link to="/">
                <img src={logo} alt="Finonest" className="h-8 object-contain" />
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

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                Welcome to Finonest!
              </h1>
              <p className="text-muted-foreground">
                Manage your loan applications and profile
              </p>
            </div>

            {/* Mobile Tabs */}
            <div className="md:hidden mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Content based on active tab */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <>
                  {/* Stats Cards */}
                  {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{stats.totalApplications}</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Pending</CardTitle>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{stats.pendingApplications}</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Approved</CardTitle>
                          <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{stats.approvedApplications}</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                          <XCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{stats.rejectedApplications}</div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Get started with our services</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link to="/services/home-loan" className="bg-card p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                          <h3 className="font-semibold text-foreground mb-1">Home Loan</h3>
                          <p className="text-sm text-muted-foreground">Apply now</p>
                        </Link>
                        <Link to="/services/personal-loan" className="bg-card p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                          <h3 className="font-semibold text-foreground mb-1">Personal Loan</h3>
                          <p className="text-sm text-muted-foreground">Apply now</p>
                        </Link>
                        <Link to="/services/business-loan" className="bg-card p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                          <h3 className="font-semibold text-foreground mb-1">Business Loan</h3>
                          <p className="text-sm text-muted-foreground">Apply now</p>
                        </Link>
                        <Link to="/emi-calculator" className="bg-card p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                          <h3 className="font-semibold text-foreground mb-1">EMI Calculator</h3>
                          <p className="text-sm text-muted-foreground">Calculate EMI</p>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {activeTab === 'applications' && <ApplicationsList />}
              {activeTab === 'profile' && <CustomerProfile customer={customer} />}
            </div>
          </div>
        </main>
        </div>
      </div>
    </>
  );
};

// Applications List Component
const ApplicationsList = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        setApplications([]);
      } catch (error) {
        console.error('Failed to load applications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [statusFilter]);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
      new: { variant: "default", label: "New" },
      contacted: { variant: "secondary", label: "Contacted" },
      qualified: { variant: "secondary", label: "Qualified" },
      approved: { variant: "default", label: "Approved" },
      rejected: { variant: "destructive", label: "Rejected" },
      lost: { variant: "outline", label: "Lost" },
    };
    const config = statusConfig[status] || { variant: "outline" as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>My Applications</CardTitle>
            <CardDescription>Track all your loan applications</CardDescription>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1 border border-border rounded-md text-sm"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No applications found</p>
            <Button asChild>
              <Link to="/services">Apply for a Loan</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app._id} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">
                        {app.loanType || 'Loan Application'}
                      </h3>
                      {getStatusBadge(app.status)}
                    </div>
                    {app.applicationNumber && (
                      <p className="text-sm text-muted-foreground mb-1">Application #: {app.applicationNumber}</p>
                    )}
                    {app.loanAmount && (
                      <p className="text-sm font-medium text-foreground flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" />
                        Amount: {formatCurrency(app.loanAmount)}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Applied on {formatDate(app.createdAt)}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/customer/applications/${app._id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Customer Profile Component
const CustomerProfile = ({ customer }: { customer: any }) => {
  const [profile, setProfile] = useState<any>(customer);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!profile) {
      // Use the customer data passed as prop
      setProfile(customer);
    }
  }, [profile, customer]);

  const handleSave = async (updatedData: any) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfile(updatedData);
      setEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </div>
          <Button variant={editing ? "outline" : "default"} onClick={() => setEditing(!editing)}>
            {editing ? "Cancel" : "Edit"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {editing ? (
          <ProfileEditForm profile={profile} onSave={handleSave} onCancel={() => setEditing(false)} loading={loading} />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{profile.name || 'Not set'}</h3>
                <p className="text-sm text-muted-foreground">{profile.phone}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{profile.phone}</span>
              </div>
              {profile.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{profile.email}</span>
                </div>
              )}
              {profile.profile?.address && (
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Address</p>
                  <p className="text-sm">{profile.profile.address}</p>
                  {profile.profile.city && profile.profile.state && (
                    <p className="text-sm text-muted-foreground">
                      {profile.profile.city}, {profile.profile.state} - {profile.profile.pincode}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Profile Edit Form Component
const ProfileEditForm = ({ profile, onSave, onCancel, loading }: { profile: any; onSave: (data: any) => void; onCancel: () => void; loading: boolean }) => {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    email: profile.email || '',
    profile: {
      address: profile.profile?.address || '',
      city: profile.profile?.city || '',
      state: profile.profile?.state || '',
      pincode: profile.profile?.pincode || '',
      panNumber: profile.profile?.panNumber || '',
      aadhaarNumber: profile.profile?.aadhaarNumber || '',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Full Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-border rounded-md"
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Address</label>
        <textarea
          value={formData.profile.address}
          onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, address: e.target.value } })}
          className="w-full px-3 py-2 border border-border rounded-md"
          rows={3}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">City</label>
          <input
            type="text"
            value={formData.profile.city}
            onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, city: e.target.value } })}
            className="w-full px-3 py-2 border border-border rounded-md"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">State</label>
          <input
            type="text"
            value={formData.profile.state}
            onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, state: e.target.value } })}
            className="w-full px-3 py-2 border border-border rounded-md"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Pincode</label>
        <input
          type="text"
          value={formData.profile.pincode}
          onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, pincode: e.target.value } })}
          className="w-full px-3 py-2 border border-border rounded-md"
          maxLength={6}
        />
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Save Changes
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CustomerDashboard;
