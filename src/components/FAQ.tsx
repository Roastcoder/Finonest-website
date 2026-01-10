import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, FileQuestion, Percent, Clock, FileText, Shield } from "lucide-react";

const faqCategories = [
  {
    icon: FileQuestion,
    title: "Eligibility",
    faqs: [
      {
        question: "What are the basic eligibility criteria for a loan?",
        answer: "The basic eligibility criteria include: Age between 21-65 years, Indian citizenship or resident, stable income source (salaried or self-employed), minimum monthly income of ₹15,000, and a good credit score (650+). Specific requirements may vary based on the loan type."
      },
      {
        question: "Can I apply for a loan if I have a low credit score?",
        answer: "Yes, we work with multiple lending partners including NBFCs that offer loans to individuals with lower credit scores. While interest rates may be slightly higher, we help you find the best possible option. We also provide credit improvement guidance."
      },
      {
        question: "Is there an age limit for applying for a home loan?",
        answer: "For home loans, the minimum age is 21 years and the loan tenure should end before you turn 70 years. Some banks may extend this to 75 years for certain profiles. Self-employed professionals may have different age criteria."
      },
    ]
  },
  {
    icon: FileText,
    title: "Documents",
    faqs: [
      {
        question: "What documents are required for a personal loan?",
        answer: "For salaried individuals: PAN card, Aadhaar card, last 3 months salary slips, 6 months bank statements, and address proof. For self-employed: Additionally ITR for last 2 years, business registration documents, and business bank statements."
      },
      {
        question: "Do I need to visit your office to submit documents?",
        answer: "No! We offer 100% digital document submission. You can upload documents through our secure portal. Alternatively, we provide free doorstep document collection service in all major cities across India."
      },
      {
        question: "What if I don't have all the required documents?",
        answer: "Our loan experts will review your profile and suggest alternative documents that may be acceptable. We work closely with you to find solutions and ensure a smooth application process."
      },
    ]
  },
  {
    icon: Percent,
    title: "Interest Rates",
    faqs: [
      {
        question: "What are the current interest rates for different loans?",
        answer: "Our current rates: Home Loan starting 8.5% p.a., Car Loan from 9.0% p.a., Personal Loan from 10.5% p.a., Business Loan from 11% p.a., and Loan Against Property from 9.5% p.a. Rates vary based on your profile and credit score."
      },
      {
        question: "Is the interest rate fixed or floating?",
        answer: "We offer both fixed and floating rate options. Fixed rates remain constant throughout the tenure, while floating rates change with market conditions. Our advisors help you choose the best option based on your financial goals."
      },
      {
        question: "Are there any hidden charges or processing fees?",
        answer: "We believe in 100% transparency. Processing fees typically range from 0.5% to 2% of the loan amount. All charges including documentation fees, prepayment charges, and late payment fees are disclosed upfront before you sign."
      },
    ]
  },
  {
    icon: Clock,
    title: "Process & Timeline",
    faqs: [
      {
        question: "How long does the loan approval process take?",
        answer: "Personal and car loans are typically approved within 24-48 hours. Home loans may take 5-7 working days due to property verification. Business loans usually take 3-5 working days. Express processing is available for urgent requirements."
      },
      {
        question: "Can I prepay my loan without any penalty?",
        answer: "Most of our partner banks offer zero prepayment charges on floating rate loans. For fixed rate loans, prepayment charges may apply (usually 2-4% of outstanding amount). We recommend floating rate loans for flexibility."
      },
      {
        question: "How do I track my loan application status?",
        answer: "Once you apply, you receive a unique application ID. You can track your status through our website, mobile app, or by contacting your dedicated relationship manager. We also send SMS and email updates at every stage."
      },
    ]
  },
];

const FAQ = () => {
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
