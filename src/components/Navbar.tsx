import { motion } from "framer-motion";
import { useLang, t } from "@/lib/i18n";

const Navbar = () => {
  const { lang, toggleLang } = useLang();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 py-5 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="font-heading text-xl font-bold tracking-tight text-foreground">
        AK<span className="text-primary">.</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        <a href="#services" className="hover:text-primary transition-colors duration-300">{t("nav.services", lang)}</a>
        <a href="#works" className="hover:text-primary transition-colors duration-300">{t("nav.projects", lang)}</a>
        <a href="#faq" className="hover:text-primary transition-colors duration-300">{t("nav.faq", lang)}</a>
        <a href="#contact" className="hover:text-primary transition-colors duration-300">{t("nav.contact", lang)}</a>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleLang}
          className="px-3 py-1.5 text-xs font-heading font-bold border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-300 uppercase tracking-wider"
        >
          {lang === "en" ? "TR" : "EN"}
        </button>
        <a
          href="#contact"
          className="px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
        >
          {t("nav.cta", lang)}
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
