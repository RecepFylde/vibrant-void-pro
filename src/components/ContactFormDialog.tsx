import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { toast } from "sonner";

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const industries = [
  { en: "E-Commerce", tr: "E-Ticaret" },
  { en: "Technology / SaaS", tr: "Teknoloji / SaaS" },
  { en: "Healthcare", tr: "Sağlık" },
  { en: "Education", tr: "Eğitim" },
  { en: "Finance", tr: "Finans" },
  { en: "Real Estate", tr: "Gayrimenkul" },
  { en: "Food & Beverage", tr: "Yiyecek & İçecek" },
  { en: "Fashion & Beauty", tr: "Moda & Güzellik" },
  { en: "Travel & Tourism", tr: "Seyahat & Turizm" },
  { en: "Other", tr: "Diğer" },
];

const budgetRanges = [
  { en: "$1K - $5K", tr: "₺30K - ₺150K" },
  { en: "$5K - $15K", tr: "₺150K - ₺450K" },
  { en: "$15K - $50K", tr: "₺450K - ₺1.5M" },
  { en: "$50K+", tr: "₺1.5M+" },
];

const ContactFormDialog = ({ open, onOpenChange }: ContactFormDialogProps) => {
  const { lang } = useLang();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    budget: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // Send form data to backend API endpoint
      const response = await fetch("https://formspree.io/f/mojnbpry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          industry: form.industry,
          budget: form.budget,
          message: form.message,
        }),
      });

      if (response.ok) {
        toast.success(
          lang === "en"
            ? "Message sent successfully! We'll contact you soon."
            : "Mesaj başarıyla gönderildi! Yakında sizinle iletişime geçeceğiz."
        );
        setForm({ name: "", email: "", company: "", industry: "", budget: "", message: "" });
        onOpenChange(false);
      } else {
        toast.error(
          lang === "en"
            ? "Failed to send message. Please try again."
            : "Mesaj gönderilemedi. Lütfen tekrar deneyin."
        );
      }
    } catch (error) {
      console.error("Error sending form:", error);
      toast.error(
        lang === "en"
          ? "An error occurred. Please try again."
          : "Bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-0">
                <div>
                  <p className="text-primary text-xs tracking-[0.3em] uppercase font-heading">
                    {lang === "en" ? "— Get in Touch" : "— İletişime Geç"}
                  </p>
                  <h3 className="font-heading text-2xl font-bold text-foreground mt-1">
                    {lang === "en" ? "Start a Project" : "Proje Başlat"}
                  </h3>
                </div>
                <button
                  onClick={() => onOpenChange(false)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider font-heading mb-1.5 block">
                      {lang === "en" ? "Full Name" : "Ad Soyad"} *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder={lang === "en" ? "John Doe" : "Adınız Soyadınız"}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider font-heading mb-1.5 block">
                      {lang === "en" ? "Email" : "E-posta"} *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="hello@company.com"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider font-heading mb-1.5 block">
                    {lang === "en" ? "Company Name" : "Şirket Adı"} *
                  </label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    required
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder={lang === "en" ? "Acme Inc." : "Şirket Adınız"}
                  />
                </div>

                {/* Industry & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider font-heading mb-1.5 block">
                      {lang === "en" ? "Industry" : "Sektör"} *
                    </label>
                    <select
                      name="industry"
                      value={form.industry}
                      onChange={handleChange}
                      required
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        {lang === "en" ? "Select industry" : "Sektör seçin"}
                      </option>
                      {industries.map(ind => (
                        <option key={ind.en} value={ind.en}>
                          {lang === "en" ? ind.en : ind.tr}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider font-heading mb-1.5 block">
                      {lang === "en" ? "Budget Range" : "Bütçe Aralığı"}
                    </label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        {lang === "en" ? "Select budget" : "Bütçe seçin"}
                      </option>
                      {budgetRanges.map(b => (
                        <option key={b.en} value={b.en}>
                          {lang === "en" ? b.en : b.tr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider font-heading mb-1.5 block">
                    {lang === "en" ? "Project Details" : "Proje Detayları"} *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder={
                      lang === "en"
                        ? "Tell us about your project, goals, and timeline..."
                        : "Projeniz, hedefleriniz ve zaman çizelgeniz hakkında bilgi verin..."
                    }
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 bg-primary text-primary-foreground font-heading font-semibold rounded-full hover:opacity-90 transition-all text-sm flex items-center justify-center gap-2 neon-glow disabled:opacity-50"
                >
                  {sending ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Send size={16} />
                      {lang === "en" ? "Send Message" : "Mesaj Gönder"}
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactFormDialog;
