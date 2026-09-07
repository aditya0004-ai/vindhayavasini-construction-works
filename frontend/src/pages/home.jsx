import { useEffect } from "react";

import Header from "../components/header";
import Hero from "../components/hero";
import OurStory from "../components/OurStory";
import ProjectsSection from "../components/ProjectSection";
import WhyUs from "../components/WhyUs";
import BuildCTA from "../components/BuildCTA";
import Footer from "../components/Footer";

const Home = () => {
  useEffect(() => {
    // Prevent browser from restoring previous scroll position
    window.history.scrollRestoration = "manual";

    // Always start from the top
    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);

  return (
    <div className="w-full">
      <Header />
      <Hero />
      <OurStory />
      <ProjectsSection />
      <WhyUs />
      <BuildCTA />
      <Footer />
    </div>
  );
};

export default Home;