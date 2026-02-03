import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/20">
      <div className="text-center space-y-6 max-w-2xl px-4">
        <div className="flex justify-center mb-6">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 animate-pulse">
            <Moon className="h-12 w-12 fill-primary text-primary rotate-[-25deg]" />
          </div>
        </div>

        <h1 className="text-4xl font-extrabold tracking-in-expand text-primary sm:text-6xl">
          Aura Sadaqa
        </h1>

        <p className="text-xl text-muted-foreground">
          Intelligence Artificielle au service de la bienfaisance.
          Gérez vos listes de familles et optimisez la distribution de l'aide pendant le Ramadan.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          <Link href="/login">
            <Button size="lg" className="text-lg px-8">Commencer</Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="text-lg px-8">En savoir plus</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
