"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/lib/validators/form-schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSadaqa } from "@/components/context/sadaqa-context"
import { useRouter } from "next/navigation"
import { z } from "zod"

export default function LoginPage() {
    const { login } = useSadaqa()
    const router = useRouter()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        // Mock login
        login("User", data.email)
        router.push("/dashboard")
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Connexion</CardTitle>
                <CardDescription>Entrez vos identifiants pour accéder à votre espace.</CardDescription>
            </CardHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input {...form.register("email")} placeholder="email@example.com" />
                        {form.formState.errors.email && (
                            <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Mot de passe</label>
                        <Input {...form.register("password")} type="password" />
                        {form.formState.errors.password && (
                            <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">Se connecter</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
