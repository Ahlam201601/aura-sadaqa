"use client"

import Link from "next/link"
import { Moon } from "lucide-react"
import { useSadaqa } from "@/components/context/sadaqa-context"
import { Button } from "@/components/ui/button"

export function Navbar() {
    const { user, logout } = useSadaqa()

    return (
        <nav className="border-b bg-card text-card-foreground">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                        <Moon className="h-5 w-5 fill-primary text-primary rotate-[-25deg]" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-primary">
                        Aura Sadaqa
                    </span>
                </Link>

                {/* Auth Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <span className="text-sm font-medium">Hello, {user.name}</span>
                            <Button variant="ghost" onClick={logout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost">Se connecter</Button>
                            </Link>
                            <Link href="/register">
                                <Button>Register</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
