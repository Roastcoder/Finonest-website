import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { applicationsAPI, profileAPI } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowRight, 
  Loader2, 
  CheckCircle, 
  Home, 
  Car, 
  Briefcase, 
  Building, 
  CreditCard, 
  Landmark, 
  GraduationCap,
  User,
  FileText,
  Banknote,
  MapPin,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from "lucide-react";

const serviceDetails: Record<string, { title: string; icon: React.ElementType; description: string; loanType: string }> = {
  "home-loan": {
    title: "Home Loan",
    icon: Home,
    description: "Turn your dream home into reality with competitive rates starting at 8.35% p.a.",
    loanType: "Home Loan",
  },
  "car-loan": {
    title: "Car Loan",
    icon: Car,
    description: "Get your dream car with easy financing and quick approval.",
    loanType: "Car Loan",
  },
  "used-car-loan": {
    title: "Used Car Loan",
    icon: Car,
    description: "Best deals on used car loans - our specialty with quick approval.",
    loanType: "Used Car Loan",
  },
  "personal-loan": {
    title: "Personal Loan",
    icon: Briefcase,
    description: "Instant approval up to ₹40 lakhs with minimal documentation.",
    loanType: "Personal Loan",
  },
  "business-loan": {
    title: "Business Loan",
    icon: Building,
    description: "Fuel your business growth with flexible loans up to ₹5 Crore.",
    loanType: "Business Loan",
  },
  "credit-cards": {
    title: "Credit Card",
    icon: CreditCard,
    description: "Premium credit cards with exclusive rewards and cashback.",
    loanType: "Credit Card",
  },
  "loan-against-property": {
    title: "Loan Against Property",
    icon: Landmark,
    description: "Unlock the value of your property with attractive interest rates.",
    loanType: "Loan Against Property",
  },
  "finobizz-learning": {
    title: "Finobizz Learning",
    icon: GraduationCap,
    description: "Enroll in our free financial education courses.",
    loanType: "Finobizz Learning",
  },
};

const ServiceApply = () => {
  const { service } = useParams<{ service: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [_submitted, _setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showKYCSection, setShowKYCSection] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    
    // KYC Documents
    panNumber: "",
    aadhaarNumber: "",
    
    // Address Details
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    residenceType: "",
    yearsAtAddress: "",
    
    // Employment Details
    employmentType: "",
    companyName: "",
    designation: "",
    workExperience: "",
    officeAddress: "",
    
    // Income Details
    monthlyIncome: "",
    otherIncome: "",
    existingEMI: "",
    
    // Loan Details
    amount: "",
    tenure: "",
    purpose: "",
    
    // Additional
    notes: "",
    consentMarketing: false,
    consentTerms: false,
  });

  const serviceInfo = service ? serviceDetails[service] : null;
  const ServiceIcon = serviceInfo?.icon || Home;
  const isLearningOrCard = serviceInfo?.loanType === "Finobizz Learning" || serviceInfo?.loanType === "Credit Card";

  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
        fullName: user.fullName || "",
      }));
      
      // Fetch profile data
      profileAPI.get().then(({ data }) => {
        if (data) {
          setFormData((prev) => ({
            ...prev,
            fullName: data.full_name || prev.fullName,
            phone: data.phone || "",
          }));
        }
      }).catch(() => {
        // Profile fetch failed, continue with user data
      });
    }
  }, [isLoggedIn, user]);

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.fullName || !formData.email || !formData.phone) {
          toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill in all required personal details.",
          });
          return false;
        }
        return true;
      case 2:
        if (!formData.employmentType) {
          toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please select your employment type.",
          });
          return false;
        }
        return true;
      case 3:
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields.",
      });
      return;
    }

    if (!formData.consentTerms) {
      toast({
        variant: "destructive",
        title: "Consent Required",
        description: "Please accept the terms and conditions to proceed.",
      });
      return;
    }

    setLoading(true);

    try {
      // Build comprehensive notes with all additional information
      const notesData = [
        `DOB: ${formData.dateOfBirth || 'N/A'}`,
        `Gender: ${formData.gender || 'N/A'}`,
        `PAN: ${formData.panNumber || 'N/A'}`,
        `Aadhaar: ${formData.aadhaarNumber ? '****' + formData.aadhaarNumber.slice(-4) : 'N/A'}`,
        `Address: ${formData.addressLine1}, ${formData.addressLine2}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        `Residence Type: ${formData.residenceType || 'N/A'}`,
        `Years at Address: ${formData.yearsAtAddress || 'N/A'}`,
        `Company: ${formData.companyName || 'N/A'}`,
        `Designation: ${formData.designation || 'N/A'}`,
        `Experience: ${formData.workExperience || 'N/A'}`,
        `Office Address: ${formData.officeAddress || 'N/A'}`,
        `Other Income: ₹${formData.otherIncome || '0'}`,
        `Existing EMI: ₹${formData.existingEMI || '0'}`,
        `Preferred Tenure: ${formData.tenure || 'N/A'}`,
        `Purpose: ${formData.purpose || 'N/A'}`,
        `Additional Notes: ${formData.notes || 'None'}`,
      ].join(' | ');

      await applicationsAPI.submit({
        loanType: serviceInfo?.loanType || "General Inquiry",
        amount: formData.amount ? parseFloat(formData.amount) : 0,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        employmentType: formData.employmentType || undefined,
        monthlyIncome: formData.monthlyIncome ? parseFloat(formData.monthlyIncome) : undefined,
        notes: notesData,
      });

      // Redirect to success page with service info
      const successUrl = `/form-success?service=${encodeURIComponent(serviceInfo?.loanType || "Loan Application")}&name=${encodeURIComponent(formData.fullName)}`;
      navigate(successUrl);
      
      toast({
        title: "Application Submitted!",
        description: "Our team will contact you within 24 hours.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to submit. Please try again or call us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!serviceInfo) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service not found</h1>
            <Button asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (_submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6 pt-24">
          <div className="max-w-md text-center bg-card p-8 rounded-2xl border border-border shadow-xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-4">
              Application Submitted!
            </h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your interest in {serviceInfo.title}. Our team will review your details and 
              contact you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/services">View More Services</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Apply for {serviceInfo.title} - Finonest</title>
        <meta name="description" content={`Apply for ${serviceInfo.title} with Finonest. ${serviceInfo.description}`} />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-gradient-hero py-8 px-4 pt-24">
        <div className="container max-w-3xl mx-auto">
          {/* Progress Steps */}
          {!isLearningOrCard && (
            <div className="mb-8">
              <div className="flex items-center justify-center gap-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        currentStep >= step
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-16 md:w-24 h-1 mx-2 rounded-full transition-colors ${
                          currentStep > step ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-3 text-sm text-muted-foreground">
                <span className={`w-32 text-center ${currentStep === 1 ? "text-primary font-medium" : ""}`}>
                  Personal Details
                </span>
                <span className={`w-32 text-center ${currentStep === 2 ? "text-primary font-medium" : ""}`}>
                  Employment & Income
                </span>
                <span className={`w-32 text-center ${currentStep === 3 ? "text-primary font-medium" : ""}`}>
                  Loan Details
                </span>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="bg-card rounded-2xl border border-border shadow-xl p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ServiceIcon className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-display font-bold text-foreground mb-2">
                Apply for {serviceInfo.title}
              </h1>
              <p className="text-muted-foreground">
                {serviceInfo.description}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Details */}
              {(currentStep === 1 || isLearningOrCard) && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name <span className="text-destructive">*</span>
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
                        Phone Number <span className="text-destructive">*</span>
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

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address <span className="text-destructive">*</span>
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
                        Date of Birth
                      </label>
                      <Input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* KYC Section - Collapsible */}
                  <div className="border border-border rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowKYCSection(!showKYCSection)}
                      className="w-full px-4 py-3 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <span className="flex items-center gap-2 font-medium text-foreground">
                        <FileText className="w-5 h-5 text-primary" />
                        KYC Documents (Optional)
                      </span>
                      {showKYCSection ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                    
                    {showKYCSection && (
                      <div className="p-4 space-y-4 border-t border-border">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              PAN Number
                            </label>
                            <Input
                              type="text"
                              placeholder="ABCDE1234F"
                              value={formData.panNumber}
                              onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                              maxLength={10}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Aadhaar Number
                            </label>
                            <Input
                              type="text"
                              placeholder="1234 5678 9012"
                              value={formData.aadhaarNumber}
                              onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value.replace(/\D/g, '') })}
                              maxLength={12}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Address Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                      <MapPin className="w-5 h-5 text-primary" />
                      Address Details
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Address Line 1
                      </label>
                      <Input
                        type="text"
                        placeholder="House/Flat No., Building Name"
                        value={formData.addressLine1}
                        onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Address Line 2
                      </label>
                      <Input
                        type="text"
                        placeholder="Street, Area, Landmark"
                        value={formData.addressLine2}
                        onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                      />
                    </div>
                    
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          City
                        </label>
                        <Input
                          type="text"
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          State
                        </label>
                        <Input
                          type="text"
                          placeholder="State"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Pincode
                        </label>
                        <Input
                          type="text"
                          placeholder="Pincode"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                          maxLength={6}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Employment & Income Details */}
              {currentStep === 2 && !isLearningOrCard && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Employment Details
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Employment Type <span className="text-destructive">*</span>
                    </label>
                    <select
                      value={formData.employmentType}
                      onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                      required
                    >
                      <option value="">Select Employment Type</option>
                      <option value="salaried">Salaried</option>
                      <option value="self-employed">Self-Employed</option>
                      <option value="business">Business Owner</option>
                      <option value="professional">Professional (Doctor, CA, etc.)</option>
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Your company name"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Designation
                      </label>
                      <Input
                        type="text"
                        placeholder="Your designation"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-lg font-semibold text-foreground mt-6 mb-4">
                    <Banknote className="w-5 h-5 text-primary" />
                    Income Details
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
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
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Other Income (₹)
                      </label>
                      <Input
                        type="number"
                        placeholder="Rent, investments, etc."
                        value={formData.otherIncome}
                        onChange={(e) => setFormData({ ...formData, otherIncome: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Existing EMI (₹/month)
                    </label>
                    <Input
                      type="number"
                      placeholder="Total existing EMI obligations"
                      value={formData.existingEMI}
                      onChange={(e) => setFormData({ ...formData, existingEMI: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Include all loan EMIs you're currently paying
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Loan Details */}
              {currentStep === 3 && !isLearningOrCard && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Loan Requirements
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Loan Amount Required (₹)
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Preferred Tenure (Years)
                      </label>
                      <select
                        value={formData.tenure}
                        onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                      >
                        <option value="">Select Tenure</option>
                        <option value="1">1 Year</option>
                        <option value="2">2 Years</option>
                        <option value="3">3 Years</option>
                        <option value="5">5 Years</option>
                        <option value="7">7 Years</option>
                        <option value="10">10 Years</option>
                        <option value="15">15 Years</option>
                        <option value="20">20 Years</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Purpose of Loan
                    </label>
                    <Textarea
                      placeholder="Briefly describe why you need this loan..."
                      rows={3}
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      className="resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Additional Notes
                    </label>
                    <Textarea
                      placeholder="Any other information you'd like to share..."
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="resize-none"
                    />
                  </div>

                  {/* Consent Checkboxes */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consentTerms}
                        onChange={(e) => setFormData({ ...formData, consentTerms: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded border-border"
                        required
                      />
                      <span className="text-sm text-muted-foreground">
                        <span className="text-destructive">*</span> I agree to the{" "}
                        <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link>
                        {" "}and{" "}
                        <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                        I consent to Finonest sharing my information with partner banks and financial institutions.
                      </span>
                    </label>
                    
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consentMarketing}
                        onChange={(e) => setFormData({ ...formData, consentMarketing: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded border-border"
                      />
                      <span className="text-sm text-muted-foreground">
                        I would like to receive promotional offers and updates from Finonest via SMS, Email, and WhatsApp.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-4">
                {!isLearningOrCard && currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1"
                  >
                    Back
                  </Button>
                )}
                
                {!isLearningOrCard && currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex-1"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Help Section */}
          <div className="mt-6 bg-muted/50 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Need Help?</p>
              <p className="text-sm text-muted-foreground">
                Call us at <a href="tel:+919876543210" className="text-primary hover:underline">+91 98765 43210</a> or{" "}
                <a href="https://wa.me/919876543210" className="text-primary hover:underline">WhatsApp</a> us for instant assistance.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default ServiceApply;
