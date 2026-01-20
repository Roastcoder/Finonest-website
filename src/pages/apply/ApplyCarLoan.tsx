import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Car, CheckCircle, Percent, Calendar, FileCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadForm from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/button";
import { submitLoanApplication } from "@/lib/api";
import type { LeadFormData } from "@/lib/validators";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const loanTypes = [
  { id: "new", name: "New Car Loan", desc: "Finance your dream car", rate: "7.25% p.a." },
  { id: "used", name: "Used Car Loan", desc: "Pre-owned car financing", rate: "9.50% p.a." },
];

const features = [
  { icon: Percent, title: "Competitive Rates", desc: "Starting from 7.25% p.a." },
  { icon: Calendar, title: "Flexible Tenure", desc: "Up to 7 years repayment" },
  { icon: FileCheck, title: "90% Financing", desc: "Up to 90% of on-road price" },
];

const ApplyCarLoan = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedType, setSelectedType] = useState("new");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth?redirect=/apply-car-loan");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        navigate("/auth?redirect=/apply-car-loan");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (data: LeadFormData) => {
    if (!user) return;

    const loanType = selectedType === "new" ? "Car Loan" : "Used Car Loan";
    const result = await submitLoanApplication(user.id, {
      ...data,
      loanType,
    });

    if (result.success) {
      setSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We'll contact you about car loan options within 24 hours.",
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
              Our team will review your details and contact you with the best car loan offers.
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
        <title>Apply for Car Loan - Finonest | New & Used Car Financing</title>
        <meta name="description" content="Get instant car loans for new and used cars with low interest rates. Up to 90% financing with flexible tenure." />
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8 px-6 pt-24">
        <div className="container max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Car className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Apply for Car Loan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Drive your dream car today with our hassle-free car loan options
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Loan Type Selection & Features */}
            <div className="space-y-8">
              {/* Loan Type Toggle */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Select Loan Type</h2>
                <div className="grid grid-cols-2 gap-4">
                  {loanTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedType === type.id
                          ? "border-primary bg-primary/5 ring-2 ring-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <h3 className="font-semibold text-foreground">{type.name}</h3>
                      <p className="text-sm text-muted-foreground">{type.desc}</p>
                      <p className="text-sm font-medium text-primary mt-2">{type.rate}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-card rounded-2xl border border-border shadow-xl p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Quick Apply</h2>
              <LeadForm
                loanType={selectedType === "new" ? "Car Loan" : "Used Car Loan"}
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

export default ApplyCarLoan;
