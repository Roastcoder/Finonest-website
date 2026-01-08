import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rahul Sharma",
    rating: 5,
    text: "Excellent service! Got my home loan approved within a week. The team was very helpful and transparent throughout the process.",
    time: "2 weeks ago",
  },
  {
    name: "Priya Gupta",
    rating: 5,
    text: "Very professional and knowledgeable team. They helped me find the best interest rate for my business loan. Highly recommended!",
    time: "1 month ago",
  },
  {
    name: "Amit Patel",
    rating: 5,
    text: "Great experience with Finonest. They made the car loan process so simple. Quick approval and excellent customer support.",
    time: "3 weeks ago",
  },
  {
    name: "Neha Singh",
    rating: 5,
    text: "I was struggling to get a personal loan due to my credit score. Finonest helped me find the right lender. Thank you!",
    time: "1 month ago",
  },
];

const GoogleReviews = () => {
  const averageRating = 4.9;
  const totalReviews = 127;

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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-background rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{review.name}</h4>
                  <p className="text-xs text-muted-foreground">{review.time}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                {review.text}
              </p>
            </div>
          ))}
        </div>

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
