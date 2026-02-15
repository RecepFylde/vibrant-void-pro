import ScrollReveal from "./ScrollReveal";

const stats = [
  { number: "40+", label: "Tamamlanan Proje" },
  { number: "4+", label: "Yıllık Deneyim" },
  { number: "25+", label: "Mutlu Müşteri" },
  { number: "99%", label: "Müşteri Memnuniyeti" },
];

const Stats = () => {
  return (
    <section className="section-padding border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.1}>
            <div className="text-center md:text-left">
              <div className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Stats;
