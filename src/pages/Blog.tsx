import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react";
import { publicCMSAPI } from "@/lib/api";

interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  categories?: { name: string; slug: string }[];
  author?: { name: string; email?: string } | string;
  publishedAt?: string;
  readTime?: string;
  featuredImage?: { url?: string; altText?: string };
}

interface Category {
  name: string;
  slug: string;
}

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch blog posts
        const postsResponse = await publicCMSAPI.listPosts({
          page: 1,
          limit: 50,
          category: selectedCategory !== "All" ? selectedCategory : undefined,
          q: searchTerm || undefined
        });
        
        if (postsResponse.status === 'ok' && postsResponse.data?.items) {
          setBlogPosts(postsResponse.data.items);
        }
        
        // Fetch categories
        const categoriesResponse = await publicCMSAPI.listCategories();
        if (categoriesResponse.status === 'ok' && categoriesResponse.data) {
          const cats = Array.isArray(categoriesResponse.data) 
            ? categoriesResponse.data 
            : categoriesResponse.data.items || [];
          setCategories(cats.map((cat: any) => ({ name: cat.name, slug: cat.slug })));
        }
      } catch (err: any) {
        console.error('Failed to fetch blog data:', err);
        setError(err.message || 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, searchTerm]);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || 
      post.categories?.some(cat => cat.slug === selectedCategory || cat.name === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const getAuthorName = (author?: { name: string } | string) => {
    if (!author) return 'Finonest Team';
    if (typeof author === 'string') return author;
    return author.name || 'Finonest Team';
  };

  const getCategoryName = (categories?: { name: string }[]) => {
    if (!categories || categories.length === 0) return 'Uncategorized';
    return categories[0].name;
  };

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
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.slug
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-12">
          <div className="container">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{error}</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <article
                    key={post.slug || post.id}
                    className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    {post.featuredImage?.url && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.featuredImage.url}
                          alt={post.featuredImage.altText || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {post.categories && post.categories.length > 0 && (
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                              <Tag className="w-3 h-3" />
                              {getCategoryName(post.categories)}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {getAuthorName(post.author)}
                        </div>
                        {post.publishedAt && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.publishedAt)}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        {post.readTime && (
                          <span className="text-xs text-muted-foreground">{post.readTime}</span>
                        )}
                        <Button variant="ghost" size="sm" className="group/btn" asChild>
                          <Link to={`/blog/${post.slug}`}>
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
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
