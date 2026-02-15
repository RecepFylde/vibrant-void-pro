import ScrollReveal from "./ScrollReveal";
import { useLang, t } from "@/lib/i18n";

const Stats = () => {
  const { lang } = useLang();

  const stats = [
    { number: "40+", labelKey: "stat.projects" },
    { number: "4+", labelKey: "stat.experience" },
    { number: "25+", labelKey: "stat.clients" },
    { number: "99%", labelKey: "stat.satisfaction" },
  ];

  return (
    <section className="section-padding border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.labelKey} delay={i * 0.1}>
            <div className="text-center md:text-left">
              <div className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-2">{stat.number}</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wider">{t(stat.labelKey, lang)}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Stats;
