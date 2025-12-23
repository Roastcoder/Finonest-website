import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Home, 
  ArrowRight, 
  Phone, 
  FileCheck,
  Clock,
  MessageSquare,
  Shield
} from "lucide-react";

const FormSuccess = () => {
  const [searchParams] = useSearchParams();
  const serviceType = searchParams.get("service") || "Loan Application";
  const applicantName = searchParams.get("name") || "";

  const steps = [
    {
      icon: FileCheck,
      title: "Application Received",
      description: "Your application has been submitted successfully",
      completed: true,
    },
    {
      icon: Clock,
      title: "Under Review",
      description: "Our team will review your details within 24 hours",
      completed: false,
      inProgress: true,
    },
    {
      icon: Phone,
      title: "Expert Call",
      description: "Our loan expert will contact you for verification",
      completed: false,
    },
    {
      icon: Shield,
      title: "Approval & Disbursement",
      description: "Quick sanction and fund transfer to your account",
      completed: false,
    },
  ];

  const benefits = [
    "No processing fees on your first application",
    "Compare rates from 50+ partner banks",
    "Dedicated relationship manager assigned",
    "Transparent process with no hidden charges",
    "24/7 customer support available",
  ];

  return (
    <>
      <Helmet>
        <title>Application Submitted - Finonest</title>
        <meta name="description" content="Your loan application has been submitted successfully. Our team will contact you within 24 hours." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-24 pb-16">
        <div className="container">
          {/* Success Header */}
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="relative inline-flex mb-6">
              <div className="w-24 h-24 md:w-28 md:h-28 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="w-12 h-12 md:w-14 md:h-14 text-green-600 dark:text-green-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Application Submitted!
            </h1>
            
            {applicantName && (
              <p className="text-lg text-muted-foreground mb-2">
                Thank you, <span className="font-semibold text-foreground">{applicantName}</span>!
              </p>
            )}
            
            <p className="text-muted-foreground text-lg">
              Your <span className="text-primary font-medium">{serviceType}</span> application has been received. 
              Our team will contact you within <span className="font-semibold text-foreground">24 hours</span>.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg">
              <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
                What Happens Next?
              </h2>
              
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border md:hidden" />
                <div className="hidden md:block absolute top-6 left-6 right-6 h-0.5 bg-border" />
                
                <div className="grid md:grid-cols-4 gap-4 md:gap-2">
                  {steps.map((step, index) => (
                    <div key={index} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-3">
                      {/* Step Icon */}
                      <div 
                        className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                          step.completed 
                            ? "bg-green-500 text-white" 
                            : step.inProgress 
                              ? "bg-primary text-primary-foreground animate-pulse" 
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <step.icon className="w-5 h-5" />
                        )}
                      </div>
                      
                      {/* Step Content */}
                      <div className="md:text-center">
                        <h3 className={`font-semibold text-sm mb-1 ${
                          step.completed || step.inProgress ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {step.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Checklist */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                What You Get with Finonest
              </h2>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/20"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-foreground text-sm md:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact & Actions */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-primary/5 rounded-2xl p-6 md:p-8 border border-primary/20">
              <div className="text-center mb-6">
                <MessageSquare className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Need Immediate Assistance?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Our experts are available to help you with your application
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="tel:+919462553887">
                    <Phone className="w-5 h-5 mr-2" />
                    Call: +91 94625 53887
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/">
                    <Home className="w-5 h-5 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <p className="text-muted-foreground mb-4">Explore More Services</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/services">All Services <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/emi-calculator">EMI Calculator <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/credit-score">Check Credit Score <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default FormSuccess;