import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PartnerBanks from "@/components/PartnerBanks";
import Services from "@/components/Services";
import ProcessSteps from "@/components/ProcessSteps";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import GoogleReviews from "@/components/GoogleReviews";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import CreditScoreBanner from "@/components/CreditScoreBanner";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Navbar />
      
      {/* New Hero Section - Urban Money style */}
      <HeroSection />
      
      {/* Credit Score Banner */}
      <CreditScoreBanner />
      
      {/* Hide detailed services on mobile, show on desktop */}
      <div className="hidden lg:block">
        <AnimateOnScroll animation="fade-up" delay={0}>
          <Services />
        </AnimateOnScroll>
      </div>
      
      <AnimateOnScroll animation="fade-up">
        <ProcessSteps />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fade-up">
        <WhyUs />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fade-up">
        <Testimonials />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fade-up">
        <GoogleReviews />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fade-up">
        <FAQ />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fade-up">
        <Contact />
      </AnimateOnScroll>
      
      {/* Banking Partners - Moved to end */}
      <AnimateOnScroll animation="fade-up">
        <PartnerBanks />
      </AnimateOnScroll>
      
      <Footer />
      <WhatsAppButton />
      <BottomNavigation />
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
