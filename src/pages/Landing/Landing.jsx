import Navbar from "../../components/layout/Navbar/Navbar";
import Hero from "../../components/landing/Hero/Hero";
import HowItWorks from "../../components/landing/HowItWorks/HowItWorks";
import Features from "../../components/landing/Features/Features";
import AcademicSupport from "../../components/landing/AcademicSupport/AcademicSupport";
import ProgressPersonalization from "../../components/landing/ProgressPersonalization/ProgressPersonalization";
import FinalCTA from "../../components/landing/FinalCTA/FinalCTA";
import Footer from "../../components/layout/Footer/Footer";

const Landing = () => {
  return (
    <div>
      <Navbar />

      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <AcademicSupport />
        <ProgressPersonalization />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
};

export default Landing;