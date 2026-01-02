import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PartnerBanks from "@/components/PartnerBanks";
import Services from "@/components/Services";
import ProcessSteps from "@/components/ProcessSteps";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import CreditScoreBanner from "@/components/CreditScoreBanner";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";

const Index = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Navbar />
      
      <HeroSection />
      
      {/* Credit Score Banner */}
      <div className="-mt-7">
        <CreditScoreBanner />
      </div>
      
      {/* Hide detailed services on mobile, show on desktop */}
      <div className="hidden lg:block -mt-2">
        <AnimateOnScroll animation="fade-up" delay={0}>
          <Services />
        </AnimateOnScroll>
      </div>
      
      <div className="-mt-30">
        <AnimateOnScroll animation="fade-up">
          <ProcessSteps />
        </AnimateOnScroll>
      </div>
      <div className="-mt-30">
        <AnimateOnScroll animation="fade-up">
          <WhyUs />
        </AnimateOnScroll>
      </div>
      <div className="-mt-30">
        <AnimateOnScroll animation="fade-up">
          <Testimonials />
        </AnimateOnScroll>
      </div>
      <div className="-mt-30">
        <AnimateOnScroll animation="fade-up">
          <FAQ />
        </AnimateOnScroll>
      </div>
      <div className="-mt-30">
        <AnimateOnScroll animation="fade-up">
          <Contact />
        </AnimateOnScroll>
      </div>
      
      {/* Banking Partners */}
      <div className="-mt-24">
        <AnimateOnScroll animation="fade-up">
          <PartnerBanks />
        </AnimateOnScroll>
      </div>
      
      <Footer />
      <WhatsAppButton />
      <BottomNavigation />
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
