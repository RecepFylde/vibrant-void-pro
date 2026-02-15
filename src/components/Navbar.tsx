import { motion } from "framer-motion";

const Navbar = () => {
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
        <a href="#services" className="hover:text-primary transition-colors duration-300">Hizmetler</a>
        <a href="#works" className="hover:text-primary transition-colors duration-300">Projeler</a>
        <a href="#faq" className="hover:text-primary transition-colors duration-300">SSS</a>
        <a href="#contact" className="hover:text-primary transition-colors duration-300">İletişim</a>
      </div>
      <a
        href="#contact"
        className="px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
      >
        Bize Ulaşın
      </a>
    </motion.nav>
  );
};

export default Navbar;
