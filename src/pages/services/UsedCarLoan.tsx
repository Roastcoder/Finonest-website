import { Helmet } from "react-helmet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Car, 
  CheckCircle, 
  FileText, 
  Calculator, 
  Clock, 
  Percent,
  Shield,
  Zap,
  ArrowRight,
  Phone,
  Building2,
  Users,
  Award,
  IndianRupee,
  Calendar,
  MapPin,
  Briefcase,
  CreditCard,
  FileCheck,
  Loader2
} from "lucide-react";
import serviceCarLoan from "@/assets/service-car-loan.jpg";

const UsedCarLoan = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    employmentType: "",
    monthlyIncome: "",
    loanAmount: "",
    carAge: "",
    additionalNotes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Login Required",
          description: "Please login to submit a loan application.",
          variant: "destructive"
        });
        navigate("/auth");
        return;
      }
      
      const { error } = await supabase.from("loan_applications").insert({
        user_id: user.id,
        loan_type: "Used Car Loan",
        amount: parseFloat(formData.loanAmount) || 0,
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        employment_type: formData.employmentType,
        monthly_income: parseFloat(formData.monthlyIncome) || 0,
        notes: `City: ${formData.city}, Car Age: ${formData.carAge} years, Notes: ${formData.additionalNotes}`
      });

      if (error) throw error;

      // Redirect to success page
      navigate(`/form-success?service=${encodeURIComponent("Used Car Loan")}&name=${encodeURIComponent(formData.fullName)}`);
      
      toast({
        title: "Application Submitted!",
        description: "Our loan expert will contact you within 24 hours.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Percent, title: "From 7.5% p.a.", description: "Best market rates" },
    { icon: Zap, title: "24-Hour Approval", description: "Quick disbursal" },
    { icon: Shield, title: "35+ Bank Partners", description: "Maximum options" },
    { icon: Clock, title: "7 Year Tenure", description: "Flexible EMIs" },
  ];

  const eligibility = [
    { icon: Users, text: "Indian Resident aged 21-65 years" },
    { icon: IndianRupee, text: "Minimum monthly income ₹20,000" },
    { icon: Briefcase, text: "Salaried or Self-employed individuals" },
    { icon: Calendar, text: "Minimum 1 year work experience" },
    { icon: CreditCard, text: "Credit score 650+ preferred" },
    { icon: Car, text: "Car age up to 10 years at loan maturity" },
  ];

  const documents = [
    { icon: FileCheck, text: "Identity Proof (Aadhaar Card, PAN Card)" },
    { icon: MapPin, text: "Address Proof (Utility Bill, Passport)" },
    { icon: IndianRupee, text: "Income Proof (Last 3 months salary slips)" },
    { icon: Building2, text: "Bank Statements (Last 6 months)" },
    { icon: FileText, text: "Passport size photographs (2 copies)" },
    { icon: Car, text: "Vehicle RC, Insurance & Valuation Report" },
  ];

  const loanDetails = [
    { label: "Loan Amount", value: "₹1 Lakh - ₹1.5 Crore" },
    { label: "Interest Rate", value: "7.5% - 14% p.a." },
    { label: "Processing Fee", value: "0.5% - 2%" },
    { label: "Loan Tenure", value: "1 - 7 Years" },
    { label: "Funding", value: "Up to 90% of car value" },
    { label: "Car Age", value: "Up to 10 years at maturity" },
  ];

  const bankPartners = [
    "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra", 
    "IndusInd Bank", "IDFC First", "Poonawalla Fincorp", "Bajaj Finance"
  ];

  const whyChooseUs = [
    { icon: Award, title: "Best Rates Guaranteed", description: "We compare 35+ banks to get you the lowest interest rate" },
    { icon: Zap, title: "Fastest Processing", description: "Get approval within 24 hours with minimal documentation" },
    { icon: Shield, title: "100% Transparent", description: "No hidden charges, complete clarity on all fees" },
    { icon: Users, title: "Expert Guidance", description: "Dedicated loan advisor throughout your journey" },
  ];

  return (
    <>
      <Helmet>
        <title>Used Car Loan - Finonest | Rates from 7.5% | Up to ₹1.5 Crore</title>
        <meta name="description" content="Get the best used car loan in India with Finonest. Interest rates from 7.5% p.a., up to 90% financing, 24-hour approval. Compare 35+ banks. Apply now!" />
        <meta name="keywords" content="used car loan, second hand car loan, pre-owned car finance, best used car loan rates, used car EMI calculator" />
        <link rel="canonical" href="https://finonest.com/services/used-car-loan" />
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-background pb-16 lg:pb-0">
        {/* Hero Section */}
        <section className="relative pt-20 pb-12 md:pt-28 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute top-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="container relative z-10 px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="animate-fade-in">
                <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-6">
                  <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-medium">
                    <Car className="w-3 h-3 md:w-4 md:h-4" />
                    Our Flagship Product
                  </span>
                  <span className="px-2 md:px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-bold">
                    INSTANT APPROVAL
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 md:mb-6 leading-tight">
                  Used Car Loan <br className="hidden sm:block" />
                  <span className="text-gradient">Made Simple</span>
                </h1>
                
                <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                  India's most trusted used car financing partner. Get instant approval 
                  with rates starting at just 7.5% p.a. Finance up to ₹1.5 Crore 
                  with minimal documentation.
                </p>

                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                  {features.map((feature, index) => (
                    <div key={index} className="text-center p-2 md:p-3 bg-card rounded-lg border border-border">
                      <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary mx-auto mb-1 md:mb-2" />
                      <div className="text-xs md:text-sm font-semibold text-foreground">{feature.title}</div>
                      <div className="text-xs text-muted-foreground hidden sm:block">{feature.description}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Button size="lg" className="w-full sm:w-auto shadow-lg" asChild>
                    <a href="#apply-form">
                      Apply Now
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                    <a href="tel:+919876543210">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Call Expert
                    </a>
                  </Button>
                </div>
              </div>

              <div className="relative animate-slide-up order-first lg:order-last">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={serviceCarLoan} 
                    alt="Used Car Loan - Finonest" 
                    className="w-full h-64 sm:h-80 lg:h-[450px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                  
                  {/* Stats Overlay */}
                  <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                    <div className="bg-card/90 backdrop-blur p-3 md:p-4 rounded-xl border border-border">
                      <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                        <div>
                          <div className="text-lg md:text-2xl font-bold text-primary">₹1.5Cr</div>
                          <div className="text-xs text-muted-foreground">Max Loan</div>
                        </div>
                        <div>
                          <div className="text-lg md:text-2xl font-bold text-primary">7 Yrs</div>
                          <div className="text-xs text-muted-foreground">Max Tenure</div>
                        </div>
                        <div>
                          <div className="text-lg md:text-2xl font-bold text-primary">7.5%</div>
                          <div className="text-xs text-muted-foreground">Starting</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-2 -right-2 md:top-4 md:-right-4 animate-bounce-slow">
                  <div className="bg-gradient-primary rounded-full p-3 md:p-4 shadow-lg">
                    <div className="text-center text-primary-foreground">
                      <p className="text-xs font-medium">EMI from</p>
                      <p className="text-sm md:text-lg font-bold">₹1,599</p>
                      <p className="text-xs opacity-80">per lakh</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bank Partners Strip */}
        <section className="py-6 md:py-8 bg-muted/30 border-y border-border">
          <div className="container px-4">
            <p className="text-center text-xs md:text-sm text-muted-foreground mb-4">Partnered with India's Leading Banks & NBFCs</p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-6">
              {bankPartners.map((bank, index) => (
                <span key={index} className="px-3 md:px-4 py-1.5 md:py-2 bg-card rounded-full text-xs md:text-sm font-medium text-foreground border border-border">
                  {bank}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Loan Details */}
        <section className="py-12 md:py-16">
          <div className="container px-4">
            <div className="text-center mb-8 md:mb-12">
              <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
                Loan Details
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-3 md:mb-4">
                Used Car Loan at a Glance
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Get complete financing for your pre-owned car with flexible terms
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {loanDetails.map((detail, index) => (
                <div 
                  key={index}
                  className="bg-card p-4 md:p-6 rounded-xl border border-border text-center hover:border-primary/50 transition-colors"
                >
                  <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">{detail.label}</p>
                  <p className="text-sm md:text-lg font-bold text-foreground">{detail.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-8 md:mb-12">
              <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
                Why Finonest
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-3 md:mb-4">
                Why Choose Finonest for Used Car Loan?
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {whyChooseUs.map((item, index) => (
                <div 
                  key={index}
                  className="bg-card p-5 md:p-6 rounded-xl border border-border hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 md:mb-4">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility & Documents */}
        <section className="py-12 md:py-16">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-card p-5 md:p-8 rounded-2xl border border-border shadow-lg">
                <div className="flex items-center gap-3 mb-5 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">Eligibility Criteria</h2>
                </div>
                <ul className="space-y-3 md:space-y-4">
                  {eligibility.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm md:text-base text-muted-foreground">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card p-5 md:p-8 rounded-2xl border border-border shadow-lg">
                <div className="flex items-center gap-3 mb-5 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">Documents Required</h2>
                </div>
                <ul className="space-y-3 md:space-y-4">
                  {documents.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-accent/5 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-sm md:text-base text-muted-foreground">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply-form" className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
                  Quick Application
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-3 md:mb-4">
                  Apply for Used Car Loan
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Fill in your details and our loan expert will contact you within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-card p-5 md:p-8 rounded-2xl border border-border shadow-lg">
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm md:text-base">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="h-10 md:h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm md:text-base">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter 10-digit mobile number"
                      required
                      className="h-10 md:h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm md:text-base">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      className="h-10 md:h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm md:text-base">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                      required
                      className="h-10 md:h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employmentType" className="text-sm md:text-base">Employment Type *</Label>
                    <Select value={formData.employmentType} onValueChange={(value) => handleSelectChange("employmentType", value)}>
                      <SelectTrigger className="h-10 md:h-11">
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salaried">Salaried</SelectItem>
                        <SelectItem value="self-employed">Self Employed</SelectItem>
                        <SelectItem value="business">Business Owner</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome" className="text-sm md:text-base">Monthly Income (₹) *</Label>
                    <Input
                      id="monthlyIncome"
                      name="monthlyIncome"
                      type="number"
                      value={formData.monthlyIncome}
                      onChange={handleInputChange}
                      placeholder="Enter monthly income"
                      required
                      className="h-10 md:h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loanAmount" className="text-sm md:text-base">Loan Amount Required (₹) *</Label>
                    <Input
                      id="loanAmount"
                      name="loanAmount"
                      type="number"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      placeholder="Enter loan amount"
                      required
                      className="h-10 md:h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="carAge" className="text-sm md:text-base">Car Age (Years) *</Label>
                    <Select value={formData.carAge} onValueChange={(value) => handleSelectChange("carAge", value)}>
                      <SelectTrigger className="h-10 md:h-11">
                        <SelectValue placeholder="Select car age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 Years</SelectItem>
                        <SelectItem value="1-3">1-3 Years</SelectItem>
                        <SelectItem value="3-5">3-5 Years</SelectItem>
                        <SelectItem value="5-7">5-7 Years</SelectItem>
                        <SelectItem value="7-10">7-10 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="additionalNotes" className="text-sm md:text-base">Additional Notes (Optional)</Label>
                    <Textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      placeholder="Any specific requirements or car model you're looking for?"
                      rows={3}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full mt-6 md:mt-8"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  By submitting, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-primary text-primary-foreground">
          <div className="container px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 text-center lg:text-left">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4">
                  Ready to Drive Your Dream Car?
                </h2>
                <p className="text-primary-foreground/80 max-w-xl text-sm md:text-base">
                  Get pre-approved for your used car loan in minutes. Our experts will 
                  help you find the best deal from 35+ partner banks.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
                  <a href="#apply-form">
                    Apply Now
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <a href="/emi-calculator">
                    <Calculator className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Calculate EMI
                  </a>
                </Button>
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

export default UsedCarLoan;
