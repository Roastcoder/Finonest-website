import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Youtube, ArrowUp, Star } from "lucide-react";
import logoImg from "@/assets/logo.png";
import ContactWidget from "@/components/ContactWidget";
import { publicCMSAPI } from "@/lib/api";

interface FooterLink {
  label: string;
  href: string;
  target?: '_self' | '_blank';
}

interface FooterData {
  quickLinks?: FooterLink[];
  legalLinks?: FooterLink[];
  contactInfo?: { phone?: string; email?: string; address?: string };
  socialLinks?: { facebook?: string; twitter?: string; linkedin?: string; instagram?: string; youtube?: string };
  copyrightText?: string;
}

const Footer = () => {
  const [footer, setFooter] = useState<FooterData | null>(null);

  useEffect(() => {
    const loadFooter = async () => {
      try {
        const res = await publicCMSAPI.getFooter();
        if (res.status === 'ok') {
          setFooter(res.data || null);
        }
      } catch (error) {
        console.error('Failed to load footer:', error);
      }
    };
    loadFooter();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <img src={logoImg} alt="Finonest" className="h-12 w-auto object-contain brightness-0 invert" />
            {footer?.contactInfo?.address && (
              <p className="text-sm text-background/70 leading-relaxed">
                {footer.contactInfo.address}
              </p>
            )}
            <div className="flex items-start gap-2 text-sm text-background/80">
              {footer?.contactInfo?.email && <span>{footer.contactInfo.email}</span>}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {(footer?.quickLinks || []).map((link, idx) => (
                <li key={idx}>
                  {link.href.startsWith('http') ? (
                    <a href={link.href} target={link.target || '_blank'} rel="noopener noreferrer" className="text-sm text-background/70 hover:text-accent transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href} className="text-sm text-background/70 hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              {(footer?.legalLinks || []).map((link, idx) => (
                <li key={idx}>
                  {link.href.startsWith('http') ? (
                    <a href={link.href} target={link.target || '_blank'} rel="noopener noreferrer" className="text-sm text-background/70 hover:text-accent transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href} className="text-sm text-background/70 hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Contact Us</h4>
            <ContactWidget variant="vertical" className="mb-6" />
            {footer?.contactInfo?.phone && (
              <div className="flex items-center gap-2 text-sm text-background/80 mb-6">
                <span>{footer.contactInfo.phone}</span>
              </div>
            )}
            <div>
              <h5 className="text-sm font-medium mb-4">Follow Us</h5>
              <div className="flex gap-3">
                {footer?.socialLinks?.facebook && (
                  <a href={footer.socialLinks.facebook} className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {footer?.socialLinks?.twitter && (
                  <a href={footer.socialLinks.twitter} className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {footer?.socialLinks?.linkedin && (
                  <a href={footer.socialLinks.linkedin} className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {footer?.socialLinks?.youtube && (
                  <a href={footer.socialLinks.youtube} className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
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
            {footer?.copyrightText || `© ${new Date().getFullYear()} Finonest. All rights reserved.`}
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