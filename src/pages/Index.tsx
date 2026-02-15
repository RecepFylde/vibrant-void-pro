import { LangProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Brands from "@/components/Brands";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <LangProvider>
      <div className="bg-background min-h-screen">
        <Navbar />
        <Hero />
        <Stats />
        <Services />
        <Projects />
        <Brands />
        <FAQ />
        <Footer />
      </div>
    </LangProvider>
  );
};

export default Index;
