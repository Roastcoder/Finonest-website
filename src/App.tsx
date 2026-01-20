import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import Services from "./pages/Services";
import HomeLoan from "./pages/services/HomeLoan";
import CarLoan from "./pages/services/CarLoan";
import UsedCarLoan from "./pages/services/UsedCarLoan";
import PersonalLoan from "./pages/services/PersonalLoan";
import BusinessLoan from "./pages/services/BusinessLoan";
import CreditCards from "./pages/services/CreditCards";
import LoanAgainstProperty from "./pages/services/LoanAgainstProperty";
import FinobizzLearning from "./pages/services/FinobizzLearning";
import CibilCheck from "./pages/CibilCheck";
import ServiceApply from "./pages/ServiceApply";
import FormSuccess from "./pages/FormSuccess";
import Blog from "./pages/Blog";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCMS from "./pages/AdminCMS";
import AdminLogin from "./pages/AdminLogin";
import IndexDynamic from "./pages/IndexDynamic";
import Apply from "./pages/Apply";
import ErrorBoundary from "./components/ErrorBoundary";
import BankingPartnersPage from "./pages/BankingPartnersPage";
import EMICalculatorPage from "./pages/EMICalculatorPage";
import ApplyCard from "./pages/apply/ApplyCard";
import ApplyPersonalLoan from "./pages/apply/ApplyPersonalLoan";
import ApplyCarLoan from "./pages/apply/ApplyCarLoan";
import KYCPage from "./pages/kyc/KYCPage";
import StatusPage from "./pages/status/StatusPage";
import ReferralPage from "./pages/referral/ReferralPage";
import UTMTracker from "./components/forms/UTMTracker";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if this is a first visit in this session
    const hasLoaded = sessionStorage.getItem('finonest_loaded');
    if (hasLoaded) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('finonest_loaded', 'true');
    setIsLoading(false);
    setShowContent(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
        {showContent && (
          <ErrorBoundary>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <UTMTracker />
              <Routes>
                <Route path="/" element={<IndexDynamic />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/home-loan" element={<HomeLoan />} />
                <Route path="/services/car-loan" element={<CarLoan />} />
                <Route path="/services/used-car-loan" element={<UsedCarLoan />} />
                <Route path="/services/personal-loan" element={<PersonalLoan />} />
                <Route path="/services/business-loan" element={<BusinessLoan />} />
                <Route path="/services/credit-cards" element={<CreditCards />} />
                <Route path="/services/loan-against-property" element={<LoanAgainstProperty />} />
                <Route path="/services/lap" element={<LoanAgainstProperty />} />
                <Route path="/services/finobizz-learning" element={<FinobizzLearning />} />
                <Route path="/services/:service/apply" element={<ServiceApply />} />
                <Route path="/form-success" element={<FormSuccess />} />
                <Route path="/credit-score" element={<CibilCheck />} />
                <Route path="/cibil-check" element={<CibilCheck />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/cms" element={<AdminCMS />} />
                <Route path="/banking-partners" element={<BankingPartnersPage />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="/apply-card" element={<ApplyCard />} />
                <Route path="/apply-personal-loan" element={<ApplyPersonalLoan />} />
                <Route path="/apply-car-loan" element={<ApplyCarLoan />} />
                <Route path="/kyc" element={<KYCPage />} />
                <Route path="/status" element={<StatusPage />} />
                <Route path="/referral" element={<ReferralPage />} />
                <Route path="/emi-calculator" element={<EMICalculatorPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
