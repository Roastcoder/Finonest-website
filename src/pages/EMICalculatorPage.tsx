import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomNavigation from "@/components/BottomNavigation";
import EMICalculator from "@/components/EMICalculator";
const EMICalculatorPage = () => {
  return <>
      <Helmet>
        <title>EMI Calculator - FinoNest | Calculate Your Loan EMI</title>
        <meta name="description" content="Use FinoNest's free EMI calculator to calculate your monthly loan payments. Works for home loans, car loans, personal loans, and more." />
        <meta name="keywords" content="EMI calculator, loan calculator, home loan EMI, car loan EMI, personal loan EMI" />
        <link rel="canonical" href="https://finonest.in/emi-calculator" />
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-background pt-20 pb-16 lg:pb-0">
        <div className="container mx-auto px-[20px] py-[44px] pb-[4px] border">
          

          <EMICalculator />
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
      <BottomNavigation />
    </>;
};
export default EMICalculatorPage;