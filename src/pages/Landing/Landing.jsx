import Navbar from "../../components/layout/Navbar/Navbar";
import Hero from "../../components/landing/Hero/Hero";
import HowItWorks from "../../components/landing/HowItWorks/HowItWorks";
import Features from "../../components/landing/Features/Features";
import AcademicSupport from "../../components/landing/AcademicSupport/AcademicSupport";

const Landing = () => {
  return (
    <div>
      <Navbar />

      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <AcademicSupport/>
      </main>
    </div>
  );
};

export default Landing;