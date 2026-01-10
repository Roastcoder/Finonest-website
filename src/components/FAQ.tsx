import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, FileQuestion, Percent, Clock, FileText, Shield, Loader2 } from "lucide-react";
import { publicCMSAPI } from "@/lib/api";

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

interface FAQCategory {
  title: string;
  icon: any;
  faqs: FAQItem[];
}

// Icon mapping for categories
const categoryIcons: Record<string, any> = {
  'eligibility': FileQuestion,
  'documents': FileText,
  'interest-rates': Percent,
  'process': Clock,
  'process-timeline': Clock,
  'timeline': Clock,
};

const FAQ = () => {
  const [faqCategories, setFaqCategories] = useState<FAQCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        setLoading(true);
        const res = await publicCMSAPI.listFAQs();
        if (res.status === 'ok' && res.data) {
          // Group FAQs by category
          const grouped: Record<string, FAQItem[]> = {};
          (res.data as FAQItem[]).forEach(faq => {
            const category = faq.category || 'general';
            if (!grouped[category]) {
              grouped[category] = [];
            }
            grouped[category].push(faq);
          });

          // Convert to category array with icons
          const categories: FAQCategory[] = Object.entries(grouped).map(([category, faqs]) => {
            // Sort by order if available
            faqs.sort((a, b) => (a.order || 0) - (b.order || 0));
            
            // Format category title (capitalize, replace hyphens)
            const title = category
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            return {
              title,
              icon: categoryIcons[category.toLowerCase()] || HelpCircle,
              faqs,
            };
          });

          // Sort categories by first FAQ order or alphabetically
          categories.sort((a, b) => {
            const aOrder = a.faqs[0]?.order || 999;
            const bOrder = b.faqs[0]?.order || 999;
            return aOrder - bOrder;
          });

          setFaqCategories(categories);
        }
      } catch (error) {
        console.error('Failed to load FAQs:', error);
        // On error, show empty state or fallback message
        setFaqCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadFAQs();
  }, []);
  return (
    <section id="faq" className="py-10 md:py-24 relative overflow-hidden bg-gradient-section-alt">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-16">
          <span className="inline-flex items-center gap-1 md:gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-2 md:mb-4">
            <HelpCircle className="w-3 h-3 md:w-4 md:h-4" />
            FAQ
          </span>
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-6">
            Frequently Asked{" "}
            <span className="text-gradient-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg hidden md:block">
            Find answers to common questions about our loan products and services
          </p>
        </div>

        {/* FAQ Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : faqCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No FAQs available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
            <div key={category.title} className="glass rounded-xl md:rounded-3xl p-4 md:p-8">
              {/* Category Header */}
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="font-display text-base md:text-xl font-bold text-foreground">
                  {category.title}
                </h3>
              </div>

              {/* Accordion */}
              <Accordion type="single" collapsible className="space-y-2 md:space-y-3">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${categoryIndex}-${faqIndex}`}
                    className="border-none"
                  >
                    <AccordionTrigger className="text-left text-xs md:text-sm font-medium text-foreground hover:text-primary py-2 md:py-4 px-3 md:px-4 rounded-lg md:rounded-xl bg-secondary/50 hover:bg-secondary transition-colors [&[data-state=open]]:rounded-b-none [&[data-state=open]]:bg-secondary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs md:text-sm text-muted-foreground leading-relaxed px-3 md:px-4 pb-3 md:pb-4 pt-2 bg-secondary/30 rounded-b-lg md:rounded-b-xl">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            ))}
          </div>
        )}

        {/* Still have questions CTA */}
        <div className="text-center mt-6 md:mt-16 hidden md:block">
          <div className="inline-flex items-center gap-4 glass rounded-2xl px-8 py-4">
            <Shield className="w-6 h-6 text-primary" />
            <div className="text-left">
              <p className="font-medium text-foreground">Still have questions?</p>
              <p className="text-sm text-muted-foreground">Our experts are here to help 24/7</p>
            </div>
            <a 
              href="#contact" 
              className="ml-4 px-6 py-2 rounded-xl bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
