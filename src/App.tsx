import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
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
import ServiceDetail from "./pages/ServiceDetail";
import CibilCheck from "./pages/CibilCheck";
import ServiceApply from "./pages/ServiceApply";
import FormSuccess from "./pages/FormSuccess";
import Blog from "./pages/Blog";
import BlogPostDetail from "./pages/BlogPostDetail";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Auth from "./pages/Auth";
import CustomerAuth from "./pages/CustomerAuth";
import Dashboard from "./pages/Dashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import ApplicationDetail from "./pages/ApplicationDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCMS from "./pages/AdminCMS";
import AdminLogin from "./pages/AdminLogin";
import UsersAdminNew from "./pages/admin/UsersAdminNew";
import BlogAdminNew from "./pages/admin/BlogAdminNew";
import ServicesAdminNew from "./pages/admin/ServicesAdminNew";
import FormsAdminNew from "./pages/admin/FormsAdminNew";
import LeadsAdminNew from "./pages/admin/LeadsAdminNew";
import FormsAdmin from "./pages/admin/FormsAdmin";
import BlogAdmin from "./pages/admin/BlogAdmin";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import SiteSettingsAdmin from "./pages/admin/SiteSettingsAdmin";
import PagesAdmin from "./pages/admin/PagesAdmin";
import LeadsAdmin from "./pages/admin/LeadsAdmin";
import IndexDynamic from "./pages/IndexDynamic";
import Apply from "./pages/Apply";
import ErrorBoundary from "./components/ErrorBoundary";
import BankingPartnersPage from "./pages/BankingPartnersPage";
import EMICalculatorPage from "./pages/EMICalculatorPage";

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
        <AuthProvider>
          {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
          {showContent && (
            <ErrorBoundary>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<IndexDynamic />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/services" element={<Services />} />
                  {/* Dynamic service detail route - catches all service slugs */}
                  <Route path="/services/:service" element={<ServiceDetail />} />
                  {/* Legacy routes for backward compatibility */}
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
                  <Route path="/blog/:slug" element={<BlogPostDetail />} />
                  <Route path="/terms" element={<TermsAndConditions />} />
                  <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/login" element={<Auth />} />
                  <Route path="/customer/login" element={<CustomerAuth />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/customer/dashboard" element={<CustomerDashboard />} />
                  <Route path="/customer/applications/:id" element={<ApplicationDetail />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/pages" element={<PagesAdmin />} />
                  <Route path="/admin/settings" element={<SiteSettingsAdmin />} />
                  <Route path="/admin/users" element={<UsersAdminNew />} />
                  <Route path="/admin/blog" element={<BlogAdminNew />} />
                  <Route path="/admin/services" element={<ServicesAdminNew />} />
                  <Route path="/admin/forms" element={<FormsAdminNew />} />
                  <Route path="/admin/leads" element={<LeadsAdminNew />} />
                  <Route path="/admin/cms" element={<AdminCMS />} />
                  <Route path="/admin/cms/pages" element={<PagesAdmin />} />
                  <Route path="/admin/cms/blog" element={<BlogAdmin />} />
                  <Route path="/admin/cms/services" element={<ServicesAdmin />} />
                  <Route path="/admin/cms/forms" element={<FormsAdmin />} />
                  <Route path="/admin/cms/users" element={<UsersAdmin />} />
                  <Route path="/admin/cms/settings" element={<SiteSettingsAdmin />} />
                  <Route path="/admin/cms/leads" element={<LeadsAdmin />} />
                  <Route path="/banking-partners" element={<BankingPartnersPage />} />
                  <Route path="/apply" element={<Apply />} />
                  <Route path="/emi-calculator" element={<EMICalculatorPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </ErrorBoundary>
          )}
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
