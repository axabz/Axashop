import { motion } from "framer-motion";
import { Ticket, Star, CheckCircle2, MessageSquare, ShieldCheck } from "lucide-react";
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

export default function Vouchers() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="w-full bg-[#030711] min-h-screen pt-32 pb-24">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] left-[5%] w-[25%] h-[25%] bg-blue-500/5 blur-[80px] rounded-full" />
      </div>

      <div className="container relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              <Ticket className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold tracking-widest uppercase text-slate-400">{t.vouchersBadge}</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter">
              {t.vouchersTitle.split(' ')[0]} <span className="gradient-text">{t.vouchersTitle.split(' ')[1]}</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {t.vouchersDesc}
            </p>
          </motion.div>

          {/* Stats Grid (Premium Style) */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { label: t.satisfactionRate, value: "99.9%", icon: <Star className="w-5 h-5 text-yellow-500" /> },
              { label: t.verifiedVouchers, value: "Instant", icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
              { label: t.secureDelivery, value: "100%", icon: <ShieldCheck className="w-5 h-5 text-primary" /> }
            ].map((stat, i) => (
              <div key={i} className="glass-card p-6 rounded-3xl flex items-center gap-4 border-white/[0.05]">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/[0.08]">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Activity Feed */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-primary" />
                {t.liveFeed}
              </h2>
              <div className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                {t.liveUpdates}
              </div>
            </div>

            <div className="grid gap-4">
              {[
                { user: "Alex****", product: "Discord Nitro 1Y", time: "2 mins ago", comment: "Instant delivery as always. Best shop in the game!" },
                { user: "Marc****", product: "Spotify Premium", time: "15 mins ago", comment: "Works perfectly, support was very helpful with my questions." },
                { user: "Sophi****", product: "Roblox Robux", time: "1 hour ago", comment: "Incredible price and very fast service. Highly recommended." },
                { user: "Jaso****", product: "Netflix UHD", time: "3 hours ago", comment: "Legit and reliable. Will buy again for sure." }
              ].map((activity, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.03)" }}
                  className="glass-card p-6 rounded-[2rem] border-white/[0.05] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 border border-white/10 flex items-center justify-center font-bold text-primary">
                      {activity.user[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{activity.user}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-500 font-bold uppercase tracking-tighter">{t.verifiedBuyer}</span>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">{t.purchased} <span className="text-white font-medium">{activity.product}</span></p>
                    </div>
                  </div>
                  
                  <div className="flex-grow md:max-w-md">
                    <p className="text-sm text-slate-300 italic">"{activity.comment}"</p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{activity.time}</span>
                    <div className="flex gap-0.5 mt-1 justify-end">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-yellow-500 text-yellow-500" />)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State / Load More */}
            <div className="pt-12 text-center">
              <button className="px-8 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-slate-400 font-bold hover:bg-white/[0.05] hover:text-white transition-all">
                {t.viewAllTestimonials}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
