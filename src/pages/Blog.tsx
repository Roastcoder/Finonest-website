import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "How to Improve Your Credit Score in 2025",
    excerpt: "Learn the top strategies to boost your credit score and get better loan rates. A good credit score can save you lakhs on interest.",
    category: "Credit Score",
    author: "Finonest Team",
    date: "December 15, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
    slug: "improve-credit-score-2025",
  },
  {
    id: 2,
    title: "Used Car Loan: Complete Guide for First-Time Buyers",
    excerpt: "Everything you need to know about getting a used car loan in India. From documentation to approval, we cover it all.",
    category: "Car Loan",
    author: "Surya Mohan Roy",
    date: "December 10, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
    slug: "used-car-loan-guide",
  },
  {
    id: 3,
    title: "Home Loan vs Loan Against Property: Which is Right for You?",
    excerpt: "Understanding the key differences between home loans and LAP to make the best financial decision for your needs.",
    category: "Home Loan",
    author: "CA Prateek Somani",
    date: "December 5, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    slug: "home-loan-vs-lap",
  },
  {
    id: 4,
    title: "5 Mistakes to Avoid When Applying for a Personal Loan",
    excerpt: "Common pitfalls that can hurt your loan application and how to avoid them for a smooth approval process.",
    category: "Personal Loan",
    author: "Finonest Team",
    date: "November 28, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
    slug: "personal-loan-mistakes",
  },
  {
    id: 5,
    title: "Business Loan Interest Rates: What to Expect in 2025",
    excerpt: "A comprehensive overview of business loan interest rates from various banks and NBFCs for the upcoming year.",
    category: "Business Loan",
    author: "Atishay Jain",
    date: "November 20, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
    slug: "business-loan-rates-2025",
  },
  {
    id: 6,
    title: "EMI Calculator: How to Plan Your Loan Repayment",
    excerpt: "Master the EMI calculator to plan your finances better. Understand how loan amount, tenure, and interest affect your monthly payments.",
    category: "Financial Planning",
    author: "Sanam Makkar",
    date: "November 15, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1554224155-1696413565d3?w=800",
    slug: "emi-calculator-guide",
  },
];

const categories = ["All", "Credit Score", "Car Loan", "Home Loan", "Personal Loan", "Business Loan", "Financial Planning"];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Blog - Finonest | Financial Tips, Loan Guides & Credit Score Advice</title>
        <meta name="description" content="Read expert financial advice, loan guides, and credit score tips from Finonest. Stay updated with the latest in personal finance and lending." />
        <meta name="keywords" content="financial blog, loan tips, credit score advice, personal finance, Finonest blog" />
        <link rel="canonical" href="https://finonest.com/blog" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container text-center">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Finonest Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Financial Insights & <span className="text-gradient">Expert Advice</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Stay informed with our latest articles on loans, credit scores, and financial planning
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 rounded-full"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-border">
          <div className="container">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-12">
          <div className="container">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          <Tag className="w-3 h-3" />
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                        <Button variant="ghost" size="sm" className="group/btn">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Get the latest financial tips, loan updates, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary">
                Subscribe
              </Button>
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

export default Blog;
