import ScrollReveal from "./ScrollReveal";

const brands = [
  "Google", "Spotify", "Airbnb", "Stripe", "Vercel", "Figma"
];

const Brands = () => {
  return (
    <section className="section-padding border-t border-border">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-center text-muted-foreground text-sm uppercase tracking-[0.3em] font-heading mb-12">
            Güvenilen Markalar
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {brands.map((brand, i) => (
            <ScrollReveal key={brand} delay={i * 0.05}>
              <div className="flex items-center justify-center py-4 text-muted-foreground/40 hover:text-primary transition-colors duration-500 cursor-pointer">
                <span className="font-heading text-xl md:text-2xl font-bold tracking-tight">{brand}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
