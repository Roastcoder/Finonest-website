import { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  CheckCircle,
  Building,
  ArrowLeft,
  Headphones,
  FileText,
  HelpCircle,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import mascotAdvisor from "@/assets/mascot-advisor.png";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const { toast } = useToast();
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [consent, setConsent] = useState({
    terms: false,
    dataProcessing: false,
    communication: false,
    marketing: false
  });

  const handleAgreeToAll = (checked: boolean) => {
    setConsent({
      terms: checked,
      dataProcessing: checked,
      communication: checked,
      marketing: consent.marketing
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent.terms || !consent.dataProcessing || !consent.communication) {
      toast({
        title: "Consent Required",
        description: "Please accept all required consents to proceed.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setConsent({ terms: false, dataProcessing: false, communication: false, marketing: false });
    setShowMobileForm(false);
    setSelectedOption("");
  };

  const contactOptions = [
    {
      icon: Headphones,
      title: "General Enquiry",
      description: "Ask us anything about our services",
      color: "bg-blue-500/10 text-blue-600",
      borderColor: "hover:border-blue-500/50",
    },
    {
      icon: FileText,
      title: "Loan Application",
      description: "Get help with your loan application",
      color: "bg-green-500/10 text-green-600",
      borderColor: "hover:border-green-500/50",
    },
    {
      icon: HelpCircle,
      title: "Support",
      description: "Technical or account related issues",
      color: "bg-orange-500/10 text-orange-600",
      borderColor: "hover:border-orange-500/50",
    },
    {
      icon: MessageSquare,
      title: "Feedback",
      description: "Share your experience with us",
      color: "bg-purple-500/10 text-purple-600",
      borderColor: "hover:border-purple-500/50",
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 9462553887"],
      action: "tel:+919462553887",
      actionText: "Call Now",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@finonest.com"],
      action: "mailto:info@finonest.com",
      actionText: "Send Email",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["3rd Floor, Besides Jaipur Hospital,", "BL Tower 1, Tonk Rd, Mahaveer Nagar,", "GopalPura Bypass, Jaipur, Rajasthan 302018"],
      action: "https://maps.google.com/?q=26.8648,75.7867",
      actionText: "Get Directions",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
      action: null,
      actionText: null,
    },
  ];

  const offices = [
    { city: "Jaipur (Head Office)", address: "3rd Floor, Besides Jaipur Hospital, BL Tower 1, Tonk Rd, Mahaveer Nagar, GopalPura Bypass, Jaipur, Rajasthan 302018", phone: "+91 9462553887" },
  ];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setFormData({ ...formData, subject: option });
    setShowMobileForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Finonest | Get Expert Loan Assistance</title>
        <meta name="description" content="Contact Finonest for all your loan queries. Call +91 9462553887 or email info@finonest.com. Visit our office in Jaipur, Rajasthan." />
        <meta name="keywords" content="contact Finonest, loan enquiry, financial assistance, loan helpline Jaipur" />
        <link rel="canonical" href="https://finonest.com/contact" />
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-background pb-20 lg:pb-0">
        {/* Hero Section */}
        <section className="relative pt-24 pb-8 md:pt-32 md:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          
          <div className="container relative z-10">
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 lg:mb-6">
                Get In Touch
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 lg:mb-6">
                <span className="lg:hidden">How Can We <span className="text-primary">Help?</span></span>
                <span className="hidden lg:inline">We're Here To <span className="text-primary">Help You</span></span>
              </h1>
              <p className="text-muted-foreground text-sm lg:text-lg mb-4 lg:mb-8">
                <span className="lg:hidden">Choose an option below</span>
                <span className="hidden lg:inline">Have questions about loans? Need expert advice? Our team is ready to assist you with personalized solutions for all your financial needs.</span>
              </p>
            </div>
          </div>
        </section>

        {/* MOBILE: 2x2 Card Grid OR Form */}
        <div className="lg:hidden">
          {!showMobileForm ? (
            <>
              {/* 2x2 Contact Options Grid */}
              <section className="py-4 px-4">
                <div className="grid grid-cols-2 gap-3">
                  {contactOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(option.title)}
                      className={`bg-card p-4 rounded-xl border border-border ${option.borderColor} hover:shadow-lg transition-all duration-300 text-left group`}
                    >
                      <div className={`w-10 h-10 ${option.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <option.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">{option.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{option.description}</p>
                      <div className="flex items-center text-primary text-xs font-medium">
                        Get Started
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Quick Contact */}
              <section className="py-4 px-4">
                <h2 className="text-sm font-semibold text-foreground text-center mb-4">Or Contact Directly</h2>
                <div className="grid grid-cols-3 gap-2">
                  <a href="tel:+919462553887" className="bg-card p-3 rounded-xl border border-border text-center">
                    <Phone className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-xs font-medium text-foreground">Call</p>
                  </a>
                  <a href="mailto:info@finonest.com" className="bg-card p-3 rounded-xl border border-border text-center">
                    <Mail className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-xs font-medium text-foreground">Email</p>
                  </a>
                  <a href="https://maps.google.com/?q=26.8648,75.7867" target="_blank" rel="noopener noreferrer" className="bg-card p-3 rounded-xl border border-border text-center">
                    <MapPin className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-xs font-medium text-foreground">Visit</p>
                  </a>
                </div>
              </section>

              {/* Office Info */}
              <section className="py-4 px-4">
                <div className="bg-card p-4 rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Building className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Our Office</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    3rd Floor, Besides Jaipur Hospital, BL Tower 1, Tonk Rd, Jaipur, Rajasthan 302018
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Hours:</span> Mon-Fri 9AM-6PM, Sat 9AM-2PM
                  </p>
                </div>
              </section>
            </>
          ) : (
            /* Mobile Form */
            <section className="py-4 px-4">
              {/* Back Button */}
              <button
                onClick={() => {
                  setShowMobileForm(false);
                  setSelectedOption("");
                }}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <div className="bg-card p-5 rounded-xl border border-border shadow-lg animate-fade-in">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12">
                    <img src={mascotAdvisor} alt="Finonest Advisor" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h2 className="text-lg font-display font-bold text-foreground">{selectedOption}</h2>
                    <p className="text-muted-foreground text-xs">We'll respond within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Message</label>
                    <Textarea
                      placeholder="Tell us more..."
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="resize-none"
                    />
                  </div>

                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer bg-primary/5 p-2 rounded-lg border">
                        <input
                          type="checkbox"
                          checked={consent.terms && consent.dataProcessing && consent.communication}
                          onChange={(e) => handleAgreeToAll(e.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-xs font-medium text-primary">
                          Agree to All Required Terms & Consents
                        </span>
                      </label>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consent.terms}
                          onChange={(e) => setConsent({...consent, terms: e.target.checked})}
                          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                          required
                        />
                        <span className="text-xs text-muted-foreground">
                          <strong className="text-destructive">*</strong> I agree to the <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link> and acknowledge that FINONEST INDIA PVT LTD is a Direct Sales Agency (DSA) and not a lender.
                        </span>
                      </label>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consent.dataProcessing}
                          onChange={(e) => setConsent({...consent, dataProcessing: e.target.checked})}
                          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                          required
                        />
                        <span className="text-xs text-muted-foreground">
                          <strong className="text-destructive">*</strong> I grant explicit consent to Finonest to collect, store, process, and share my Personal Information with Banks, NBFCs, and financial institutions for loan evaluation.
                        </span>
                      </label>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consent.communication}
                          onChange={(e) => setConsent({...consent, communication: e.target.checked})}
                          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                          required
                        />
                        <span className="text-xs text-muted-foreground">
                          <strong className="text-destructive">*</strong> I consent to receive communications from Finonest and/or Lenders via phone, SMS, email, and WhatsApp regarding my enquiry, loan products, and promotional materials, regardless of my DNCR/DND registry status.
                        </span>
                      </label>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consent.marketing}
                          onChange={(e) => setConsent({...consent, marketing: e.target.checked})}
                          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-xs text-muted-foreground">
                          I would like to receive promotional offers and updates from Finonest and partner institutions.
                        </span>
                      </label>
                    </div>

                  <Button type="submit" className="w-full h-11" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </section>
          )}
        </div>

        {/* DESKTOP: Original Full Layout */}
        <div className="hidden lg:block">
          {/* Contact Info Cards */}
          <section className="py-12 -mt-8">
            <div className="container">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all group"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <info.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground text-sm">{detail}</p>
                    ))}
                    {info.action && (
                      <a 
                        href={info.action}
                        className="inline-flex items-center gap-2 text-primary text-sm font-medium mt-4 hover:underline"
                      >
                        {info.actionText}
                        <Send className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form & Map */}
          <section className="py-16">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16">
                      <img src={mascotAdvisor} alt="Finonest Advisor" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-bold text-foreground">Send Us a Message</h2>
                      <p className="text-muted-foreground text-sm">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                        <Input
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                        <Input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-background"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                      <Input
                        type="text"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="bg-background"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                      <Textarea
                        placeholder="Tell us more about your requirements..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="bg-background resize-none"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer bg-primary/5 p-3 rounded-lg border">
                        <input
                          type="checkbox"
                          checked={consent.terms && consent.dataProcessing && consent.communication}
                          onChange={(e) => handleAgreeToAll(e.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm font-medium text-primary">
                          Agree to All Required Terms & Consents
                        </span>
                      </label>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consent.terms}
                          onChange={(e) => setConsent({...consent, terms: e.target.checked})}
                          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                          required
                        />
                        <span className="text-sm text-muted-foreground">
                          <strong className="text-destructive">*</strong> I agree to the <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link> and acknowledge that FINONEST INDIA PVT LTD is a Direct Sales Agency (DSA) and not a lender.
                        </span>
                      </label>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consent.dataProcessing}
                          onChange={(e) => setConsent({...consent, dataProcessing: e.target.checked})}
                          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                          required
                        />
                        <span className="text-sm text-muted-foreground">
                          <strong className="text-destructive">*</strong> I grant explicit consent to Finonest to collect, store, process, and share my Personal Information with Banks, NBFCs, and financial institutions for loan evaluation.
                        </span>
                      </label>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consent.communication}
                          onChange={(e) => setConsent({...consent, communication: e.target.checked})}
                          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                          required
                        />
                        <span className="text-sm text-muted-foreground">
                          <strong className="text-destructive">*</strong> I consent to receive communications from Finonest and/or Lenders via phone, SMS, email, and WhatsApp regarding my enquiry, loan products, and promotional materials, regardless of my DNCR/DND registry status.
                        </span>
                      </label>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consent.marketing}
                          onChange={(e) => setConsent({...consent, marketing: e.target.checked})}
                          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-muted-foreground">
                          I would like to receive promotional offers and updates from Finonest and partner institutions.
                        </span>
                      </label>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                        <p className="text-xs text-blue-800">
                          <strong>FINONEST INDIA PVT LTD</strong><br/>
                          3rd Floor, Besides Jaipur Hospital, BL Tower 1, Tonk Rd, Mahaveer Nagar, GopalPura Bypass, Jaipur, Rajasthan 302018<br/>
                          Email: info@finonest.com
                        </p>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>

                {/* Map & Info */}
                <div className="space-y-6">
                  {/* Map - Jaipur Location */}
                  <div className="bg-muted rounded-2xl overflow-hidden h-[300px] relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.0!2d75.7856!3d26.8748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db40a33741d19%3A0x2ed935890dbf63c3!2sBL%20Tower!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Finonest Jaipur Office Location"
                    />
                  </div>

                  {/* Our Offices */}
                  <div className="bg-card p-6 rounded-2xl border border-border">
                    <h3 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                      <Building className="w-5 h-5 text-primary" />
                      Our Offices
                    </h3>
                    
                    <div className="space-y-4">
                      {offices.map((office, index) => (
                        <div key={index} className="p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-semibold text-foreground mb-1">{office.city}</h4>
                          <p className="text-muted-foreground text-sm mb-2">{office.address}</p>
                          <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-primary text-sm hover:underline">
                            {office.phone}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Response */}
                  <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-8 h-8 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Quick Response Guaranteed</h3>
                        <p className="text-muted-foreground text-sm">
                          Our team responds to all queries within 2 hours during business hours. 
                          For urgent loan assistance, call us directly or chat on WhatsApp.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ CTA */}
          <section className="py-16 bg-muted/30">
            <div className="container">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                  Have More Questions?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Check out our FAQ section for answers to commonly asked questions about 
                  loans, eligibility, and our services.
                </p>
                <Button variant="outline" size="lg" asChild>
                  <a href="/#faq">View FAQs</a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
      <BottomNavigation />
    </>
  );
};

export default ContactPage;
