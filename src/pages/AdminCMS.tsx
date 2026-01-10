import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../lib/api';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import AdminLayout from '../components/AdminLayout';
import { 
  Layout, 
  Blocks, 
  Type, 
  Settings, 
  Shield,
  Loader2,
  Users,
  FileText
} from 'lucide-react';

const AdminCMS = () => {
  const [user, setUser] = useState<{ id?: string; email?: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        if (!isAuthenticated()) {
          navigate('/auth');
          return;
        }

        const user = getCurrentUser();
        
        if (user?.email === 'admin@finonest.com' || user?.role === 'superadmin' || user?.role === 'admin') {
          setIsAdmin(true);
          setUser(user);
        } else {
          navigate('/dashboard');
          return;
        }
      } catch (e: unknown) {
        navigate('/auth');
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

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
          <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout title="CMS Dashboard">
      <Card className="p-8 text-center">
        <Layout className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">CMS Dashboard</h3>
        <p className="text-muted-foreground mb-6">
          Welcome to the admin panel. Use the sidebar to navigate to different sections.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Button variant="outline" asChild>
            <Link to="/admin/cms/pages">
              <Layout className="w-4 h-4 mr-2" />
              Pages
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin/cms/users">
              <Users className="w-4 h-4 mr-2" />
              Users & Roles
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin/cms/blog">
              <FileText className="w-4 h-4 mr-2" />
              Blog Posts
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin/cms/services">
              <Blocks className="w-4 h-4 mr-2" />
              Services
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin/cms/forms">
              <Type className="w-4 h-4 mr-2" />
              Forms
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin/cms/leads">
              <Users className="w-4 h-4 mr-2" />
              Leads
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin/cms/settings">
              <Settings className="w-4 h-4 mr-2" />
              Site Settings
            </Link>
          </Button>
        </div>
      </Card>
    </AdminLayout>
  );
};

export default AdminCMS;