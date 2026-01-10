import { ReactNode } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { authAPI } from '../lib/api';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Layout, 
  Blocks, 
  Type, 
  Settings, 
  Home,
  LogOut,
  Users,
  FileText,
  BarChart3,
  Globe
} from 'lucide-react';
import logo from '@/assets/logo.png';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

const AdminLayout = ({ children, title = "Admin Panel" }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await authAPI.logout();
    navigate('/');
  };

  const navItems = [
    { path: '/admin', icon: BarChart3, label: 'Dashboard' },
    { path: '/admin/pages', icon: Layout, label: 'Pages' },
    { path: '/admin/settings', icon: Settings, label: 'Site Settings' },
    { path: '/admin/users', icon: Users, label: 'Users & Roles' },
    { path: '/admin/blog', icon: FileText, label: 'Blog Posts' },
    { path: '/admin/services', icon: Blocks, label: 'Services' },
    { path: '/admin/forms', icon: Type, label: 'Forms' },
    { path: '/admin/leads', icon: Users, label: 'Leads' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 fixed w-full top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Finonest" className="h-8 object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => window.open('/', '_blank')}>
              <Globe className="w-4 h-4 mr-2" />
              View Site
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm fixed h-full top-16">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 overflow-auto">
          <div className="max-w-7xl mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;