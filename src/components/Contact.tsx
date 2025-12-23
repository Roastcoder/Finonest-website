import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    loanType: "",
    amount: "",
    consentTerms: false,
    consentDataProcessing: false,
    consentCommunication: false,
    consentMarketing: false
  });
  const [showTermsDialog, setShowTermsDialog] = useState(false);

  const handleAgreeToAll = (checked: boolean) => {
    setFormData({
      ...formData,
      consentTerms: checked,
      consentDataProcessing: checked,
      consentCommunication: checked
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consentTerms || !formData.consentDataProcessing || !formData.consentCommunication) {
      alert("Please accept all required consents to proceed.");
      return;
    }
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="py-10 md:py-24 bg-gradient-section">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start">
          {/* Left Side - Info (Hidden on mobile) */}
          <div className="hidden md:block">
            <span className="text-accent font-medium text-sm tracking-wider uppercase">Get In Touch</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              We're Here to Help You
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Have questions about our loan products? Our expert team is ready to assist you with personalized solutions.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Call Us</h4>
                  <p className="text-muted-foreground text-sm">+91 94625 53887</p>
                  <p className="text-muted-foreground text-sm">Mon - Sat, 9am - 7pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email Us</h4>
                  <p className="text-muted-foreground text-sm">info@finonest.com</p>
                  <p className="text-muted-foreground text-sm">support@finonest.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Visit Us</h4>
                  <p className="text-muted-foreground text-sm">VQ4W+W7, Jaipur, Rajasthan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-card rounded-xl md:rounded-2xl border border-border p-4 md:p-8 shadow-sm">
            <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">
              Quick Enquiry
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                <select
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                  value={formData.loanType}
                  onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
                  required
                  aria-label="Select loan type"
                >
                  <option value="">Select Loan Type</option>
                  <option value="home">Home Loan</option>
                  <option value="personal">Personal Loan</option>
                  <option value="business">Business Loan</option>
                  <option value="car">Car Loan</option>
                </select>
                <input
                  type="text"
                  placeholder="Loan Amount"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>

              {/* Consent Checkboxes */}
              <div className="space-y-2 md:space-y-3 pt-1 md:pt-2">
                <label className="flex items-start gap-2 cursor-pointer bg-primary/5 p-2 rounded-lg border">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                    checked={formData.consentTerms && formData.consentDataProcessing && formData.consentCommunication}
                    onChange={(e) => handleAgreeToAll(e.target.checked)}
                  />
                  <span className="text-xs font-medium text-primary">
                    Agree to All Terms & Consents
                  </span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                    checked={formData.consentTerms}
                    onChange={(e) => setFormData({ ...formData, consentTerms: e.target.checked })}
                    required
                  />
                  <span className="text-[10px] md:text-xs text-muted-foreground">
                    <strong className="text-destructive">*</strong> I agree to the <button type="button" onClick={() => setShowTermsDialog(true)} className="text-primary hover:underline">Terms & Conditions</button> and acknowledge that FINONEST INDIA PVT LTD is a Direct Sales Agency (DSA) and not a lender.
                  </span>
                </label>
                
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                    checked={formData.consentDataProcessing}
                    onChange={(e) => setFormData({ ...formData, consentDataProcessing: e.target.checked })}
                    required
                  />
                  <span className="text-[10px] md:text-xs text-muted-foreground">
                    <strong className="text-destructive">*</strong> I grant explicit consent to Finonest to collect, store, process, and share my Personal Information with Banks, NBFCs, and financial institutions for loan evaluation.
                  </span>
                </label>
                
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                    checked={formData.consentCommunication}
                    onChange={(e) => setFormData({ ...formData, consentCommunication: e.target.checked })}
                    required
                  />
                  <span className="text-[10px] md:text-xs text-muted-foreground">
                    <strong className="text-destructive">*</strong> I consent to receive communications from Finonest and/or Lenders via phone, SMS, email, and WhatsApp regarding my enquiry, loan products, and promotional materials, regardless of my DNCR/DND registry status.
                  </span>
                </label>
                
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                    checked={formData.consentMarketing}
                    onChange={(e) => setFormData({ ...formData, consentMarketing: e.target.checked })}
                  />
                  <span className="text-[10px] md:text-xs text-muted-foreground">
                    I would like to receive promotional offers and updates from Finonest and partner institutions.
                  </span>
                </label>
              </div>

              <Button type="submit" variant="hero" className="w-full group text-sm md:text-base">
                Submit Enquiry
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Terms Dialog */}
      <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Terms and Conditions of Service</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm max-w-none">
            <p className="text-sm text-muted-foreground mb-4">For FINONEST INDIA PVT LTD - Last Updated: December 25, 2024</p>
            
            <h3 className="font-semibold mb-2">1. Acceptance of Terms</h3>
            <p className="text-sm mb-4">By accessing or using the services provided by FINONEST INDIA PVT LTD, you agree to be bound by these Terms and Conditions.</p>
            
            <h3 className="font-semibold mb-2">2. Finonest's Role (DSA/Mediator)</h3>
            <p className="text-sm mb-2"><strong>FINONEST INDIA PVT LTD IS NOT A LENDER.</strong> We are a Direct Sales Agency facilitating loan applications between you and Banks/NBFCs.</p>
            
            <h3 className="font-semibold mb-2">3. Data Processing Consent</h3>
            <p className="text-sm mb-2">You grant explicit consent to collect, store, process, and share your Personal Information with Banks, NBFCs, and financial institutions for loan evaluation.</p>
            
            <h3 className="font-semibold mb-2">4. Communication Consent</h3>
            <p className="text-sm mb-2">You consent to receive communications via phone, SMS, email, and WhatsApp regarding loan products and promotional materials, regardless of DND registry status.</p>
            
            <div className="bg-blue-50 p-3 rounded mt-4">
              <p className="text-xs text-blue-800">
                <strong>FINONEST INDIA PVT LTD</strong><br/>
                3rd Floor, Besides Jaipur Hospital, BL Tower 1, Tonk Rd, Jaipur, Rajasthan 302018<br/>
                Email: info@finonest.com
              </p>
            </div>
            
            <div className="mt-4">
              <Button onClick={() => setShowTermsDialog(false)} className="w-full">I Understand</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Contact;