import React from "react";
import HeroSection from "./HeroSection";
import Features from "./Features";
import Process from "./Process";
import FAQ from "./FAQ";
import RoleSelection from "./RoleSelection";
export const Home = () => {
  return (
    <div>
      <HeroSection />
      <RoleSelection />
      <Features />
      <Process />
      <FAQ />
    </div>
  );
};

export default Home;
