import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    title: "Web Geliştirme",
    description: "React, Next.js ve modern teknolojilerle yüksek performanslı web uygulamaları geliştiriyorum.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "UI/UX Tasarım",
    description: "Kullanıcı deneyimini ön planda tutarak, estetik ve fonksiyonel arayüzler tasarlıyorum.",
    tags: ["Figma", "Prototyping", "Design Systems"],
  },
  {
    title: "E-Ticaret Çözümleri",
    description: "Ödeme entegrasyonları ve yönetim panelleri ile eksiksiz e-ticaret platformları kuruyorum.",
    tags: ["Shopify", "Stripe", "Custom Solutions"],
  },
  {
    title: "SEO & Performans",
    description: "Web sitenizin arama motorlarında üst sıralara çıkması ve hızlı yüklenmesi için optimizasyon yapıyorum.",
    tags: ["Core Web Vitals", "SEO", "Analytics"],
  },
];

const Services = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-heading mb-4">— Hizmetler</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-16">
            Neler Yapıyorum<span className="text-primary">?</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.05}>
              <div
                className="border-t border-border group cursor-pointer"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center justify-between py-6 md:py-8">
                  <div className="flex items-center gap-4 md:gap-8">
                    <span className="text-muted-foreground text-sm font-heading">
                      0{i + 1}
                    </span>
                    <h3
                      className={`font-heading text-xl md:text-3xl font-semibold transition-colors duration-300 ${
                        openIndex === i ? "text-primary" : "text-foreground group-hover:text-primary"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <div className={`transition-colors duration-300 ${openIndex === i ? "text-primary" : "text-muted-foreground"}`}>
                    {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </div>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-8 md:pl-16">
                        <p className="text-muted-foreground max-w-xl mb-4">{service.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 text-xs font-heading bg-secondary text-secondary-foreground rounded-full border border-border">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default Services;
