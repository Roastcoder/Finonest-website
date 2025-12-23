import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Phone, Mail, MapPin, Clock, Shield, Lock, Eye, Database, UserCheck, Globe } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Finonest India Pvt Ltd</title>
        <meta name="description" content="Read the Privacy Policy of Finonest India Pvt Ltd. Learn how we collect, use, and protect your personal information." />
        <link rel="canonical" href="https://finonest.com/privacy" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-24 pb-20 lg:pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-card rounded-2xl border border-border shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Privacy Policy
                </h1>
                <p className="text-muted-foreground">For FINONEST INDIA PVT LTD</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-8">Last Updated: December 23, 2025</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Electronic Communications Consent
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    When you visit the Finonest website or send emails to us, you are communicating with us electronically. We may communicate with you by email, SMS, RCS, or by posting notices on the website. For contractual purposes, you consent to receive communications from us electronically, and you agree that all agreements, notices, disclosures, and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing. This condition does not affect your statutory rights.
                  </p>
                  <p>
                    You understand that once you register as a Finonest user on the Finonest platform, and upon placing any order on our website, we shall be entitled to use your registered mobile number on the website to send transaction-related SMS or RCS to you, irrespective of DND services being activated on your mobile. We may occasionally send promotional SMS or RCS to your registered mobile number.
                  </p>
                  <p className="font-semibold text-foreground">
                    The customer hereby authorizes Finonest to send transactional SMS or RCS to their registered number, even if the number is registered under the DND ("Do Not Disturb") service.
                  </p>
                </div>
              </section>
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  1. Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  FINONEST INDIA PVT LTD ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our services as a Direct Sales Agency (DSA) for various Banks, NBFCs, and financial institutions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  2. Information We Collect
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>We collect various types of information to provide and improve our services, including:</p>
                  <p>
                    <strong className="text-foreground">Personal identification information:</strong> Name, email address, phone number, etc.
                  </p>
                  <p>
                    <strong className="text-foreground">Financial information:</strong> Income details, credit history, etc.
                  </p>
                  <p>
                    <strong className="text-foreground">Usage data:</strong> How you interact with our website and services
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  3. How We Use Your Information
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>We use the collected information for various purposes, including:</p>
                  <p>
                    <strong className="text-foreground">Providing and maintaining our services</strong>
                  </p>
                  <p>
                    <strong className="text-foreground">Improving and personalizing user experience</strong>
                  </p>
                  <p>
                    <strong className="text-foreground">Processing loan applications and financial assessments</strong>
                  </p>
                  <p>
                    <strong className="text-foreground">Communicating with you about our services and updates</strong>
                  </p>
                  <p className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-blue-800">
                    For more detailed information about our privacy practices, please contact our customer support team.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-primary" />
                  4. Information Sharing and Disclosure
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">4.1. Partner Lenders:</strong> We share your information with Banks, NBFCs, and financial institutions for loan evaluation and processing.
                  </p>
                  <p>
                    <strong className="text-foreground">4.2. Credit Information Companies:</strong> We access your credit reports from authorized CICs with your explicit consent.
                  </p>
                  <p>
                    <strong className="text-foreground">4.3. Service Providers:</strong> We may share information with third-party service providers who assist in our operations.
                  </p>
                  <p>
                    <strong className="text-foreground">4.4. Legal Requirements:</strong> We may disclose information when required by law or to protect our rights and safety.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  5. Cookies and Tracking Technologies
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">5.1. Essential Cookies:</strong> Required for basic website functionality and security.
                  </p>
                  <p>
                    <strong className="text-foreground">5.2. Analytics Cookies:</strong> Help us understand how visitors interact with our website to improve user experience.
                  </p>
                  <p>
                    <strong className="text-foreground">5.3. Marketing Cookies:</strong> Used to deliver relevant advertisements and track campaign effectiveness.
                  </p>
                  <p className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-blue-800">
                    <strong>Cookie Consent:</strong> By using our website, you consent to the use of cookies as described. You can manage cookie preferences through your browser settings.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">8. Your Rights</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">8.1. Access:</strong> You have the right to access the personal information we hold about you.
                  </p>
                  <p>
                    <strong className="text-foreground">8.2. Correction:</strong> You may request correction of inaccurate or incomplete information.
                  </p>
                  <p>
                    <strong className="text-foreground">8.3. Deletion:</strong> You may request deletion of your personal information, subject to legal requirements.
                  </p>
                  <p>
                    <strong className="text-foreground">8.4. Opt-out:</strong> You may opt-out of marketing communications at any time.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">9. Third-Party Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">10. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on our website with an updated effective date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">11. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This Privacy Policy shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Jaipur, Rajasthan, India.
                </p>
              </section>

              {/* Company Info */}
              <section className="mt-12 pt-8 border-t border-border">
                <h2 className="text-xl font-semibold text-foreground mb-6">Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
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

export default PrivacyPolicy;
