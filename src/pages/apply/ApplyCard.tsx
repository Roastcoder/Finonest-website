import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadForm from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { submitLoanApplication } from "@/lib/api";
import type { LeadFormData } from "@/lib/validators";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const creditCards = [
  { name: "Cashback Card", benefit: "Up to 5% cashback", color: "from-emerald-500 to-teal-600" },
  { name: "Travel Card", benefit: "Free lounge access", color: "from-blue-500 to-indigo-600" },
  { name: "Rewards Card", benefit: "10X reward points", color: "from-purple-500 to-pink-600" },
  { name: "Premium Card", benefit: "Premium lifestyle benefits", color: "from-amber-500 to-orange-600" },
];

const ApplyCard = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth?redirect=/apply-card");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        navigate("/auth?redirect=/apply-card");
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
      loanType: "Credit Card",
    });

    if (result.success) {
      setSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We'll contact you about credit card options within 24 hours.",
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
              Our team will review your details and contact you with the best credit card options.
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
        <title>Apply for Credit Card - Finonest | Instant Approval</title>
        <meta name="description" content="Apply for the best credit cards with instant approval. Cashback, travel, rewards cards from top banks." />
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8 px-6 pt-24">
        <div className="container max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <CreditCard className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Apply for Credit Card
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get instant approval on premium credit cards with exclusive benefits and rewards
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Card Options */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">Available Cards</h2>
              <div className="grid gap-4">
                {creditCards.map((card) => (
                  <div
                    key={card.name}
                    className={`relative overflow-hidden rounded-2xl p-6 text-white bg-gradient-to-r ${card.color}`}
                  >
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-1">{card.name}</h3>
                      <p className="text-white/80">{card.benefit}</p>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
                      <CreditCard className="w-24 h-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-card rounded-2xl border border-border shadow-xl p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Quick Apply</h2>
              <LeadForm
                loanType="Credit Card"
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

export default ApplyCard;
