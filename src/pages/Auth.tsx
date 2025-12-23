import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, CheckCircle, Car, Home, Briefcase, CreditCard, Star, Shield, Clock } from "lucide-react";
import { z } from "zod";
import logo from "@/assets/logo.png";
import heroHomeLoan from "@/assets/hero-home-loan.jpg";
import { Link } from "react-router-dom";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; fullName?: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate("/dashboard");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    try {
      emailSchema.parse(email);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.email = e.errors[0].message;
      }
    }

    try {
      passwordSchema.parse(password);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.password = e.errors[0].message;
      }
    }

    if (!isLogin && !fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              variant: "destructive",
              title: "Login Failed",
              description: "Invalid email or password. Please check your credentials.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Login Failed",
              description: error.message,
            });
          }
          return;
        }

        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      } else {
        const redirectUrl = `${window.location.origin}/dashboard`;
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              variant: "destructive",
              title: "Signup Failed",
              description: "This email is already registered. Please login instead.",
            });
            setIsLogin(true);
          } else {
            toast({
              variant: "destructive",
              title: "Signup Failed",
              description: error.message,
            });
          }
          return;
        }

        toast({
          title: "Account Created!",
          description: "Welcome to Finonest. You can now access your dashboard.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: Star, text: "5.8L+ Happy Customers" },
    { icon: Shield, text: "35+ Bank Partners" },
    { icon: Clock, text: "24-Hour Approval" },
    { icon: CheckCircle, text: "100% Transparent" },
  ];

  const ImageSection = () => (
    <div className="hidden lg:flex h-full items-center justify-center">
      <div className="relative w-full max-w-md">
        {/* Clear Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src={heroHomeLoan} 
            alt="Financial Services" 
            className="w-full h-[550px] object-cover"
          />
        </div>
        
        {/* Benefits Card Below Image */}
        <div className="mt-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-blue-100 dark:border-slate-700">
          <h3 className="text-xl font-display font-bold text-slate-800 dark:text-white mb-4">
            {isLogin ? "Welcome Back!" : "Join Finonest Today"}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 bg-blue-50 dark:bg-slate-700 rounded-lg px-3 py-2"
              >
                <benefit.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const FormSection = () => (
    <div className="w-full">
      {/* Form Card */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-blue-100 dark:border-blue-900/50 rounded-3xl shadow-2xl shadow-blue-500/10 p-8 md:p-10">
        {/* Toggle Tabs */}
        <div className="flex bg-blue-50 dark:bg-slate-800 rounded-xl p-1.5 mb-8">
          <button
            onClick={() => {
              setIsLogin(true);
              setErrors({});
            }}
            className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${
              isLogin 
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30" 
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setErrors({});
            }}
            className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${
              !isLogin 
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30" 
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-muted-foreground text-sm">
            {isLogin 
              ? "Enter your credentials to continue" 
              : "Fill in your details to get started"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 h-12 bg-white dark:bg-slate-800 border-blue-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
              {errors.fullName && (
                <p className="text-destructive text-xs mt-1">{errors.fullName}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-white dark:bg-slate-800 border-blue-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>
            {errors.email && (
              <p className="text-destructive text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={isLogin ? "Enter your password" : "Create a password (min 6 chars)"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12 bg-white dark:bg-slate-800 border-blue-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-destructive text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {isLogin ? "Login" : "Create Account"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          {/* Demo Admin Login Button */}
          {isLogin && (
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40 font-semibold"
              onClick={async () => {
                setLoading(true);
                // First seed the demo user if it doesn't exist
                try {
                  const response = await fetch(
                    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/seed-demo-user`,
                    { method: 'POST', headers: { 'Content-Type': 'application/json' } }
                  );
                  const result = await response.json();
                  console.log("Demo user seed result:", result);
                } catch (err) {
                  console.log("Demo seed error (may already exist):", err);
                }
                // Login directly with demo credentials
                const { error } = await supabase.auth.signInWithPassword({
                  email: "demo@finonest.com",
                  password: "demo123",
                });
                if (error) {
                  toast({
                    variant: "destructive",
                    title: "Demo Login Failed",
                    description: error.message,
                  });
                } else {
                  toast({
                    title: "Welcome, Demo Admin!",
                    description: "You're now logged in as an admin.",
                  });
                }
                setLoading(false);
              }}
            >
              🔑 Demo Admin Login
            </Button>
          )}
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Switch Form Link */}
        <p className="text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
            }}
            className="text-blue-600 font-semibold ml-1 hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>

      {/* Mobile Benefits */}
      <div className="lg:hidden mt-8 grid grid-cols-2 gap-3">
        {benefits.map((benefit, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-blue-100 dark:border-slate-700 rounded-xl px-4 py-3"
          >
            <benefit.icon className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{benefit.text}</span>
          </div>
        ))}
      </div>

      {/* Trust Badge */}
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          🔒 Your data is secure with 256-bit encryption
        </p>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{isLogin ? "Login" : "Sign Up"} - Finonest | Your Trusted Loan Partner</title>
        <meta name="description" content="Access your Finonest account to track loan applications, manage your profile, and explore financial solutions." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800 flex flex-col">
        {/* Header */}
        <header className="p-4 md:p-6 absolute top-0 left-0 right-0 z-10">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/">
              <img src={logo} alt="Finonest" className="h-8 md:h-10 object-contain" />
            </Link>
            <Link 
              to="/" 
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-20 md:py-24">
          <div className="w-full max-w-6xl">
            {/* Desktop Layout - Switches based on Login/Signup */}
            <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch transition-all duration-500 ${isLogin ? '' : 'lg:direction-rtl'}`}>
              {isLogin ? (
                <>
                  <ImageSection />
                  <FormSection />
                </>
              ) : (
                <>
                  <FormSection />
                  <ImageSection />
                </>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Finonest. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Auth;