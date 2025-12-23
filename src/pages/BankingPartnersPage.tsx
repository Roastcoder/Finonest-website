import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { bankingPartners } from "@/data/bankingPartners";
import { Building2, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const BankingPartnersPage = () => {
  return (
    <>
      <Helmet>
        <title>Banking Partners - Finonest | 50+ Trusted Financial Partners</title>
        <meta name="description" content="Explore Finonest's 50+ banking partners including HDFC, ICICI, Axis Bank, and more. Get the best loan deals from India's leading banks and NBFCs." />
        <meta name="keywords" content="banking partners, loan providers, HDFC, ICICI, Axis Bank, NBFCs, financial partners" />
        <link rel="canonical" href="https://finonest.com/banking-partners" />
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-background pb-20 lg:pb-0">
        {/* Hero Section */}
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          
          <div className="container relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                Trusted Network
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Our <span className="text-primary">Banking Partners</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                We've partnered with 50+ leading banks and NBFCs across India to bring you the best loan products with competitive rates and flexible terms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/apply">Apply for Loan</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Banking Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">₹1000Cr+</div>
                <div className="text-sm text-muted-foreground">Loans Disbursed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24hrs</div>
                <div className="text-sm text-muted-foreground">Quick Approval</div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Meet Our Partners
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From traditional banks to innovative NBFCs, our diverse partner network ensures you get the perfect loan solution for your needs.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {bankingPartners.map((bank, index) => (
                <div key={index} className="bg-card rounded-xl border border-border p-4 md:p-6 hover:shadow-lg transition-all group">
                  <div className="aspect-square mb-4 flex items-center justify-center bg-muted/30 rounded-lg overflow-hidden">
                    <img 
                      src={`/src/assets/${bank.logo}`}
                      alt={bank.name}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80" viewBox="0 0 120 80"><rect width="120" height="80" fill="#f8fafc" stroke="#e2e8f0"/><text x="60" y="45" text-anchor="middle" font-family="Arial" font-size="10" fill="#64748b">${bank.name}</text></svg>`)}`;
                      }}
                    />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-2 text-center">
                    {bank.name}
                  </h3>
                  <p className="text-xs text-muted-foreground text-center mb-3">
                    {bank.services}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Our Partners */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Why Our Partners Choose Us
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We maintain strong relationships with our banking partners to ensure you get the best deals and fastest approvals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Verified Customers</h3>
                <p className="text-sm text-muted-foreground">
                  All our customers go through thorough verification ensuring quality leads for our partners.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Strong Network</h3>
                <p className="text-sm text-muted-foreground">
                  Our extensive network helps banks reach customers across different segments and geographies.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Quick Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Our streamlined process ensures faster loan processing and higher conversion rates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container">
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Ready to Get Your Loan?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                With our extensive partner network, we'll find the perfect loan solution for you. 
                Compare rates, terms, and get approved quickly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/apply">Apply Now</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Speak to Expert</Link>
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

export default BankingPartnersPage;