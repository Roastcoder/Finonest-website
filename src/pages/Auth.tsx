import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  CheckCircle,
  Star,
  Shield,
  Clock,
} from "lucide-react";
import { z } from "zod";
import logo from "@/assets/logo.png";
import heroHomeLoan from "@/assets/hero-home-loan.jpg";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    fullName?: string;
  }>({});

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    try {
      emailSchema.parse(email);
    } catch (e: any) {
      newErrors.email = e.errors?.[0]?.message;
    }

    try {
      passwordSchema.parse(password);
    } catch (e: any) {
      newErrors.password = e.errors?.[0]?.message;
    }

    if (!isLogin && !fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) return;

    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const endpoint = isLogin ? "/api/v1/auth/login" : "/api/v1/auth/register";

      const payload = isLogin
        ? { email, password }
        : { email, password, fullName: fullName.trim() };

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message || "Something went wrong",
        });
        return;
      }

      localStorage.setItem("token", data.data.token);

      toast({
        title: isLogin ? "Welcome Back!" : "Account Created!",
        description: isLogin
          ? "You have successfully logged in."
          : "Welcome to Finonest.",
      });

      navigate("/dashboard");
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unexpected error occurred",
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

  return (
    <>
      <Helmet>
        <title>{isLogin ? "Login" : "Sign Up"} | Finonest</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-blue-100">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 p-4 z-20">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/">
              <img src={logo} alt="Finonest" className="h-8 brightness-0 invert" />
            </Link>
            <Link to="/" className="text-sm text-white hover:text-blue-200">
              ← Back to Home
            </Link>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 grid lg:grid-cols-2 h-screen">
          {/* Text Content - Left Side */}
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-r from-blue-600 via-blue-500 to-white p-12">
            <div className="text-white max-w-lg">
              <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg">
                Welcome to Finonest
              </h1>
              <p className="text-xl mb-8 text-white/90 drop-shadow">
                Your trusted partner for all financial solutions. Get loans approved faster with our seamless digital process.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4 text-white drop-shadow">Why Choose Finonest?</h3>
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/30 backdrop-blur rounded-full flex items-center justify-center">
                      <b.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90 drop-shadow">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form - Right Side */}
          <div className="flex items-center justify-center p-8 bg-gray-50">
            <div className="w-full max-w-md">
              <div className="bg-white p-8 rounded-2xl shadow-xl border">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {isLogin ? "Sign in to your account" : "Join thousands of happy customers"}
                  </p>
                </div>

                <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      isLogin ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      !isLogin ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder={isLogin ? "Enter password" : "Create password (min 6 chars)"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-12 border border-gray-300 rounded-lg px-4 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                    )}
                  </div>

                  <Button 
                    disabled={loading} 
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {isLogin ? "Sign In" : "Create Account"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="ml-1 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {isLogin ? "Sign up" : "Sign in"}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}