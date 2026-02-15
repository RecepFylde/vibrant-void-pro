import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "tr";

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType>({ lang: "en", toggleLang: () => {} });

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  const toggleLang = () => setLang(l => (l === "en" ? "tr" : "en"));
  return <LangContext.Provider value={{ lang, toggleLang }}>{children}</LangContext.Provider>;
};

type Translations = Record<string, { en: string; tr: string }>;

const translations: Translations = {
  // Navbar
  "nav.services": { en: "Services", tr: "Hizmetler" },
  "nav.projects": { en: "Projects", tr: "Projeler" },
  "nav.faq": { en: "FAQ", tr: "SSS" },
  "nav.contact": { en: "Contact", tr: "İletişim" },
  "nav.cta": { en: "Get in Touch", tr: "Bize Ulaşın" },

  // Hero
  "hero.subtitle": { en: "— Web Developer & Designer", tr: "— Web Developer & Designer" },
  "hero.desc": {
    en: "I design modern, high-performance web experiences and create user-focused digital solutions.",
    tr: "Modern ve performanslı web deneyimleri tasarlıyor, kullanıcı odaklı dijital çözümler üretiyorum.",
  },
  "hero.scroll": { en: "SCROLL DOWN • EXPLORE MORE •", tr: "AŞAĞI KAYDIR • KEŞFET •" },

  // Stats
  "stat.projects": { en: "Completed Projects", tr: "Tamamlanan Proje" },
  "stat.experience": { en: "Years of Experience", tr: "Yıllık Deneyim" },
  "stat.clients": { en: "Happy Clients", tr: "Mutlu Müşteri" },
  "stat.satisfaction": { en: "Client Satisfaction", tr: "Müşteri Memnuniyeti" },

  // Services
  "services.label": { en: "— Services", tr: "— Hizmetler" },
  "services.title": { en: "What We Do", tr: "Neler Yapıyorum" },
  "svc.1.title": { en: "Web Development", tr: "Web Geliştirme" },
  "svc.1.desc": {
    en: "Building high-performance web applications with React, Next.js and modern technologies.",
    tr: "React, Next.js ve modern teknolojilerle yüksek performanslı web uygulamaları geliştiriyorum.",
  },
  "svc.2.title": { en: "UI/UX Design", tr: "UI/UX Tasarım" },
  "svc.2.desc": {
    en: "Designing aesthetic and functional interfaces with a user-experience-first approach.",
    tr: "Kullanıcı deneyimini ön planda tutarak, estetik ve fonksiyonel arayüzler tasarlıyorum.",
  },
  "svc.3.title": { en: "E-Commerce Solutions", tr: "E-Ticaret Çözümleri" },
  "svc.3.desc": {
    en: "Building complete e-commerce platforms with payment integrations and admin panels.",
    tr: "Ödeme entegrasyonları ve yönetim panelleri ile eksiksiz e-ticaret platformları kuruyorum.",
  },
  "svc.4.title": { en: "SEO & Performance", tr: "SEO & Performans" },
  "svc.4.desc": {
    en: "Optimizing your website to rank higher in search engines and load blazingly fast.",
    tr: "Web sitenizin arama motorlarında üst sıralara çıkması ve hızlı yüklenmesi için optimizasyon yapıyorum.",
  },

  // Projects
  "projects.label": { en: "— Selected Projects", tr: "— Seçili Projeler" },
  "projects.title": { en: "Recent Works", tr: "Son Çalışmalar" },

  // Brands
  "brands.label": { en: "Trusted By Brands", tr: "Güvenilen Markalar" },

  // FAQ
  "faq.label": { en: "— FAQ", tr: "— SSS" },
  "faq.title1": { en: "Frequently Asked", tr: "Sıkça Sorulan" },
  "faq.title2": { en: "Questions", tr: "Sorular" },
  "faq.1.q": { en: "How long does a project usually take?", tr: "Bir proje genellikle ne kadar sürer?" },
  "faq.1.a": {
    en: "It varies between 2 to 8 weeks depending on the project scope. Simple websites are completed in 2-3 weeks, complex web applications in 6-8 weeks.",
    tr: "Projenin kapsamına bağlı olarak 2 ila 8 hafta arasında değişir. Basit web siteleri 2-3 haftada, karmaşık web uygulamaları 6-8 haftada tamamlanır.",
  },
  "faq.2.q": { en: "How does pricing work?", tr: "Fiyatlandırma nasıl çalışıyor?" },
  "faq.2.a": {
    en: "Every project is unique. After understanding your needs, I provide a detailed proposal. Fixed-price and hourly models are available.",
    tr: "Her proje benzersizdir. İhtiyaçlarınızı dinledikten sonra detaylı bir teklif sunuyorum. Sabit fiyat veya saatlik çalışma modelleri mevcuttur.",
  },
  "faq.3.q": { en: "Which technologies do you work with?", tr: "Hangi teknolojilerle çalışıyorsunuz?" },
  "faq.3.a": {
    en: "I work with React, Next.js, TypeScript, Tailwind CSS, Node.js and modern web technologies. I also use backend solutions like Supabase and Firebase.",
    tr: "React, Next.js, TypeScript, Tailwind CSS, Node.js ve modern web teknolojileriyle çalışıyorum. Supabase ve Firebase gibi backend çözümleri de kullanıyorum.",
  },
  "faq.4.q": { en: "Do you provide post-project support?", tr: "Proje sonrası destek sağlıyor musunuz?" },
  "faq.4.a": {
    en: "Yes, I provide 30 days of free maintenance and support after every project. Long-term maintenance agreements are also available.",
    tr: "Evet, her proje sonrası 30 günlük ücretsiz bakım ve destek sağlıyorum. Uzun vadeli bakım anlaşmaları da sunuyorum.",
  },

  // Footer
  "footer.label": { en: "— Contact", tr: "— İletişim" },
  "footer.title1": { en: "Let's create", tr: "Birlikte harika" },
  "footer.title2": { en: "something ", tr: "bir şeyler " },
  "footer.title3": { en: "amazing.", tr: "yapalım." },
  "footer.cta": { en: "Get in Touch →", tr: "İletişime Geç →" },
  "footer.rights": { en: "© 2025 — All rights reserved.", tr: "© 2025 — Tüm hakları saklıdır." },
};

export const t = (key: string, lang: Lang): string => {
  return translations[key]?.[lang] ?? key;
};
