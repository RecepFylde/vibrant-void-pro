import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useLang, t } from "@/lib/i18n";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  { num: "01", title: "Dashboard Analytics", category: "Web App", image: project1 },
  { num: "02", title: "Mobile Commerce", category: "Mobile App", image: project2 },
  { num: "03", title: "Creative Portfolio", category: "Website", image: project3 },
];

const Projects = () => {
  const { lang } = useLang();

  return (
    <section id="works" className="section-padding bg-card">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-heading mb-4">{t("projects.label", lang)}</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-16">
            {t("projects.title", lang)}<span className="text-primary">.</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-16">
          {projects.map((project, i) => (
            <ScrollReveal key={project.num} delay={i * 0.1}>
              <motion.div className="group relative cursor-pointer" whileHover={{ scale: 1.005 }} transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <div className="relative overflow-hidden rounded-lg aspect-[16/9]">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 brightness-50 group-hover:brightness-75 contrast-125 group-hover:contrast-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-background/10 to-transparent group-hover:from-background/20 group-hover:via-background/5 transition-all duration-700" />
                  <div className="absolute top-6 left-6 font-heading text-7xl md:text-9xl font-bold text-foreground/40 group-hover:text-primary/50 transition-colors duration-500">{project.num}</div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-primary text-xs uppercase tracking-widest mb-2 font-heading">{project.category}</p>
                        <h3 className="font-heading text-2xl md:text-4xl font-bold text-foreground">{project.title}</h3>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-foreground/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                        <svg className="w-5 h-5 text-foreground group-hover:text-primary-foreground transition-colors -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
