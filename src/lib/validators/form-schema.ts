import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

export const registerSchema = z.object({
    username: z.string().min(2, "Le nom d'utilisateur doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

export const chatSchema = z.object({
    message: z.string().min(1, "Le message ne peut pas être vide"),
})
