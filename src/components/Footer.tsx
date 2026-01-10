import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Youtube, ArrowUp, MapPin, Star } from "lucide-react";
import logoImg from "@/assets/logo.png";
import ContactWidget from "@/components/ContactWidget";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const openDirections = () => {
    const address = "3rd Floor, Besides Jaipur Hospital, BL Tower 1, Tonk Rd, Mahaveer Nagar, Jaipur, Rajasthan 302018";
    const coords = "26.857419278517135,75.79565395415636";
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}&destination_place_id=${coords}`;
    window.open(url, '_blank');
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
            <div className="flex items-start gap-2 text-sm text-background/80 cursor-pointer hover:text-accent transition-colors" onClick={openDirections}>
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>3rd Floor, Besides Jaipur Hospital, BL Tower 1, Tonk Rd, Mahaveer Nagar, Jaipur, Rajasthan 302018</span>
            </div>
            <div className="mt-4 relative cursor-pointer" onClick={openDirections}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.0!2d75.79572905600946!3d26.857562851737594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUxJzI3LjIiTiA3NcKwNDcnNDQuNiJF!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin"
                width="100%"
                height="150"
                style={{ border: 0, borderRadius: '8px', pointerEvents: 'none' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-transparent" />
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
            <div className="mt-4">
              <a 
                href="https://search.google.com/local/writereview?placeid=ChIJI1TNZRqzbTkRo9RLFM5zasw" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
              >
                <Star className="w-4 h-4" />
                Leave a Review on Google
              </a>
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