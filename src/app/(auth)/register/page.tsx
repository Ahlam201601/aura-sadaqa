"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/lib/validators/form-schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSadaqa } from "@/components/context/sadaqa-context"
import { useRouter } from "next/navigation"
import { z } from "zod"

export default function RegisterPage() {
    const { login } = useSadaqa()
    const router = useRouter()

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = (data: z.infer<typeof registerSchema>) => {
        // Mock registration -> auto login
        login(data.username, data.email)
        router.push("/dashboard")
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Inscription</CardTitle>
                <CardDescription>Rejoignez Aura Sadaqa pour gérer vos actions de bienfaisance.</CardDescription>
            </CardHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Nom d'utilisateur</label>
                        <Input {...form.register("username")} placeholder="Votre nom" />
                        {form.formState.errors.username && (
                            <p className="text-xs text-red-500">{form.formState.errors.username.message}</p>
                        )}
                    </div>
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
                    <Button type="submit" className="w-full">S'inscrire</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
