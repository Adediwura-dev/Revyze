import Navbar from "../../components/layout/Navbar/Navbar";
import Hero from "../../components/landing/Hero/Hero";
import HowItWorks from "../../components/landing/HowItWorks/HowItWorks";
import Features from "../../components/landing/Features/Features";

const Landing = () => {
  return (
    <div>
      <Navbar />

      <main>
        <Hero />
        <HowItWorks />
        <Features />
      </main>
    </div>
  );
};

export default Landing;