"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon, Sparkles, Users, FileText, ArrowRight, Star, Heart, Gift, Calendar } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center relative overflow-hidden text-foreground">

      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/ramadan-blue-gold-bg.png"
          alt="Ramadan Background"
          className="w-full h-full object-cover opacity-25 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] opacity-90" />
      </div>

      {/* Mystical Background Glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-teal-600/20 blur-[120px] rounded-full pointer-events-none opacity-60 mix-blend-screen" />

      {/* Hanging Lantern Lines (Decorative) */}
      <div className="absolute top-0 w-full flex justify-center gap-32 opacity-30 pointer-events-none">
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-primary/50 to-primary/20"></div>
        <div className="w-[1px] h-48 bg-gradient-to-b from-transparent via-primary/50 to-primary/20"></div>
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-primary/50 to-primary/20"></div>
      </div>

      <main className="flex-1 container mx-auto px-6 relative z-10 flex flex-col items-center pt-24 pb-20">

        {/* Centerpiece Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-10 relative"
        >
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <Moon className="h-20 w-20 text-[#f59e0b] drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0"
          >
            <Star className="h-6 w-6 text-[#f59e0b] filled fill-[#f59e0b]" />
          </motion.div>
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-center space-y-6 max-w-3xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tight">
            <span className="block text-white drop-shadow-md">Aura Sadaqa</span>
          </h1>

          <p className="text-xl md:text-2xl text-teal-100/80 font-light font-sans max-w-3xl mx-auto">
            L'excellence caritative par <span className="text-primary font-medium">l'Intelligence Artificielle</span>.
          </p>

          <p className="text-base text-teal-200/60 max-w-xl mx-auto font-light">
            Optimisez vos distributions du Ramadan avec précision, équité et transparence.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/dashboard">
              <Button className="h-14 px-10 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#022c22] text-lg font-medium tracking-wide shadow-[0_0_30px_rgba(251,191,36,0.2)] hover:shadow-[0_0_50px_rgba(251,191,36,0.4)] transition-all transform hover:-translate-y-1">
                Accéder à l'espace
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Feature Cards - Glassmorphic Teal */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {[
            { title: "Analyse Intelligente", icon: Sparkles, text: "Traitement automatique de vos listes de bénéficiaires." },
            { title: "Gestion Sereine", icon: Users, text: "Organisation simplifiée des familles et des dons." },
            { title: "Rapports Précis", icon: FileText, text: "Suivez votre impact avec clarté et transparence." }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (idx * 0.2) }}
              className="p-8 rounded-3xl bg-[#0f393b]/30 backdrop-blur-md border border-white/5 hover:bg-[#0f393b]/50 hover:border-[#f59e0b] transition-all duration-500 group cursor-default"
            >
              <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="h-6 w-6 text-[#f59e0b]/80 group-hover:text-[#f59e0b] transition-colors" />
              </div>
              <h3 className="text-xl font-serif text-white mb-3 group-hover:text-[#f59e0b] transition-colors">{feature.title}</h3>
              <p className="text-teal-100/50 text-sm leading-relaxed">{feature.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Spiritual/Thematic Section */}

        {/* Why Aura Sadaqa? Section (Professional & Thematic) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-32 w-full max-w-5xl"
        >
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif text-white">L'Excellence Technologique au Service du Bien</h2>
            <div className="h-1 w-24 bg-[#f59e0b] mx-auto rounded-full" />
            <p className="text-teal-100/60 max-w-2xl mx-auto">
              Une plateforme conçue pour les associations exigeantes qui souhaitent allier <span className="text-[#f59e0b]">performance digitale</span> et valeurs éthiques.
            </p>
          </div>



        </motion.div>

      </main >

      <footer className="w-full py-8 text-center bg-[#020617]/50 backdrop-blur-sm border-t border-white/5">
        <p className="text-[#f59e0b] text-xs tracking-widest uppercase">Ramadan 2026 &copy; Aura Sadaqa</p>
      </footer>
    </div >
  )
}
