import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Wallet, CheckCircle, BadgePercent, Clock, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadForm from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/button";
import { submitLoanApplication } from "@/lib/api";
import type { LeadFormData } from "@/lib/validators";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const benefits = [
  { icon: BadgePercent, title: "Low Interest Rates", desc: "Starting from 10.49% p.a." },
  { icon: Clock, title: "Quick Disbursement", desc: "Get funds in 24-48 hours" },
  { icon: Shield, title: "No Collateral", desc: "Unsecured personal loans" },
];

const ApplyPersonalLoan = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth?redirect=/apply-personal-loan");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        navigate("/auth?redirect=/apply-personal-loan");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (data: LeadFormData) => {
    if (!user) return;

    const result = await submitLoanApplication(user.id, {
      ...data,
      loanType: "Personal Loan",
    });

    if (result.success) {
      setSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We'll contact you about personal loan options within 24 hours.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Failed to submit application.",
      });
    }
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-6 pt-24">
          <div className="max-w-md text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-4">
              Application Submitted!
            </h1>
            <p className="text-muted-foreground mb-8">
              Our team will review your details and contact you with the best personal loan offers.
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
        <title>Apply for Personal Loan - Finonest | Low Interest Rates</title>
        <meta name="description" content="Get instant personal loans up to ₹40 Lakhs with low interest rates. Quick approval and fast disbursement." />
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8 px-6 pt-24">
        <div className="container max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Wallet className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Apply for Personal Loan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get instant approval on personal loans up to ₹40 Lakhs with minimal documentation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">Why Choose Our Personal Loans?</h2>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
                <h3 className="font-semibold text-foreground mb-3">Loan Amount Range</h3>
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>₹50,000</span>
                  <span>₹40,00,000</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent rounded-full" />
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-card rounded-2xl border border-border shadow-xl p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Quick Apply</h2>
              <LeadForm
                loanType="Personal Loan"
                showLoanTypeSelect={false}
                onSubmit={handleSubmit}
                submitLabel="Apply Now"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ApplyPersonalLoan;
