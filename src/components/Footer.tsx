import ScrollReveal from "./ScrollReveal";
import { useLang, t } from "@/lib/i18n";

const Footer = () => {
  const { lang } = useLang();

  return (
    <footer id="contact" className="section-padding border-t border-border">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 mb-16">
            <div>
              <p className="text-primary text-sm tracking-[0.3em] uppercase font-heading mb-4">{t("footer.label", lang)}</p>
              <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                {t("footer.title1", lang)}<br />
                {t("footer.title2", lang)}<span className="text-primary">{t("footer.title3", lang)}</span>
              </h2>
            </div>
            <a href="mailto:hello@example.com" className="px-8 py-4 bg-primary text-primary-foreground font-heading font-semibold rounded-full hover:opacity-90 transition-opacity text-lg neon-glow">
              {t("footer.cta", lang)}
            </a>
          </div>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">{t("footer.rights", lang)}</p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-primary transition-colors">Dribbble</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
