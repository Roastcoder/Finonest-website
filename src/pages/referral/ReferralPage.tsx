import { useState } from "react";
import { Helmet } from "react-helmet";
import { Users, Gift, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { submitReferral, type ReferralData } from "@/lib/api";
import { isValidEmail, isValidPhone } from "@/lib/validators";

const rewards = [
  { amount: "₹500", desc: "For Home Loan referral" },
  { amount: "₹300", desc: "For Personal Loan referral" },
  { amount: "₹200", desc: "For Car Loan referral" },
  { amount: "₹100", desc: "For Credit Card referral" },
];

const loanTypes = [
  "Home Loan",
  "Personal Loan",
  "Car Loan",
  "Business Loan",
  "Credit Card",
  "Loan Against Property",
];

const ReferralPage = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerPhone: "",
    referrerEmail: "",
    refereeName: "",
    refereePhone: "",
    refereeEmail: "",
    loanType: "",
  });
  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.referrerName.trim()) newErrors.referrerName = "Your name is required";
    if (!isValidPhone(formData.referrerPhone)) newErrors.referrerPhone = "Valid phone number required";
    if (!isValidEmail(formData.referrerEmail)) newErrors.referrerEmail = "Valid email required";
    if (!formData.refereeName.trim()) newErrors.refereeName = "Friend's name is required";
    if (!isValidPhone(formData.refereePhone)) newErrors.refereePhone = "Valid phone number required";
    if (!isValidEmail(formData.refereeEmail)) newErrors.refereeEmail = "Valid email required";
    if (!formData.loanType) newErrors.loanType = "Please select a loan type";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    
    const result = await submitReferral(formData as ReferralData);
    
    if (result.success) {
      setSubmitted(true);
      toast({
        title: "Referral Submitted!",
        description: "We'll contact your friend soon. You'll earn rewards when they get approved!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit referral. Please try again.",
      });
    }
    
    setLoading(false);
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
              Referral Submitted!
            </h1>
            <p className="text-muted-foreground mb-8">
              Thanks for referring your friend! We'll contact them soon. 
              You'll receive your reward once their loan is approved.
            </p>
            <Button onClick={() => setSubmitted(false)}>
              Refer Another Friend
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Refer & Earn - Finonest | Earn Rewards for Referrals</title>
        <meta name="description" content="Refer your friends and family to Finonest and earn exciting rewards. Earn up to ₹500 per successful referral." />
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8 px-6 pt-24">
        <div className="container max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Gift className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Refer & Earn Rewards
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Help your friends get the best loans and earn exciting rewards for every successful referral
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Rewards Info */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Referral Rewards
              </h2>
              
              <div className="grid gap-4 mb-8">
                {rewards.map((reward) => (
                  <div
                    key={reward.desc}
                    className="flex items-center justify-between p-4 bg-card rounded-xl border border-border"
                  >
                    <span className="text-foreground">{reward.desc}</span>
                    <span className="text-xl font-bold text-primary">{reward.amount}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-4">How It Works</h3>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">1</span>
                    <span className="text-muted-foreground">Fill in your details and your friend's information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">2</span>
                    <span className="text-muted-foreground">We contact your friend with the best loan offers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">3</span>
                    <span className="text-muted-foreground">Once their loan is approved, you get your reward!</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Referral Form */}
            <div className="bg-card rounded-2xl border border-border shadow-xl p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Referral Form</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Your Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Your Details</h3>
                  <Input
                    placeholder="Your Name *"
                    value={formData.referrerName}
                    onChange={(e) => handleChange("referrerName", e.target.value)}
                    className={errors.referrerName ? "border-destructive" : ""}
                  />
                  {errors.referrerName && <p className="text-sm text-destructive">{errors.referrerName}</p>}
                  
                  <Input
                    placeholder="Your Mobile *"
                    value={formData.referrerPhone}
                    onChange={(e) => handleChange("referrerPhone", e.target.value)}
                    className={errors.referrerPhone ? "border-destructive" : ""}
                  />
                  {errors.referrerPhone && <p className="text-sm text-destructive">{errors.referrerPhone}</p>}
                  
                  <Input
                    type="email"
                    placeholder="Your Email *"
                    value={formData.referrerEmail}
                    onChange={(e) => handleChange("referrerEmail", e.target.value)}
                    className={errors.referrerEmail ? "border-destructive" : ""}
                  />
                  {errors.referrerEmail && <p className="text-sm text-destructive">{errors.referrerEmail}</p>}
                </div>

                {/* Friend's Details */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Friend's Details</h3>
                  <Input
                    placeholder="Friend's Name *"
                    value={formData.refereeName}
                    onChange={(e) => handleChange("refereeName", e.target.value)}
                    className={errors.refereeName ? "border-destructive" : ""}
                  />
                  {errors.refereeName && <p className="text-sm text-destructive">{errors.refereeName}</p>}
                  
                  <Input
                    placeholder="Friend's Mobile *"
                    value={formData.refereePhone}
                    onChange={(e) => handleChange("refereePhone", e.target.value)}
                    className={errors.refereePhone ? "border-destructive" : ""}
                  />
                  {errors.refereePhone && <p className="text-sm text-destructive">{errors.refereePhone}</p>}
                  
                  <Input
                    type="email"
                    placeholder="Friend's Email *"
                    value={formData.refereeEmail}
                    onChange={(e) => handleChange("refereeEmail", e.target.value)}
                    className={errors.refereeEmail ? "border-destructive" : ""}
                  />
                  {errors.refereeEmail && <p className="text-sm text-destructive">{errors.refereeEmail}</p>}

                  <select
                    value={formData.loanType}
                    onChange={(e) => handleChange("loanType", e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border bg-background text-foreground ${
                      errors.loanType ? "border-destructive" : "border-border"
                    }`}
                  >
                    <option value="">Loan Type Required *</option>
                    {loanTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.loanType && <p className="text-sm text-destructive">{errors.loanType}</p>}
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Submit Referral
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ReferralPage;
