import { useState, useEffect } from "react";
import { Star, Loader2 } from "lucide-react";
import { publicCMSAPI } from "@/lib/api";

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  content: string;
  rating: number;
  avatar?: { url?: string; altText?: string };
  createdAt?: string;
}

const GoogleReviews = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        const res = await publicCMSAPI.listTestimonials({ limit: 4, featured: true });
        if (res.status === 'ok' && res.data) {
          setTestimonials(res.data || []);
        }
      } catch (error) {
        console.error('Failed to load testimonials:', error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    loadTestimonials();
  }, []);

  const averageRating = testimonials.length > 0
    ? testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / testimonials.length
    : 4.9;
  const totalReviews = testimonials.length || 127;

  const formatTimeAgo = (dateString?: string) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) !== 1 ? 's' : ''} ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) !== 1 ? 's' : ''} ago`;
    return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) !== 1 ? 's' : ''} ago`;
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
              alt="Google" 
              className="h-6 object-contain"
            />
            <span className="text-muted-foreground">Reviews</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl font-bold text-foreground">{averageRating}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground">Based on {totalReviews} reviews</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Reviews will appear here once published.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial._id}
                className="bg-background rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  {testimonial.avatar?.url ? (
                    <img 
                      src={testimonial.avatar.url} 
                      alt={testimonial.avatar.altText || testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-foreground">{testimonial.name}</h4>
                    {testimonial.role && (
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    )}
                    <p className="text-xs text-muted-foreground">{formatTimeAgo(testimonial.createdAt)}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= (testimonial.rating || 5) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {testimonial.content}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJI1TNZRqzbTkRo9RLFM5zasw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Star className="w-5 h-5" />
            Write a Review
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
