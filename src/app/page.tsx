import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="text-center space-y-8 max-w-3xl px-4">
        {/* Logo Ramadan */}
        <div className="flex justify-center mb-8">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 animate-pulse shadow-lg">
            <Moon className="h-16 w-16 fill-orange-500 text-orange-500 rotate-[-25deg]" />
          </div>
        </div>

        {/* Titre */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-orange-600 tracking-tight">
          Aura Sadaqa
        </h1>

        {/* Sous-titre */}
        <p className="text-xl md:text-2xl text-blue-900 font-medium">
          Intelligence Artificielle au service de la bienfaisance
        </p>

        {/* Description */}
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Gérez vos listes de familles et optimisez la distribution de l'aide pendant le Ramadan. 
          Notre IA analyse vos documents pour vous aider à prendre les meilleures décisions.
        </p>

        {/* Bouton principal */}
        <div className="pt-6">
          <Link href="/dashboard">
            <Button 
              size="lg" 
              className="text-lg px-10 py-6 bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Accéder au dashboard
            </Button>
          </Link>
        </div>

        {/* Éléments décoratifs Ramadan */}
        <div className="flex justify-center gap-8 pt-8 opacity-60">
          <div className="h-2 w-16 bg-orange-300 rounded-full"></div>
          <div className="h-2 w-16 bg-blue-300 rounded-full"></div>
          <div className="h-2 w-16 bg-orange-300 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
