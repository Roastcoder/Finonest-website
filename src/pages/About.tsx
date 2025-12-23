import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Target, Eye, Heart, Users, Award, TrendingUp, CheckCircle, Lightbulb, Shield, Star, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import aboutTeam from "@/assets/about-team.jpg";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We uphold the highest standards of ethics and transparency.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Constantly improving our product and customer experience.",
    },
    {
      icon: Heart,
      title: "Customer-Centric",
      description: "Customers' needs are at the heart of everything we do.",
    },
    {
      icon: Star,
      title: "Excellence",
      description: "Delivering high-quality service and measurable results.",
    },
  ];

  const milestones = [
    { year: "2017", title: "Foundation", description: "Finonest was founded to democratize access to finance." },
    { year: "2019", title: "Expansion", description: "Launched additional loan products across Rajasthan." },
    { year: "2021", title: "Growth", description: "Achieved top 3 position in used car loans in Rajasthan." },
    { year: "2023", title: "Milestone", description: "60.77% YoY growth and ₹10 Cr turnover projection." },
    { year: "2024", title: "Future Plans", description: "Expansion planned to Gujarat and Madhya Pradesh." },
  ];

  const coreBusinessAreas = [
    { abbr: "PL", title: "Personal Loans", description: "Quick and hassle-free financing designed to support personal goals with minimal documentation." },
    { abbr: "BL", title: "Business Loans", description: "Customized credit solutions that help businesses expand operations and manage growth confidently." },
    { abbr: "UCL", title: "Unsecured Credit Lines", description: "Flexible revolving credit with instant access to funds—no collateral required." },
    { abbr: "ML", title: "Mortgage Loans", description: "Affordable mortgage plans offering long-term stability backed by transparent processing." },
    { abbr: "HL", title: "Home Loans", description: "Convenient home financing options that make your dream property more accessible than ever." },
    { abbr: "WC", title: "Working Capital Loans", description: "Reliable short-term funding to maintain smooth cash flow and meet operational expenses." },
  ];

  const promoters = [
    {
      name: "Surya Mohan Roy",
      role: "Managing Director and Founder",
      description: "Surya Mohan Roy is the Managing Director & Founder, the visionary leader behind the company's purpose, culture, and long-term strategy. With strong entrepreneurial insight and a commitment to innovation, he established the organization with the goal of delivering excellence, trust, and value in every service. As the Founder, he built the company on core principles of integrity, quality, and customer-centricity. His ability to identify opportunities, adapt to market trends, and lead with clarity has shaped the company's identity and positioned it for sustainable growth. In his role as Managing Director, he oversees strategic planning, business development, and operational execution across all departments.",
      initials: "SMR",
    },
    {
      name: "Sanam Makkar",
      role: "Director & Chief Technology Officer (CTO)",
      description: "Sanam Makkar serves as the Director & Chief Technology Officer (CTO), leading the company's technology vision, product innovation, and digital transformation initiatives. With a strong blend of technical expertise and strategic leadership, he ensures the organization stays ahead in a rapidly evolving technological landscape. He oversees all core technology functions including product development, system architecture, cybersecurity, cloud infrastructure, and IT operations. His forward-thinking approach drives the adoption of modern technologies that improve efficiency, enhance user experience, and support scalable business growth.",
      initials: "SM",
    },
    {
      name: "CA Prateek Somani",
      role: "Chief Financial Officer",
      description: "As the Chief Financial Officer, Prateek Somani leads the company's financial strategy with precision and vision. He oversees budgeting, financial planning, compliance, and risk management, ensuring the organization operates with transparency and long-term stability. He plays a key role in guiding strategic decisions, optimizing resources, and strengthening the company's financial foundation. His analytical approach and commitment to excellence drive sustainable growth and support the organization's mission at every level.",
      initials: "PS",
    },
    {
      name: "Atishay Jain",
      role: "Co-Founder and Director",
      description: "As the Co-Founder & Director, he plays a pivotal role in shaping the organization's vision, culture, and long-term strategy. With a deep understanding of the industry and a strong entrepreneurial mindset, he oversees key operations, drives innovation, and ensures seamless execution across teams. His leadership focuses on building sustainable growth, nurturing strategic partnerships, and guiding the company toward new opportunities. His commitment to excellence and forward-thinking approach continue to strengthen the foundation and future of the organization.",
      initials: "AJ",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Finonest India Pvt. Ltd. | Your Trusted Loan Partner Since 2017</title>
        <meta name="description" content="Learn about Finonest India Pvt. Ltd. - one of the top 3 used car loan providers in Rajasthan with 18+ branches, 50K+ happy customers, and 7+ years of experience." />
        <meta name="keywords" content="Finonest about, loan company Rajasthan, used car loan, financial services, trusted loan partner" />
        <link rel="canonical" href="https://finonest.com/about" />
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-background pb-16 lg:pb-0">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                  Transforming Financial Services Since 2017
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                  One of the Top 3 <span className="text-gradient">Used Car Loan</span> Providers in Rajasthan
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  18+ branches, 50K+ happy customers and growing. We specialize in used car loans 
                  and a broad range of lending products across Rajasthan.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/contact">
                      Meet Our Team
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/contact">
                      Contact Sales
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">7+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">50K+</div>
                    <div className="text-sm text-muted-foreground">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">₹10Cr+</div>
                    <div className="text-sm text-muted-foreground">Annual Turnover</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">18</div>
                    <div className="text-sm text-muted-foreground">Branches</div>
                  </div>
                </div>
              </div>

              <div className="relative animate-slide-up">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={aboutTeam} 
                    alt="Finonest Team" 
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  Company Overview
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Finonest India Pvt. Ltd. was established in 2017 and has quickly grown to become a trusted 
                  financial partner across Rajasthan. We specialize in used car loans and a broad range of lending products.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-xl border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Key Strengths</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      In-house operations & sales team
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      360° lending solutions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Robust post-sales support
                    </li>
                  </ul>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Core Business Areas</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {coreBusinessAreas.map((area, index) => (
                      <div key={index} className="bg-card p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                        <div className="text-xl font-bold text-primary mb-1">{area.abbr}</div>
                        <div className="text-sm font-medium text-foreground mb-1">{area.title}</div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{area.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Milestones We're Proud Of
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20 hidden md:block" />
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div 
                    key={index}
                    className={`flex flex-col md:flex-row items-center gap-4 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="bg-card p-6 rounded-xl border border-border inline-block">
                        <div className="text-primary font-bold text-lg mb-1">{milestone.year}</div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground text-sm">{milestone.description}</p>
                      </div>
                    </div>
                    
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10" />
                    
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                What Drives Us
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Promoters */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Promoters
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Meet the Visionary Leaders
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Behind Finonest India's success
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {promoters.map((promoter, index) => (
                <div 
                  key={index}
                  className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-primary-foreground">
                        {promoter.initials}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{promoter.name}</h3>
                      <div className="text-primary text-sm font-medium mb-3">{promoter.role}</div>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                        {promoter.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ready to Partner With Us?
              </h2>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                Join thousands of satisfied customers who transformed their financial journey with Finonest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to="/apply">
                    Become a Partner
                  </Link>
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

export default About;
