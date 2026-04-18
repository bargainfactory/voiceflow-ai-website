import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import Solutions from "@/components/Solutions";
import Demo from "@/components/Demo";
import Pricing from "@/components/Pricing";
import CaseStudies from "@/components/CaseStudies";
import ROICalculator from "@/components/ROICalculator";
import Dashboard from "@/components/Dashboard";
import GetStarted from "@/components/GetStarted";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBadges />
      <Solutions />
      <Demo />
      <Pricing />
      <CaseStudies />
      <ROICalculator />
      <Dashboard />
      <GetStarted />
      <QuoteForm />
      <Footer />
    </>
  );
}
