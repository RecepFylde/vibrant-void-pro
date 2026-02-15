import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLang, t } from "@/lib/i18n";

const Services = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { lang } = useLang();

  const services = [
    { titleKey: "svc.1.title", descKey: "svc.1.desc", tags: ["React", "Next.js", "TypeScript"] },
    { titleKey: "svc.2.title", descKey: "svc.2.desc", tags: ["Figma", "Prototyping", "Design Systems"] },
    { titleKey: "svc.3.title", descKey: "svc.3.desc", tags: ["Shopify", "Stripe", "Custom Solutions"] },
    { titleKey: "svc.4.title", descKey: "svc.4.desc", tags: ["Core Web Vitals", "SEO", "Analytics"] },
  ];

  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-heading mb-4">{t("services.label", lang)}</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-16">
            {t("services.title", lang)}<span className="text-primary">?</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {services.map((service, i) => (
            <ScrollReveal key={service.titleKey} delay={i * 0.05}>
              <div className="border-t border-border group cursor-pointer" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <div className="flex items-center justify-between py-6 md:py-8">
                  <div className="flex items-center gap-4 md:gap-8">
                    <span className="text-muted-foreground text-sm font-heading">0{i + 1}</span>
                    <h3 className={`font-heading text-xl md:text-3xl font-semibold transition-colors duration-300 ${openIndex === i ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                      {t(service.titleKey, lang)}
                    </h3>
                  </div>
                  <div className={`transition-colors duration-300 ${openIndex === i ? "text-primary" : "text-muted-foreground"}`}>
                    {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </div>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <div className="pb-8 pl-8 md:pl-16">
                        <p className="text-muted-foreground max-w-xl mb-4">{t(service.descKey, lang)}</p>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 text-xs font-heading bg-secondary text-secondary-foreground rounded-full border border-border">{tag}</span>
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
