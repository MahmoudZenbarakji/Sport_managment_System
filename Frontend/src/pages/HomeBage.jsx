

import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import Facilities from "../components/Facilities";
import GymSection from "../components/GymSection";
import TeamSection from "../components/TeamSection";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import FacilityDetailsContent from "../components/FacilityDetailsContent";

const HomeBage = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <Categories />
        <Facilities />
        <GymSection />
        <TeamSection />
        
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
};

export default HomeBage;
