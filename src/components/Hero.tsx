import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useLang, t } from "@/lib/i18n";
import profileImg from "@/assets/profile.png";

const Hero = () => {
  const { lang } = useLang();

  return (
    <section className="relative min-h-screen flex flex-col justify-center section-padding pt-32 noise-overlay mesh-gradient overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <ScrollReveal>
          <p className="text-primary font-heading text-sm md:text-base tracking-[0.3em] uppercase mb-6">
            {t("hero.subtitle", lang)}
          </p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <ScrollReveal delay={0.1}>
            <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold leading-[0.9] tracking-tighter text-foreground">
              CREATIVE
              <br />
              <span className="text-primary">DEV</span>ELOPER
            </h1>
          </ScrollReveal>

          {/* Profile image */}
          <ScrollReveal delay={0.2} className="hidden md:block flex-shrink-0">
            <div className="relative">
              <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-border relative">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                  style={{ mixBlendMode: "luminosity" }}
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />
              </div>
              {/* Spinning text around photo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <path id="heroCircle" d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0" />
                  </defs>
                  <text className="fill-muted-foreground text-[10px] uppercase tracking-[0.4em] font-heading">
                    <textPath href="#heroCircle">{t("hero.scroll", lang)}</textPath>
                  </text>
                </svg>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <p className="max-w-md text-muted-foreground text-base md:text-lg leading-relaxed">
              {t("hero.desc", lang)}
            </p>
            {/* Mobile: small profile */}
            <div className="block md:hidden">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-border">
                <img src={profileImg} alt="Profile" className="w-full h-full object-cover object-top grayscale" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default Hero;
