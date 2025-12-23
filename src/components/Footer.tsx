import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Youtube, ArrowUp, MapPin } from "lucide-react";
import logoImg from "@/assets/logo.png";
import ContactWidget from "@/components/ContactWidget";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <img src={logoImg} alt="Finonest" className="h-12 w-auto object-contain brightness-0 invert" />
            <p className="text-sm text-background/70 leading-relaxed">
              Finonest is your trusted partner for all financial needs. We simplify the loan process with transparency, speed, and personalized solutions.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/80">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>VQ4W+W7, Jaipur, Rajasthan</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-background/70 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-background/70 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-background/70 hover:text-accent transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/apply" className="text-sm text-background/70 hover:text-accent transition-colors">
                  Apply Now
                </Link>
              </li>
              <li>
                <Link to="/banking-partners" className="text-sm text-background/70 hover:text-accent transition-colors">
                  Banking Partners
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-background/70 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services/home-loan" className="text-sm text-background/70 hover:text-accent transition-colors">
                  Home Loan
                </Link>
              </li>
              <li>
                <Link to="/services/personal-loan" className="text-sm text-background/70 hover:text-accent transition-colors">
                  Personal Loan
                </Link>
              </li>
              <li>
                <Link to="/services/business-loan" className="text-sm text-background/70 hover:text-accent transition-colors">
                  Business Loan
                </Link>
              </li>
              <li>
                <Link to="/services/car-loan" className="text-sm text-background/70 hover:text-accent transition-colors">
                  Car Loan
                </Link>
              </li>
              <li>
                <Link to="/services/credit-cards" className="text-sm text-background/70 hover:text-accent transition-colors">
                  Credit Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Contact Us</h4>
            <ContactWidget variant="vertical" className="mb-6" />
            <div className="flex items-center gap-2 text-sm text-background/80 mb-6">
              <span>info@finonest.com</span>
            </div>
            <div>
              <h5 className="text-sm font-medium mb-4">Follow Us</h5>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Finonest. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-sm text-background/60 hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="text-sm text-background/60 hover:text-accent transition-colors">
              Terms & Conditions
            </Link>
          </div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/90 transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;