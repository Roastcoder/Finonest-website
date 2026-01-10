import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { publicCMSAPI } from "@/lib/api";

interface TestimonialData {
  name: string;
  role?: string;
  content: string;
  rating?: number;
  avatar?: {
    url?: string;
    altText?: string;
  };
}

interface TestimonialsProps {
  testimonials?: TestimonialData[];
  title?: string;
  subtitle?: string;
  description?: string;
  limit?: number;
  featured?: boolean;
}

const defaultTestimonials: TestimonialData[] = [
  {
    name: "Rajesh Kumar",
    role: "Business Owner, Jaipur",
    content: "Finonest made my business loan process incredibly smooth. Got approved in just 2 days with minimal paperwork. Highly recommended!",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Software Engineer, Bangalore",
    content: "Best home loan experience ever! The team was so helpful and got me the best interest rate. My dream home is now a reality.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "Doctor, Mumbai",
    content: "Quick personal loan for my sister's wedding. The entire process was transparent with no hidden charges. Thank you Finonest!",
    rating: 5,
  },
];

const Testimonials: React.FC<TestimonialsProps> = ({ 
  testimonials: propsTestimonials, 
  title,
  subtitle,
  description,
  limit,
  featured 
}) => {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>(propsTestimonials || defaultTestimonials);
  const [loading, setLoading] = useState(!propsTestimonials);

  useEffect(() => {
    // If props are provided, use them
    if (propsTestimonials) {
      setTestimonials(propsTestimonials);
      setLoading(false);
      return;
    }

    // Otherwise, fetch from CMS
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await publicCMSAPI.listTestimonials({ limit, featured });
        if (response.status === 'ok' && response.data && Array.isArray(response.data)) {
          setTestimonials(response.data.map((t: any) => ({
            name: t.name,
            role: t.role,
            content: t.content,
            rating: t.rating || 5,
            avatar: t.avatar
          })));
        }
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
        // Keep default testimonials on error
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [propsTestimonials, limit, featured]);

  if (loading) {
    return null; // Or a loading skeleton
  }
  return (
    <section className="py-10 md:py-24 relative overflow-hidden bg-gradient-section">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-16">
          <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-2 md:mb-4">
            {subtitle || "Testimonials"}
          </span>
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-6">
            {title || (
              <>
                What Our{" "}
                <span className="text-gradient-primary">Customers Say</span>
              </>
            )}
          </h2>
          {description && (
            <p className="text-muted-foreground text-sm md:text-lg hidden md:block">
              {description}
            </p>
          )}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="glass rounded-xl md:rounded-2xl p-4 md:p-8 card-hover relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="absolute top-4 right-4 md:top-6 md:right-6 w-6 h-6 md:w-10 md:h-10 text-primary/20" />
              
              <div className="flex gap-0.5 md:gap-1 mb-2 md:mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-accent text-sm md:text-lg">★</span>
                ))}
              </div>

              <p className="text-foreground/90 mb-3 md:mb-6 leading-relaxed text-xs md:text-base line-clamp-3 md:line-clamp-none">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-2 md:gap-4">
                {testimonial.avatar?.url ? (
                  <img 
                    src={testimonial.avatar.url} 
                    alt={testimonial.avatar.altText || testimonial.name}
                    className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-display font-bold text-sm md:text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-foreground text-xs md:text-base">{testimonial.name}</h4>
                  {testimonial.role && (
                    <p className="text-[10px] md:text-sm text-muted-foreground">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
