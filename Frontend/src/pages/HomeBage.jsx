import AboutUs from "../components/AboutUs";
import Categories from "../components/Categories";
import Facilities from "../components/Facilities";
import Footer from "../components/Footer";
import GymSection from "../components/GymSection";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import TeamSection from "../components/TeamSection";

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
