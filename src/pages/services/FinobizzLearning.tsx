import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Video, Award, Users, Clock, CheckCircle, ArrowRight, Play } from "lucide-react";

const courses = [
  {
    title: "Basics of Lending",
    description: "Learn the fundamentals of lending, types of loans, and how the lending process works.",
    duration: "4 hours",
    lessons: 12,
    level: "Beginner",
  },
  {
    title: "Credit Score Mastery",
    description: "Understand CIBIL scores, factors affecting credit, and how to improve your credit rating.",
    duration: "3 hours",
    lessons: 8,
    level: "Beginner",
  },
  {
    title: "Home Loan Essentials",
    description: "Complete guide to home loans - eligibility, documentation, and approval process.",
    duration: "5 hours",
    lessons: 15,
    level: "Intermediate",
  },
  {
    title: "Business Finance",
    description: "Learn about business loans, working capital, and managing business finances effectively.",
    duration: "6 hours",
    lessons: 18,
    level: "Advanced",
  },
  {
    title: "Investment Basics",
    description: "Introduction to investments, mutual funds, and building a diversified portfolio.",
    duration: "4 hours",
    lessons: 10,
    level: "Beginner",
  },
  {
    title: "Tax Planning",
    description: "Master tax-saving strategies and understand how loans affect your tax liability.",
    duration: "3 hours",
    lessons: 9,
    level: "Intermediate",
  },
];

const features = [
  {
    icon: Video,
    title: "Video Lessons",
    description: "High-quality video content by industry experts",
  },
  {
    icon: BookOpen,
    title: "Study Materials",
    description: "Downloadable PDFs and reference guides",
  },
  {
    icon: Award,
    title: "Certificates",
    description: "Get certified upon course completion",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with fellow learners and mentors",
  },
];

const FinobizzLearning = () => {
  return (
    <>
      <Helmet>
        <title>Finobizz Learning Platform - Finonest | Financial Education</title>
        <meta name="description" content="Learn about loans, credit scores, investments, and financial planning with Finobizz Learning Platform by Finonest. Free courses for everyone." />
        <meta name="keywords" content="financial education, loan courses, credit score, investment basics, Finobizz, Finonest" />
        <link rel="canonical" href="https://finonest.com/services/finobizz-learning" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pb-16 lg:pb-0">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <GraduationCap className="w-4 h-4" />
                Finobizz Learning Platform
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                Master Your <span className="text-gradient">Financial Future</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Free financial education courses designed to help you make smarter decisions about 
                loans, investments, and money management. Learn from industry experts at your own pace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/services/finobizz-learning/apply">
                    Start Learning Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Available Courses
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Learn at Your Own Pace
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose from our curated collection of financial education courses
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <div key={index} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-primary/50" />
                  </div>
                  <div className="p-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {course.level}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{course.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.lessons} lessons
                      </span>
                    </div>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Start Course
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Why Learn with Finobizz?
                </h2>
                <p className="text-primary-foreground/80 mb-8">
                  Our platform is designed by financial experts to give you practical knowledge 
                  that you can apply in your daily financial decisions.
                </p>
                <div className="space-y-4">
                  {[
                    "100% Free courses - no hidden charges",
                    "Learn from industry experts with 15+ years experience",
                    "Practical knowledge you can apply immediately",
                    "Get certified and boost your financial literacy",
                    "Access anytime, anywhere on any device",
                  ].map((point, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur p-8 rounded-2xl text-center">
                <div className="text-5xl font-bold mb-2">10,000+</div>
                <div className="text-primary-foreground/80 mb-6">Learners already enrolled</div>
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/services/finobizz-learning/apply">
                    Join Now - It's Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container">
            <div className="bg-card rounded-2xl border border-border p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Sign up now and get instant access to all our free courses. No credit card required.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/services/finobizz-learning/apply">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
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

export default FinobizzLearning;
