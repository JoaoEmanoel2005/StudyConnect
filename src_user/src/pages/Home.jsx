import HeroSection from "../components/landingpage/HeroSection";
import AboutSection from "../components/landingpage/AboutSection";
import HowItWorksSection from "../components/landingpage/HowItWorksSection";
import CoursesSection from "../components/landingpage/CoursesSection";
import InstitutionsSection from "../components/landingpage/InstitutionSection";
import TestimonialsSection from "../components/landingpage/TestimonialsSection";
import FinalCTA from "../components/landingpage/FinalCTA";
import ContactSection from "../components/landingpage/ContactSection";

export default function Home() {
  return (
    <div className="home">
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <CoursesSection />
      <InstitutionsSection />
      <TestimonialsSection />
      <FinalCTA />

    </div>
  );
}