import HeroSection from "../components/landingpage/HeroSection";
import StatusSection from "../components/landingpage/StatusSection";
import CoursesSection from "../components/landingpage/CoursesSection";


export default function Home() {
  return (
    <div className="home">
      <HeroSection />
      <StatusSection />
      <CoursesSection />

      {/* <TestemunhosSection /> */}
      {/* <ContatoSection /> */}
    </div>
  );
}