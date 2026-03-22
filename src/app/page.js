import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import OriginSection from "../components/OriginSection";
import RuneGrid from "../components/RuneGrid";
import ConstructsSection from "../components/ConstructsSection";
import EchoesSection from "../components/EchoesSection";
import SignalSection from "../components/SignalSection";
import CustomCursor from "../components/CustomCursor";
import AdminConsole from "../components/AdminConsole";
import { fetchTechStack, fetchProjects, fetchPhotos } from "@/lib/queries";

export default async function Home() {
  // Server-side data fetching from Supabase
  const [techStack, projects, photos] = await Promise.all([
    fetchTechStack(),
    fetchProjects(),
    fetchPhotos(),
  ]);

  return (
    <>
      <CustomCursor />
      <AdminConsole />
      <Navbar />
      <main>
        <HeroSection />
        <OriginSection />
        <RuneGrid techStack={techStack} />
        <ConstructsSection projects={projects} />
        <EchoesSection photos={photos} />
        <SignalSection />
      </main>
      <Footer />
    </>
  );
}
