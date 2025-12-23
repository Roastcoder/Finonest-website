import React, { useState, useEffect } from 'react';
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
import DynamicComponent from "@/components/DynamicComponent";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";
import { usePageComponents, useTheme, useContent } from "@/hooks/useDynamicContent";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const Index = () => {
  const [useDynamicMode, setUseDynamicMode] = useState(false);
  const { components, loading: componentsLoading } = usePageComponents('home');
  const { theme, loading: themeLoading } = useTheme();
  const { content: heroContent } = useContent('hero_title');
  const { content: heroSubtitle } = useContent('hero_subtitle');

  // Check if admin has set up dynamic content
  useEffect(() => {
    if (components.length > 0) {
      setUseDynamicMode(true);
    }
  }, [components]);

  // Apply theme to document
  useEffect(() => {
    if (theme && Object.keys(theme).length > 0) {
      const root = document.documentElement;
      if (theme.primary_color) root.style.setProperty('--primary', theme.primary_color);
      if (theme.secondary_color) root.style.setProperty('--secondary', theme.secondary_color);
      if (theme.accent_color) root.style.setProperty('--accent', theme.accent_color);
    }
  }, [theme]);

  if (useDynamicMode && !componentsLoading && !themeLoading) {
    // Render dynamic admin-managed content
    return (
      <div className="min-h-screen bg-background pb-16 lg:pb-0">
        <Navbar />
        
        {components.map((component, index) => (
          <AnimateOnScroll key={component.id} animation="fade-up" delay={index * 100}>
            <DynamicComponent
              type={component.component_type}
              data={component.component_data}
              theme={theme}
            />
          </AnimateOnScroll>
        ))}
        
        <Footer />
        <WhatsAppButton />
        <BottomNavigation />
        <PWAInstallPrompt />
        
        {/* Admin toggle button (only visible to admins) */}
        <div className="fixed bottom-20 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUseDynamicMode(false)}
            className="bg-white shadow-lg"
          >
            <Settings className="w-4 h-4 mr-2" />
            Static Mode
          </Button>
        </div>
      </div>
    );
  }

  // Render static content (original design)
  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Navbar />
      
      {/* Enhanced Hero Section with dynamic content */}
      <HeroSection 
        title={heroContent?.text || undefined}
        subtitle={heroSubtitle?.text || undefined}
      />
      
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
      
      {/* Banking Partners - Moved to end */}
      <div className="-mt-24">
        <AnimateOnScroll animation="fade-up">
          <PartnerBanks />
        </AnimateOnScroll>
      </div>
      
      <Footer />
      <WhatsAppButton />
      <BottomNavigation />
      <PWAInstallPrompt />
      
      {/* Admin toggle button (only visible if dynamic content exists) */}
      {components.length > 0 && (
        <div className="fixed bottom-20 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUseDynamicMode(true)}
            className="bg-white shadow-lg"
          >
            <Settings className="w-4 h-4 mr-2" />
            Dynamic Mode
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;