import { useState } from "react";
import { LangProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Brands from "@/components/Brands";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <LangProvider>
      <div className="bg-background min-h-screen">
        <Navbar onContactClick={() => setContactOpen(true)} />
        <Hero />
        <Stats />
        <Services />
        <Projects />
        <Brands />
        <FAQ />
        <Footer onContactClick={() => setContactOpen(true)} />
        <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
      </div>
    </LangProvider>
  );
};

export default Index;
