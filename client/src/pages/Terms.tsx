import { motion } from "framer-motion";
import { FileText, Shield, Scale, AlertCircle, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "circOut" as const }
  }
};

export default function Terms() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="w-full bg-[#030711] min-h-screen pt-32 pb-24">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              <Scale className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Legal Framework</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter">
              {t.termsTitle.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{t.termsTitle.split(' ').slice(-1)}</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Our commitment to transparency and security. Please review our guidelines to ensure a seamless experience on AXASHOP.
            </p>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-12">
            {[
              {
                icon: <Shield className="w-6 h-6 text-primary" />,
                title: "Refund Policy",
                content: "All digital products are non-refundable once delivered. We guarantee 100% security and authenticity of all products. In the rare event of a technical failure on our side, a full replacement or credit will be issued.",
                items: []
              },
              {
                icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
                title: "Our Guarantees",
                content: "We stand behind every asset sold on our platform with the following commitments:",
                items: [
                  "100% authentic and verified digital products",
                  "Instant automated delivery system",
                  "End-to-end encrypted secure transactions",
                  "24/7 Dedicated premium customer support",
                  "Full replacement guarantee on failed deliveries"
                ]
              },
              {
                icon: <AlertCircle className="w-6 h-6 text-yellow-500" />,
                title: "Usage Rules",
                content: "By purchasing from AXASHOP, you agree to adhere to our professional usage standards:",
                items: [
                  "Products are for personal, non-commercial use only",
                  "Reselling or redistribution of assets is strictly prohibited",
                  "Compliance with all local and international digital laws",
                  "No attempts to reverse-engineer or compromise platform security",
                  "Immediate reporting of any suspicious activity or vulnerabilities"
                ]
              },
              {
                icon: <FileText className="w-6 h-6 text-blue-400" />,
                title: "Account Security",
                content: "Security is a shared responsibility. You are responsible for maintaining the confidentiality of your account credentials. AXASHOP employs advanced security measures but is not liable for unauthorized access due to user-side negligence or weak credentials.",
                items: []
              }
            ].map((section, i) => (
              <motion.section 
                key={i} 
                variants={itemVariants}
                className="glass-card p-8 lg:p-12 rounded-[2.5rem] border-white/[0.05] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-all duration-700" />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold">{section.title}</h2>
                </div>

                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed text-lg">
                    {section.content}
                  </p>

                  {section.items.length > 0 && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="text-sm text-slate-300 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.section>
            ))}
          </div>

          {/* Footer Note */}
          <motion.div variants={itemVariants} className="mt-20 text-center">
            <p className="text-slate-500 text-sm">
              {t.termsLastUpdated}. For any legal inquiries, please contact our compliance team.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
