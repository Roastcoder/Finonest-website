import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRight,
  Loader2,
  CheckCircle,
  Star,
  Shield,
  Clock,
  Phone,
  MessageSquare,
} from "lucide-react";
import { customerAuthAPI } from "@/lib/api";
import logo from "@/assets/logo.png";

export default function CustomerAuth() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errors, setErrors] = useState<{ phone?: string; otp?: string }>({});

  const navigate = useNavigate();
  const { toast } = useToast();

  const validatePhone = (phoneNumber: string): boolean => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    return /^[6-9]\d{9}$/.test(cleaned);
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const cleanedPhone = phone.replace(/\D/g, '');
    if (!validatePhone(cleanedPhone)) {
      setErrors({ phone: 'Please enter a valid 10-digit mobile number' });
      return;
    }

    setLoading(true);
    try {
      const response = await customerAuthAPI.sendOTP(cleanedPhone);
      if (response.status === 'ok') {
        setOtpSent(true);
        setStep('otp');
        setCountdown(60); // 60 second cooldown
        
        // Start countdown
        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        toast({
          title: "OTP Sent!",
          description: `We've sent an OTP to ${cleanedPhone}. Please check your messages.`,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send OTP. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (otp.length !== 6) {
      setErrors({ otp: 'Please enter the 6-digit OTP' });
      return;
    }

    setLoading(true);
    try {
      const cleanedPhone = phone.replace(/\D/g, '');
      const response = await customerAuthAPI.verifyOTP(cleanedPhone, otp);
      
      if (response.status === 'ok' && response.data?.accessToken) {
        toast({
          title: "Welcome!",
          description: "You have successfully logged in.",
        });
        navigate("/customer/dashboard");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Invalid OTP. Please try again.",
      });
      setErrors({ otp: 'Invalid OTP' });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    const cleanedPhone = phone.replace(/\D/g, '');
    setLoading(true);
    try {
      await customerAuthAPI.sendOTP(cleanedPhone);
      setCountdown(60);
      toast({
        title: "OTP Resent",
        description: "A new OTP has been sent to your phone.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to resend OTP.",
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
        <title>Login - Finonest | Quick OTP Login</title>
        <meta name="description" content="Login to your Finonest account using OTP. Fast, secure, and hassle-free." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block space-y-8">
            <Link to="/" className="inline-block">
              <img src={logo} alt="Finonest" className="h-12 object-contain mb-8" />
            </Link>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Welcome to <span className="text-gradient-primary">Finonest</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Login with OTP for a quick and secure experience. No passwords needed!
            </p>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <benefit.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
              <div className="text-center mb-8 lg:hidden">
                <Link to="/" className="inline-block mb-4">
                  <img src={logo} alt="Finonest" className="h-10 object-contain mx-auto" />
                </Link>
                <h2 className="text-2xl font-display font-bold text-foreground">Login</h2>
              </div>

              {step === 'phone' ? (
                <form onSubmit={handleSendOTP} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="tel"
                        placeholder="Enter your 10-digit mobile number"
                        value={phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setPhone(value);
                          setErrors({});
                        }}
                        className="pl-10 h-12"
                        maxLength={10}
                        required
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12"
                    disabled={loading || phone.length !== 10}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Send OTP
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By continuing, you agree to our Terms & Conditions and Privacy Policy
                  </p>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Enter OTP
                    </label>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => {
                          setOtp(value);
                          setErrors({});
                        }}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    {errors.otp && (
                      <p className="text-sm text-destructive mt-2 text-center">{errors.otp}</p>
                    )}
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      OTP sent to {phone.replace(/(\d{2})(\d{4})(\d{4})/, '+91 $1 $2 $3')}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify & Login
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>

                  <div className="text-center space-y-2">
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={countdown > 0}
                      className="text-sm text-primary hover:underline disabled:text-muted-foreground disabled:no-underline"
                    >
                      {countdown > 0 ? (
                        <>Resend OTP in {countdown}s</>
                      ) : (
                        <>
                          <MessageSquare className="w-4 h-4 inline mr-1" />
                          Resend OTP
                        </>
                      )}
                    </button>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setStep('phone');
                          setOtp('');
                          setOtpSent(false);
                        }}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Change phone number
                      </button>
                    </div>
                  </div>
                </form>
              )}

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-center text-muted-foreground">
                  Admin? <Link to="/admin/login" className="text-primary hover:underline">Login here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
