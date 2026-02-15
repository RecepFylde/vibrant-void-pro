import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "Bir proje genellikle ne kadar sürer?",
    a: "Projenin kapsamına bağlı olarak 2 ila 8 hafta arasında değişir. Basit web siteleri 2-3 haftada, karmaşık web uygulamaları 6-8 haftada tamamlanır.",
  },
  {
    q: "Fiyatlandırma nasıl çalışıyor?",
    a: "Her proje benzersizdir. İhtiyaçlarınızı dinledikten sonra detaylı bir teklif sunuyorum. Sabit fiyat veya saatlik çalışma modelleri mevcuttur.",
  },
  {
    q: "Hangi teknolojilerle çalışıyorsunuz?",
    a: "React, Next.js, TypeScript, Tailwind CSS, Node.js ve modern web teknolojileriyle çalışıyorum. Supabase ve Firebase gibi backend çözümleri de kullanıyorum.",
  },
  {
    q: "Proje sonrası destek sağlıyor musunuz?",
    a: "Evet, her proje sonrası 30 günlük ücretsiz bakım ve destek sağlıyorum. Uzun vadeli bakım anlaşmaları da sunuyorum.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-heading mb-4">— SSS</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-16">
            Sıkça Sorulan<br />Sorular<span className="text-primary">.</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div
                className="border-t border-border cursor-pointer"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center justify-between py-6">
                  <h3
                    className={`font-heading text-lg md:text-xl font-medium transition-colors duration-300 pr-4 ${
                      openIndex === i ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {faq.q}
                  </h3>
                  <div className={`flex-shrink-0 transition-colors duration-300 ${openIndex === i ? "text-primary" : "text-muted-foreground"}`}>
                    {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </div>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-muted-foreground leading-relaxed">{faq.a}</p>
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
