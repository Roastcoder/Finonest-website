import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - Finonest India Pvt Ltd</title>
        <meta name="description" content="Read the Terms and Conditions of Service for Finonest India Pvt Ltd. Understand our role as DSA, user obligations, and data processing policies." />
        <link rel="canonical" href="https://finonest.com/terms" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-24 pb-20 lg:pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-card rounded-2xl border border-border shadow-lg p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Terms and Conditions of Service
            </h1>
            <p className="text-muted-foreground mb-2">For FINONEST INDIA PVT LTD</p>
            <p className="text-sm text-muted-foreground mb-8">Last Updated: November 25, 2025</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using the services provided by FINONEST INDIA PVT LTD, you agree to be bound by these Terms and Conditions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">2. Finonest's Role and Services (DSA/Mediator)</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">2.1. Direct Sales Agency (DSA) Role:</strong> Finonest is a Direct Sales Agency and authorized intermediary for various Banks, NBFCs, and other financial institutions.
                  </p>
                  <p>
                    <strong className="text-foreground">2.2. Services Provided:</strong> Our primary service is to facilitate and mediate the application and documentation process between You and the Lenders.
                  </p>
                  <p className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-amber-800">
                    <strong>2.3. No Funding or Guarantee:</strong> FINONEST INDIA PVT LTD IS NOT A LENDER OR A FINANCIAL INSTITUTION. We do not sanction, disburse, or guarantee any loan or financial product.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">3. User Obligations</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">3.1. Accuracy of Information:</strong> You agree that all information provided is true, accurate, current, and complete.
                  </p>
                  <p>
                    <strong className="text-foreground">3.2. Compliance with Lender Requirements:</strong> You agree to cooperate fully with Finonest and the Lenders.
                  </p>
                  <p>
                    <strong className="text-foreground">3.3. Cost of Service:</strong> Finonest may charge a service or processing fee for the mediation services provided.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Consent for Data Processing and Sharing</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">4.1. Explicit Consent:</strong> You grant explicit, unconditional, and irrevocable consent to Finonest to collect, store, process, analyze, and share your Personal Information.
                  </p>
                  <p>
                    <strong className="text-foreground">4.2. Data Sharing with Lenders:</strong> You authorize Finonest to share Your complete data with the Lenders for loan/product evaluation.
                  </p>
                  <p>
                    <strong className="text-foreground">4.3. Credit Information Consent:</strong> You consent to Finonest accessing Your Credit Information Report from CICs like CIBIL, Experian, Equifax, etc.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">5. Communication Policy and Consent</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">5.1. Consent to Receive Communications:</strong> You consent to receive all forms of communication from Finonest and/or the Lenders, regardless of Your DNCR or DND registry status.
                  </p>
                  <p>
                    <strong className="text-foreground">5.2. Purpose of Communication:</strong> Communication may relate to application status, financial products information, promotional materials, and documentation requests.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Finonest is only a mediator. We shall not be liable for any damages arising from the Lender's terms, delays, or disputes between You and the Lender.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Governing Law and Jurisdiction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by the laws of India. Any dispute shall be subject to the exclusive jurisdiction of courts in Jaipur, Rajasthan, India.
                </p>
              </section>

              {/* Company Info */}
              <section className="mt-12 pt-8 border-t border-border">
                <h2 className="text-xl font-semibold text-foreground mb-6">FINONEST INDIA PVT LTD</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div className="text-muted-foreground text-sm">
                      3rd Floor, Besides Jaipur Hospital, BL Tower 1, Tonk Rd, Mahaveer Nagar, GopalPura Bypass, Jaipur, Rajasthan 302018
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground text-sm">+91 9664344725</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground text-sm">info@finonest.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground text-sm">Mon - Fri: 9:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
      <BottomNavigation />
    </>
  );
};

export default TermsAndConditions;
