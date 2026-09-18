import Navbar from "../../components/layout/Navbar/Navbar";
import Hero from "../../components/landing/Hero/Hero";
import HowItWorks from "../../components/landing/HowItWorks/HowItWorks";

const Landing = () => {
  return (
    <div>
      <Navbar />

      <main>
        <Hero />
        <HowItWorks />
      </main>
    </div>
  );
};

export default Landing;