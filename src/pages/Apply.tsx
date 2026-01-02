import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const loanTypes = [
  { value: "Home Loan", icon: "🏠" },
  { value: "Car Loan", icon: "🚗" },
  { value: "Personal Loan", icon: "💰" },
  { value: "Business Loan", icon: "💼" },
  { value: "Credit Card", icon: "💳" },
  { value: "Loan Against Property", icon: "🏢" },
];

const Apply = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    loanType: "",
    amount: "",
    fullName: "",
    email: "",
    phone: "",
    employmentType: "",
    monthlyIncome: "",
    notes: "",
    consentTerms: false,
    consentDataProcessing: false,
    consentCreditCheck: false,
    consentCommunication: false,
    consentServiceFee: false,
    consentMarketing: false
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        setFormData((prev) => ({
          ...prev,
          email: session.user.email || "",
        }));
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        setFormData((prev) => ({
          ...prev,
          email: session.user.email || "",
        }));
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, phone")
      .eq("user_id", userId)
      .single();

    if (data) {
      setFormData((prev) => ({
        ...prev,
        fullName: data.full_name || "",
        phone: data.phone || "",
      }));
    }
  };

  const handleAgreeToAll = (checked: boolean) => {
    setFormData({
      ...formData,
      consentTerms: checked,
      consentDataProcessing: checked,
      consentCreditCheck: checked,
      consentCommunication: checked,
      consentServiceFee: checked
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    if (!formData.loanType || !formData.amount || !formData.fullName || !formData.phone) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields.",
      });
      return;
    }

    if (!formData.consentTerms || !formData.consentDataProcessing || !formData.consentCreditCheck || !formData.consentCommunication || !formData.consentServiceFee) {
      toast({
        variant: "destructive",
        title: "Consent Required",
        description: "Please accept all required consents to proceed.",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("loan_applications").insert({
        user_id: user.id,
        loan_type: formData.loanType,
        amount: parseFloat(formData.amount),
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        employment_type: formData.employmentType || null,
        monthly_income: formData.monthlyIncome ? parseFloat(formData.monthlyIncome) : null,
        notes: formData.notes || null,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you within 24 hours.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit application. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6 pt-24">
          <div className="max-w-md text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-4">
              Application Submitted!
            </h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your loan application. Our team will review your details and 
              contact you within 24 hours with the next steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Apply for Loan - Finonest | Quick & Easy Application</title>
        <meta name="description" content="Apply for home loans, car loans, personal loans, and more with Finonest. Quick approval within 24 hours." />
      </Helmet>

      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-6 pt-24">
        <div className="container max-w-2xl mx-auto">
          {/* Form */}
          <div className="bg-card rounded-2xl border border-border shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-display font-bold text-foreground mb-2">
                Apply for a Loan
              </h1>
              <p className="text-muted-foreground">
                Fill in your details and we'll get back to you within 24 hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Loan Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Select Loan Type *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {loanTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, loanType: type.value })}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        formData.loanType === type.value
                          ? "border-primary bg-primary/5 ring-2 ring-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="text-2xl mb-1">{type.icon}</div>
                      <div className="text-sm font-medium text-foreground">{type.value}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Loan Amount (₹) *
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount in INR"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>

              {/* Personal Details */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  readOnly
                  className="bg-muted"
                />
              </div>

              {/* Employment Details */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Employment Type
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    <option value="">Select type</option>
                    <option value="salaried">Salaried</option>
                    <option value="self-employed">Self-Employed</option>
                    <option value="business">Business Owner</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Monthly Income (₹)
                  </label>
                  <Input
                    type="number"
                    placeholder="Your monthly income"
                    value={formData.monthlyIncome}
                    onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Notes
                </label>
                <Textarea
                  placeholder="Any additional information..."
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="resize-none"
                />
              </div>

              {/* Consent Checkboxes */}
              <div className="space-y-4 pt-6 border-t border-border">
                <div className="text-sm font-medium text-foreground mb-3">
                  Required Consents:
                </div>
                
                <label className="flex items-start gap-3 cursor-pointer bg-primary/5 p-3 rounded-lg border">
                  <input
                    type="checkbox"
                    checked={formData.consentTerms && formData.consentDataProcessing && formData.consentCreditCheck && formData.consentCommunication && formData.consentServiceFee}
                    onChange={(e) => handleAgreeToAll(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm font-medium text-primary">
                    Agree to All Required Terms & Consents
                  </span>
                </label>
                
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentTerms}
                    onChange={(e) => setFormData({ ...formData, consentTerms: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-border"
                    required
                  />
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-destructive">*</strong> I agree to the <Link to="/terms" className="text-primary hover:underline">Terms and Conditions of Service</Link> and acknowledge that FINONEST INDIA PVT LTD is a Direct Sales Agency (DSA) and not a lender.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentDataProcessing}
                    onChange={(e) => setFormData({ ...formData, consentDataProcessing: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-border"
                    required
                  />
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-destructive">*</strong> I grant explicit consent to Finonest to collect, store, process, analyze, and share my Personal Information with Banks, NBFCs, and other financial institutions for loan evaluation purposes.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentCreditCheck}
                    onChange={(e) => setFormData({ ...formData, consentCreditCheck: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-border"
                    required
                  />
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-destructive">*</strong> I consent to Finonest accessing my Credit Information Report from Credit Information Companies (CIBIL, Experian, Equifax, etc.) for loan assessment.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentCommunication}
                    onChange={(e) => setFormData({ ...formData, consentCommunication: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-border"
                    required
                  />
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-destructive">*</strong> I consent to receive communications from Finonest and/or Lenders via phone, SMS, email, and WhatsApp regarding my application, loan products, and promotional materials, regardless of my DNCR/DND registry status.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentServiceFee}
                    onChange={(e) => setFormData({ ...formData, consentServiceFee: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-border"
                    required
                  />
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-destructive">*</strong> I understand that Finonest may charge a service or processing fee for mediation services and I agree to pay such fees as applicable.
                  </span>
                </label>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-xs text-blue-800">
                    <strong>FINONEST INDIA PVT LTD</strong><br/>
                    3rd Floor, Besides Jaipur Hospital, BL Tower 1, Tonk Rd, Mahaveer Nagar, GopalPura Bypass, Jaipur, Rajasthan 302018<br/>
                    Email: info@finonest.com
                  </p>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Apply;
