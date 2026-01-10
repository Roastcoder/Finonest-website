import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import api, { authAPI, isAuthenticated } from '../lib/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import { Shield, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        if (!isAuthenticated()) {
          setCheckingAuth(false);
          return;
        }

        const isAdmin = await api.admin.checkRole();
        if (isAdmin) navigate('/admin/cms');
      } catch (error: unknown) {
        console.error('Auth check error:', (error as Error).message || error);
      } finally {
        setCheckingAuth(false);
      }
    })();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authAPI.login(email, password);
      if (!res.success) throw new Error(res.message || 'Login failed');

      const isAdmin = await api.admin.checkRole();
      if (!isAdmin) {
        await authAPI.logout();
        throw new Error('Access denied. Admin privileges required.');
      }

      toast({ title: 'Login Successful', description: 'Welcome to the admin panel!' });
      navigate('/admin/cms');
    } catch (error: unknown) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: (error as Error).message || 'Invalid credentials',
      });
    } finally {
      setLoading(false);
    }
  };

  const createAdminAccount = async () => {
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter email and password',
      });
      return;
    }

    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName: 'Admin' }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      toast({ title: 'Account Created', description: 'Admin account created successfully!' });
    } catch (error: unknown) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: (error as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Login - FinoNest CMS</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Admin Login</CardTitle>
            <p className="text-gray-600 mt-2">Access the Content Management System</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setEmail('demo@admin.com');
                  setPassword('demo123');
                  setTimeout(() => navigate('/admin/cms'), 500);
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={loading}
              >
                🚀 Demo Login (Latest Dashboard)
              </Button>
              
              <p className="text-sm text-gray-600 text-center mb-3">
                Need to create an admin account?
              </p>
              <Button
                variant="outline"
                onClick={createAdminAccount}
                className="w-full"
                disabled={loading}
              >
                Create Admin Account
              </Button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/')}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                ← Back to Website
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Features showcase */}
        <div className="hidden lg:block absolute bottom-8 left-8 right-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <h3 className="font-semibold text-gray-800 mb-3">CMS Features</h3>
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
              <div>✨ Dynamic Content Management</div>
              <div>🎨 Theme Customization</div>
              <div>📱 Responsive Design</div>
              <div>🔧 Component Builder</div>
              <div>📊 Analytics Dashboard</div>
              <div>🚀 Real-time Updates</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;