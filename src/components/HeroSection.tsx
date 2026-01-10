import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, MapPin, Building2, IndianRupee, Home, Briefcase, Car, CreditCard, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { publicCMSAPI } from "@/lib/api";
import heroHomeLoan from "@/assets/hero-home-loan.jpg";
import heroCarLoan from "@/assets/hero-car-loan.jpg";
import heroBusinessLoan from "@/assets/hero-business-loan.jpg";

interface Slide {
  id?: number;
  title: string;
  subtitle?: string;
  description: string;
  cta?: string;
  ctaLink?: string;
  image?: string;
  highlight?: string;
}

interface Stat {
  _id: string;
  label: string;
  value: string;
  suffix?: string;
  icon?: string;
}

interface Service {
  _id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  highlight?: boolean;
}

// Icon mapping for stats
const statIcons: Record<string, any> = {
  'users': Users,
  'map': MapPin,
  'building': Building2,
  'rupee': IndianRupee,
  'indianrupee': IndianRupee,
};

// Icon mapping for services
const serviceIcons: Record<string, any> = {
  'home-loan': Home,
  'home': Home,
  'personal-loan': Briefcase,
  'personal': Briefcase,
  'car-loan': Car,
  'car': Car,
  'credit-card': CreditCard,
  'credit': CreditCard,
};

const rotatingWords = ["Credit Card", "Home Loan", "Personal Loan", "Car Loan"];

interface HeroSectionProps {
  props?: {
    slides?: Slide[];
    rotatingWords?: string[];
    tagline?: string;
  };
}

const HeroSection = ({ props: blockProps }: HeroSectionProps = {}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Load stats and services from CMS
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load stats
        try {
          const statsRes = await publicCMSAPI.listStats();
          if (statsRes.status === 'ok' && statsRes.data) {
            setStats(statsRes.data || []);
          }
        } catch (error) {
          console.log('Stats not available, using fallback');
        }

        // Load featured services
        try {
          const servicesRes = await publicCMSAPI.listServices({ limit: 4 });
          if (servicesRes.status === 'ok' && servicesRes.data?.items) {
            // Filter for highlighted services
            const highlightedServices = servicesRes.data.items.filter((service: any) => service.highlight);
            setServices(highlightedServices.slice(0, 4) || []);
          } else {
            // Set fallback services if none loaded from CMS
            setServices([
              {
                _id: '1',
                slug: 'home-loan',
                title: 'Home Loan',
                shortDescription: 'Instant approval at lowest interest rates',
                highlight: true
              },
              {
                _id: '2', 
                slug: 'personal-loan',
                title: 'Personal Loan',
                shortDescription: 'Paperless process at low rate',
                highlight: false
              },
              {
                _id: '3',
                slug: 'car-loan', 
                title: 'New Car Loan',
                shortDescription: 'Drive away your dream car today.',
                highlight: false
              },
              {
                _id: '4',
                slug: 'credit-cards',
                title: 'Credit Card',
                shortDescription: 'Choose cards from all top banks',
                highlight: false
              }
            ]);
          }
        } catch (error) {
          console.log('Services not available, using fallback');
          // Set fallback services on error
          setServices([
            {
              _id: '1',
              slug: 'home-loan',
              title: 'Home Loan',
              shortDescription: 'Instant approval at lowest interest rates',
              highlight: true
            },
            {
              _id: '2', 
              slug: 'personal-loan',
              title: 'Personal Loan',
              shortDescription: 'Paperless process at low rate',
              highlight: false
            },
            {
              _id: '3',
              slug: 'car-loan', 
              title: 'New Car Loan',
              shortDescription: 'Drive away your dream car today.',
              highlight: false
            },
            {
              _id: '4',
              slug: 'credit-cards',
              title: 'Credit Card',
              shortDescription: 'Choose cards from all top banks',
              highlight: false
            }
          ]);
        }

        // Use slides from block props if provided, otherwise use default
        if (blockProps?.slides && blockProps.slides.length > 0) {
          setSlides(blockProps.slides);
        } else {
          // Fallback to default slides with service cards
          setSlides([{
            id: 1,
            title: "Home Loan",
            subtitle: "Instant approval at lowest interest rates",
            description: "Get the best home loan rates with 100% paperless processing",
            cta: "Apply Now",
            ctaLink: "/services/home-loan",
            image: heroHomeLoan,
            highlight: "Quick Disbursal"
          }, {
            id: 2,
            title: "Personal Loan", 
            subtitle: "Paperless process at low rate",
            description: "Get instant personal loans with minimal documentation",
            cta: "Apply Now",
            ctaLink: "/services/personal-loan",
            image: heroCarLoan,
            highlight: "Lowest EMI Ride"
          }, {
            id: 3,
            title: "New Car Loan",
            subtitle: "Drive away your dream car today.",
            description: "Get the lowest vehicle loan rates with quick approval",
            cta: "Apply Now",
            ctaLink: "/services/car-loan",
            image: heroBusinessLoan,
            highlight: "Rewards Unlimited"
          }, {
            id: 4,
            title: "Credit Card",
            subtitle: "Choose cards from all top banks",
            description: "Compare and apply for credit cards from leading banks",
            cta: "Apply Now",
            ctaLink: "/services/credit-cards",
            image: heroHomeLoan,
            highlight: "Rewards Unlimited"
          }]);
        }
      } catch (error) {
        console.error('Failed to load hero data:', error);
        // Set fallback data on error
        setServices([
          {
            _id: '1',
            slug: 'home-loan',
            title: 'Home Loan',
            shortDescription: 'Instant approval at lowest interest rates',
            highlight: true
          },
          {
            _id: '2', 
            slug: 'personal-loan',
            title: 'Personal Loan',
            shortDescription: 'Paperless process at low rate',
            highlight: false
          },
          {
            _id: '3',
            slug: 'car-loan', 
            title: 'New Car Loan',
            shortDescription: 'Drive away your dream car today.',
            highlight: false
          },
          {
            _id: '4',
            slug: 'credit-cards',
            title: 'Credit Card',
            shortDescription: 'Choose cards from all top banks',
            highlight: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [blockProps]);
  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  useEffect(() => {
    const words = blockProps?.rotatingWords || rotatingWords;
    const wordInterval = setInterval(() => {
      setCurrentWord(prev => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(wordInterval);
  }, [blockProps?.rotatingWords]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const slide = slides[currentSlide] || slides[0];
  const words = blockProps?.rotatingWords || rotatingWords;

  // Get icon for stat
  const getStatIcon = (stat: Stat) => {
    if (stat.icon) {
      const iconName = stat.icon.toLowerCase().replace(/\s+/g, '');
      return statIcons[iconName] || Users;
    }
    return Users;
  };

  // Get icon for service
  const getServiceIcon = (service: Service) => {
    const slug = service.slug.toLowerCase();
    for (const [key, icon] of Object.entries(serviceIcons)) {
      if (slug.includes(key)) {
        return icon;
      }
    }
    return Briefcase;
  };

  if (loading && slides.length === 0) {
    return (
      <section className="relative bg-gradient-to-b from-background via-background to-primary pt-20 md:pt-24 overflow-hidden">
        <div className="container mx-auto px-6 py-8 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }
  return <section className="relative bg-gradient-to-b from-background via-background to-primary pt-20 md:pt-24 overflow-hidden">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Side - Tagline, Stats, Services */}
            <div className="space-y-8">
              {/* Tagline */}
              <div>
                <h1 className="font-display text-4xl xl:text-5xl font-bold text-foreground leading-tight">
                  Upgrade the Way
                  <br />
                  You Choose{" "}
                  <span key={currentWord} className="text-primary animate-fade-in inline-block">
                    {words[currentWord]}
                  </span>
                </h1>
              </div>

              {/* Stats Grid */}
              {stats.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {stats.slice(0, 4).map((stat) => {
                    const IconComponent = getStatIcon(stat);
                    return (
                      <div key={stat._id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-foreground">
                            {stat.value}{" "}
                            {stat.suffix && <span className="text-primary">{stat.suffix}</span>}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Services Grid - Desktop */}
              {services.length > 0 && (
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                  {services.slice(0, 4).map((service) => {
                    const IconComponent = getServiceIcon(service);
                    return (
                      <Link key={service._id} to={`/services/${service.slug}`} className="relative bg-card backdrop-blur border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-lg transition-all group">
                        {service.highlight && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium whitespace-nowrap">
                            Featured
                          </span>
                        )}
                        <div className="flex items-start gap-3 mt-2">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground text-sm mb-0.5">
                              {service.title}
                            </h3>
                            <p className="text-[11px] text-muted-foreground line-clamp-2">
                              {service.shortDescription || ''}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3 text-xs">
                          Apply Now
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Side - Banner Carousel */}
            {slides.length > 0 && (
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  {slides.map((s, index) => (
                    <div key={s.id || index} className={`transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"}`}>
                      <div className="relative aspect-[4/3]">
                        {s.image ? (
                          <img src={s.image.startsWith('http') ? s.image : s.image} alt={s.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                            <div className="text-center p-8">
                              <h2 className="text-2xl font-bold text-primary-foreground mb-2">{s.title}</h2>
                              {s.subtitle && <p className="text-primary-foreground/90">{s.subtitle}</p>}
                            </div>
                          </div>
                        )}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-center">
                        <h2 className="font-display text-2xl font-bold text-primary-foreground mb-1">
                          Your{" "}
                          <span className="text-yellow-400">{slide.highlight}</span>
                        </h2>
                        <p className="text-sm text-primary-foreground/90 mb-2">
                          {s.subtitle}
                        </p>
                        <p className="text-xs text-primary-foreground/70 mb-4 max-w-[200px]">
                          {s.description}
                        </p>
                        {s.ctaLink && s.cta && (
                          <Button variant="outline" size="sm" className="w-fit bg-foreground text-background hover:bg-foreground/90 border-0" asChild>
                            <Link to={s.ctaLink}>
                              {s.cta}
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  ))}
                
                  {/* Navigation Dots */}
                  {slides.length > 1 && (
                    <div className="absolute bottom-4 right-4 flex gap-1.5">
                      {slides.map((_, index) => (
                        <button key={index} onClick={() => goToSlide(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "bg-accent w-4" : "bg-primary-foreground/40"}`} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout - Banner only */}
      <div className="lg:hidden">
        {slides.length > 0 && (
          <div className="relative">
            {slides.map((s, index) => (
              <div key={s.id || index} className={`transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"}`}>
                <div className="relative aspect-[16/10]">
                  {s.image ? (
                    <img src={s.image.startsWith('http') ? s.image : s.image} alt={s.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-primary/70" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="font-display text-xl font-bold text-primary-foreground mb-1">
                      Your <span className="text-yellow-400">{slide.highlight}</span>
                    </h2>
                    <p className="text-xs text-primary-foreground/80 mb-3">
                      {s.description}
                    </p>
                    <Button variant="outline" size="sm" className="bg-foreground text-background hover:bg-foreground/90 border-0 text-xs" asChild>
                      <Link to={s.ctaLink}>
                        {s.cta}
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {slides.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {slides.map((_, index) => (
                  <button key={index} onClick={() => goToSlide(index)} className={`h-2 rounded-full transition-all ${index === currentSlide ? "bg-accent w-4" : "bg-primary-foreground/40 w-2"}`} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile Tagline */}
        <div className="bg-card py-6 px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Upgrade the Way You Choose
          </h2>
          <p key={currentWord} className="text-2xl font-display font-bold text-accent animate-fade-in">
            {words[currentWord]}
          </p>
        </div>

        {/* Mobile Services Grid - 2x2 no scroll */}
        {services.length > 0 && (
          <div className="bg-card px-4 pb-6">
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {services.slice(0, 4).map((service) => {
                const IconComponent = getServiceIcon(service);
                return (
                  <Link key={service._id} to={`/services/${service.slug}`} className="relative bg-background rounded-xl border border-border p-4 hover:border-primary/50 transition-all group">
                    {service.highlight && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium whitespace-nowrap">
                        Featured
                      </span>
                    )}
                    <div className="flex items-start gap-2 mt-1">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm">
                          {service.title}
                        </h3>
                        <p className="text-[10px] text-muted-foreground line-clamp-2">
                          {service.shortDescription || ''}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3 text-[10px] h-7">
                      Apply Now
                      <ArrowRight className="w-2.5 h-2.5 ml-1" />
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Mobile Stats Bar */}
        
      </div>
    </section>;
};
export default HeroSection;