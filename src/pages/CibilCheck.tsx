import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Shield, CheckCircle, AlertTriangle, TrendingUp, FileText, ArrowRight, Loader2 } from "lucide-react";

const cibilFactors = [
  {
    title: "Payment History",
    description: "Your track record of paying bills and EMIs on time",
    weight: "35%",
    icon: FileText,
  },
  {
    title: "Credit Utilization",
    description: "The ratio of credit used vs total credit available",
    weight: "30%",
    icon: TrendingUp,
  },
  {
    title: "Credit Age",
    description: "How long you've been using credit products",
    weight: "15%",
    icon: Shield,
  },
  {
    title: "Credit Mix",
    description: "Variety of credit types - loans, cards, etc.",
    weight: "10%",
    icon: CheckCircle,
  },
];

const scoreRanges = [
  { range: "750-900", rating: "Excellent", color: "bg-green-500", description: "Best loan rates and quick approvals" },
  { range: "650-749", rating: "Good", color: "bg-blue-500", description: "Good chances of loan approval" },
  { range: "550-649", rating: "Fair", color: "bg-yellow-500", description: "May face higher interest rates" },
  { range: "300-549", rating: "Poor", color: "bg-red-500", description: "Loan approval may be difficult" },
];

const CibilCheck = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    pan: "",
    dob: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.pan) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields.",
      });
      return;
    }

    if (!consent) {
      toast({
        variant: "destructive",
        title: "Consent Required",
        description: "Please agree to the Terms & Conditions and Privacy Policy.",
      });
      return;
    }

    // Validate PAN format
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.pan.toUpperCase())) {
      toast({
        variant: "destructive",
        title: "Invalid PAN",
        description: "Please enter a valid PAN number (e.g., ABCDE1234F).",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: "Request Submitted!",
        description: "Our team will share your CIBIL report within 24 hours.",
      });
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Check CIBIL Score - Finonest | Free Credit Score Check</title>
        <meta name="description" content="Check your CIBIL score for free with Finonest. Get your credit report and understand your credit health. Improve your chances of loan approval." />
        <meta name="keywords" content="CIBIL score, credit score check, free credit report, Finonest, credit rating" />
        <link rel="canonical" href="https://finonest.com/cibil-check" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                  <Shield className="w-4 h-4" />
                  Free CIBIL Check
                </span>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                  Know Your <span className="text-gradient">Credit Score</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Your CIBIL score is the key to getting better loan rates and faster approvals. 
                  Check your score for free and understand your credit health.
                </p>
                
                {/* Score Ranges */}
                <div className="space-y-3">
                  {scoreRanges.map((range, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${range.color}`} />
                      <span className="font-medium text-foreground w-20">{range.range}</span>
                      <span className="text-muted-foreground">{range.rating} - {range.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="bg-card rounded-2xl border border-border shadow-xl p-8">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2">Request Submitted!</h3>
                    <p className="text-muted-foreground mb-6">
                      Our team will share your CIBIL report on your email/WhatsApp within 24 hours.
                    </p>
                    <Button variant="outline" onClick={() => setSubmitted(false)}>
                      Check Another Score
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                      Check Your CIBIL Score
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Fill in your details to get your free credit report
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Full Name (as per PAN) *
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          PAN Number *
                        </label>
                        <Input
                          type="text"
                          placeholder="ABCDE1234F"
                          value={formData.pan}
                          onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                          maxLength={10}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Date of Birth
                        </label>
                        <Input
                          type="date"
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                      
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="cibil-consent"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <label htmlFor="cibil-consent" className="text-sm text-muted-foreground">
                          I agree to the{" "}
                          <Link to="/terms-and-conditions" className="text-primary hover:underline">
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy-policy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                          . I consent to Finonest checking my CIBIL score.
                        </label>
                      </div>
                      
                      <Button type="submit" className="w-full" size="lg" disabled={loading}>
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            Check My Score
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                      
                      <p className="text-center text-muted-foreground text-xs">
                        Your data is secure and will only be used for credit score check.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Factors */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Understanding CIBIL
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                What Affects Your Score?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Learn about the key factors that determine your credit score
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cibilFactors.map((factor, index) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <factor.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">{factor.weight}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{factor.title}</h3>
                  <p className="text-muted-foreground text-sm">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="py-16">
          <div className="container">
            <div className="bg-card rounded-2xl border border-border p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                    Tips to Improve Your CIBIL Score
                  </h2>
                  <div className="space-y-4">
                    {[
                      "Pay all your EMIs and credit card bills on time",
                      "Keep your credit utilization below 30%",
                      "Avoid applying for multiple loans at once",
                      "Maintain a healthy mix of secured and unsecured credit",
                      "Regularly check your credit report for errors",
                      "Keep old credit accounts active",
                    ].map((tip, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-accent" />
                    <h3 className="text-xl font-semibold text-foreground">Why It Matters</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    A good CIBIL score (750+) can help you get loan approvals faster and at lower interest rates, 
                    saving you thousands of rupees over the loan tenure.
                  </p>
                  <Button variant="hero" asChild>
                    <Link to="/apply">
                      Apply for Loan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <BottomNavigation />
    </>
  );
};

export default CibilCheck;
