import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center section-padding pt-32 noise-overlay mesh-gradient overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <ScrollReveal>
          <p className="text-primary font-heading text-sm md:text-base tracking-[0.3em] uppercase mb-6">
            — Web Developer & Designer
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold leading-[0.9] tracking-tighter text-foreground">
            CREATIVE
            <br />
            <span className="text-primary">DEV</span>ELOPER
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <p className="max-w-md text-muted-foreground text-base md:text-lg leading-relaxed">
              Modern ve performanslı web deneyimleri tasarlıyor, 
              kullanıcı odaklı dijital çözümler üretiyorum.
            </p>
            <div className="relative">
              {/* Spinning text */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-28 h-28 md:w-32 md:h-32"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    />
                  </defs>
                  <text className="fill-muted-foreground text-[9px] uppercase tracking-[0.35em] font-heading">
                    <textPath href="#circlePath">
                      SCROLL DOWN • EXPLORE MORE •
                    </textPath>
                  </text>
                </svg>
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary neon-glow" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default Hero;
