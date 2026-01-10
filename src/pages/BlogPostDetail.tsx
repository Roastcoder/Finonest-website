import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Tag, Clock } from "lucide-react";
import { publicCMSAPI } from "@/lib/api";

interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  categories?: { name: string; slug: string }[];
  tags?: string[];
  author?: { name: string; email?: string } | string;
  publishedAt?: string;
  readTime?: string;
  featuredImage?: { url?: string; altText?: string };
  relatedPosts?: any[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonical?: string;
  };
}

const BlogPostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('Post slug is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await publicCMSAPI.getPostBySlug(slug);
        if (response.status === 'ok' && response.data) {
          setPost(response.data);
        } else {
          setError('Post not found');
        }
      } catch (err: any) {
        console.error('Failed to fetch blog post:', err);
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
        <WhatsAppButton />
        <BottomNavigation />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Post Not Found</h1>
            <p className="text-muted-foreground mb-4">{error || 'The requested post could not be found.'}</p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
        <BottomNavigation />
      </>
    );
  }

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

  return (
    <>
      <Helmet>
        <title>{post.seo?.metaTitle || `${post.title} - Finonest Blog`}</title>
        <meta name="description" content={post.seo?.metaDescription || post.excerpt || ''} />
        {post.seo?.canonical && <link rel="canonical" href={post.seo.canonical} />}
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-background pb-16 lg:pb-0">
        {/* Hero Section */}
        {post.featuredImage?.url && (
          <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src={post.featuredImage.url} 
                alt={post.featuredImage.altText || post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background" />
            </div>
            <div className="container relative z-10">
              <Button variant="ghost" asChild className="mb-6">
                <Link to="/blog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </section>
        )}

        <article className="container max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <header className="mb-8">
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/blog?category=${category.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <Tag className="w-3 h-3" />
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl text-muted-foreground mb-6">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
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
              {post.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              )}
            </div>
          </header>

          {/* Featured Image (if not in hero) */}
          {post.featuredImage?.url && !post.featuredImage.url.includes('unsplash') && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={post.featuredImage.url} 
                alt={post.featuredImage.altText || post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {post.relatedPosts.map((relatedPost: any) => (
                  <Link
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow group"
                  >
                    {relatedPost.featuredImage?.url && (
                      <img
                        src={relatedPost.featuredImage.url}
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
                      />
                    )}
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                    {relatedPost.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground mt-12">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Need Financial Assistance?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Get expert advice and find the best loan rates from our partner banks.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/services">
                Explore Our Services
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <BottomNavigation />
    </>
  );
};

export default BlogPostDetail;
