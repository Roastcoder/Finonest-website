import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions - FINONEST INDIA PVT LTD</title>
        <meta name="description" content="Terms and Conditions of Service for FINONEST INDIA PVT LTD - Direct Sales Agency for financial products" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Navbar />
      
      <div className="min-h-screen bg-background py-8 px-6 pt-24">
        <div className="container max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                Terms and Conditions of Service
              </h1>
              <p className="text-muted-foreground">
                For FINONEST INDIA PVT LTD
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Last Updated: November 25, 2025
              </p>
            </div>

            <div className="prose prose-gray max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground mb-4">
                  By accessing or using the services provided by FINONEST INDIA PVT LTD (hereinafter referred to as "Finonest," "We," "Us," or "Our"), the User (hereinafter referred to as "You" or "Customer") agrees to be bound by these Terms and Conditions ("Terms"). If You do not agree to these Terms, You may not access or use Our services. These Terms constitute a legally binding agreement between You and Finonest.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">2. Finonest's Role and Services (DSA/Mediator)</h2>
                
                <h3 className="text-lg font-medium text-foreground mb-3">2.1. Direct Sales Agency (DSA) Role:</h3>
                <p className="text-muted-foreground mb-4">
                  Finonest is a Direct Sales Agency and authorized intermediary for various Banks, Non-Banking Financial Companies (NBFCs), and other financial institutions (collectively, "Lenders").
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">2.2. Services Provided:</h3>
                <p className="text-muted-foreground mb-4">
                  Our primary service is to facilitate and mediate the application and documentation process between You and the Lenders for various financial products, including, but not limited to, loans, credit cards, and insurance.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">2.3. No Funding or Guarantee:</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>FINONEST INDIA PVT LTD IS NOT A LENDER OR A FINANCIAL INSTITUTION.</strong> We do not sanction, disburse, or guarantee any loan or financial product. The final decision regarding the acceptance, approval, terms, interest rates, and disbursement of any financial product rests solely with the respective Lender. Finonest shall not be held liable for the rejection of any application or for the specific terms offered by the Lender.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">3. User Obligations</h2>
                
                <h3 className="text-lg font-medium text-foreground mb-3">3.1. Accuracy of Information:</h3>
                <p className="text-muted-foreground mb-4">
                  You agree that all information provided by You, including personal, financial, and employment details, is true, accurate, current, and complete. You understand that any false or misleading information may lead to the rejection of Your application or legal consequences.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">3.2. Compliance with Lender Requirements:</h3>
                <p className="text-muted-foreground mb-4">
                  You agree to cooperate fully with Finonest and the Lenders, including providing all necessary documentation and completing all required formalities in a timely manner.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">3.3. Cost of Service:</h3>
                <p className="text-muted-foreground mb-4">
                  Finonest may charge a service or processing fee for the mediation services provided, which will be clearly communicated to You before the application process is finalized.
                </p>
              </section>

              <section className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Consent for Data Processing and Sharing (Mandatory Section)</h2>
                
                <h3 className="text-lg font-medium text-foreground mb-3">4.1. Explicit Consent:</h3>
                <p className="text-muted-foreground mb-4">
                  You hereby grant explicit, unconditional, and irrevocable consent to Finonest to collect, store, process, analyze, and share your Personal Information, financial data, application details, and supporting documents as required for the provision of Our mediation services.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">4.2. Data Sharing with Lenders:</h3>
                <p className="text-muted-foreground mb-4">
                  You specifically authorize Finonest to share Your complete data, including but not limited to, KYC documents, financial statements, contact details, and application data, with the Lenders for the purpose of loan/product evaluation, application processing, and fulfillment.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">4.3. Credit Information Consent:</h3>
                <p className="text-muted-foreground mb-4">
                  You explicitly consent to Finonest, its authorized representatives, and the Lenders accessing Your Credit Information Report (CIR) from Credit Information Companies (CICs) like CIBIL, Experian, Equifax, etc., to assess Your credit worthiness for the financial products You have applied for. This consent shall be valid for a period as prescribed by applicable laws and regulations.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">4.4. Third-Party Service Providers:</h3>
                <p className="text-muted-foreground mb-4">
                  You consent to Finonest sharing Your data with third-party service providers (such as technology partners, verification agencies, and collection agents) only to the extent necessary to deliver the requested services.
                </p>
              </section>

              <section className="mb-8 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h2 className="text-xl font-semibold text-foreground mb-4">5. Communication Policy and Consent (Mandatory Section)</h2>
                
                <h3 className="text-lg font-medium text-foreground mb-3">5.1. Consent to Receive Communications:</h3>
                <p className="text-muted-foreground mb-4">
                  You hereby consent to receive all forms of communication, including promotional offers, service updates, transactional messages, and reminders, from Finonest and/or the Lenders, regardless of Your registration with the National Do Not Call Register (DNCR) or Do Not Disturb (DND) registry. This includes communication via:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 ml-4">
                  <li>SMS and Text Messages</li>
                  <li>Email</li>
                  <li>Telephone Calls (including auto-dialed or pre-recorded calls)</li>
                  <li>WhatsApp or other instant messaging platforms</li>
                </ul>

                <h3 className="text-lg font-medium text-foreground mb-3">5.2. Purpose of Communication:</h3>
                <p className="text-muted-foreground mb-2">The communication may relate to:</p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 ml-4">
                  <li>The status of Your application</li>
                  <li>Information about financial products and services</li>
                  <li>Promotional and marketing materials from Finonest and its partners</li>
                  <li>Documentation or fulfillment requests</li>
                </ul>

                <h3 className="text-lg font-medium text-foreground mb-3">5.3. Opt-Out:</h3>
                <p className="text-muted-foreground mb-4">
                  You may opt-out of receiving promotional or marketing communications by contacting Finonest's customer support, however, You agree that You cannot opt-out of receiving essential transactional and service-related communications necessary for the processing of Your application.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  Finonest is only a mediator. In no event shall Finonest, its directors, employees, or agents be liable for any damages (direct, indirect, incidental, punitive, or consequential) arising out of or in connection with:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 ml-4">
                  <li>The final terms and conditions of the loan or financial product offered by the Lender</li>
                  <li>Any delay or failure in the Lender's decision-making or disbursement process</li>
                  <li>Any disputes arising between You and the Lender</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Indemnification</h2>
                <p className="text-muted-foreground mb-4">
                  You agree to indemnify, defend, and hold harmless Finonest, its affiliates, officers, directors, and employees, from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorney's fees, arising out of or in any way connected with Your access to or use of the services, or Your breach of these Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">8. Governing Law and Jurisdiction</h2>
                <p className="text-muted-foreground mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of India. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Jaipur, Rajasthan, India.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">9. Amendments</h2>
                <p className="text-muted-foreground mb-4">
                  Finonest reserves the right to modify these Terms at any time. We will notify You of any changes by updating the "Last Updated" date at the top of this document. Your continued use of the services constitutes Your acceptance of the revised Terms.
                </p>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg border">
                <h2 className="text-xl font-semibold text-foreground mb-4">Contact Information</h2>
                <div className="text-muted-foreground">
                  <p className="font-semibold text-foreground mb-2">FINONEST INDIA PVT LTD</p>
                  <p className="mb-1">3rd Floor, Besides Jaipur Hospital, BL Tower 1, Tonk Rd, Mahaveer Nagar, GopalPura Bypass, Jaipur, Rajasthan 302018</p>
                  <p className="mb-1">Email: info@finonest.com</p>
                  <p>Phone: +91 9664344725</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default TermsAndConditions;