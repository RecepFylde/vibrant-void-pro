import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLang, t } from "@/lib/i18n";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { lang } = useLang();

  const faqs = [
    { qKey: "faq.1.q", aKey: "faq.1.a" },
    { qKey: "faq.2.q", aKey: "faq.2.a" },
    { qKey: "faq.3.q", aKey: "faq.3.a" },
    { qKey: "faq.4.q", aKey: "faq.4.a" },
  ];

  return (
    <section id="faq" className="section-padding">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-heading mb-4">{t("faq.label", lang)}</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-16">
            {t("faq.title1", lang)}<br />{t("faq.title2", lang)}<span className="text-primary">.</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="border-t border-border cursor-pointer" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <div className="flex items-center justify-between py-6">
                  <h3 className={`font-heading text-lg md:text-xl font-medium transition-colors duration-300 pr-4 ${openIndex === i ? "text-primary" : "text-foreground"}`}>
                    {t(faq.qKey, lang)}
                  </h3>
                  <div className={`flex-shrink-0 transition-colors duration-300 ${openIndex === i ? "text-primary" : "text-muted-foreground"}`}>
                    {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </div>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="pb-6 text-muted-foreground leading-relaxed">{t(faq.aKey, lang)}</p>
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

export default FAQ;
