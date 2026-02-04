"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface Message {
    role: "user" | "assistant"
    content: string
}

interface PdfFile {
    name: string
    status: "uploading" | "processed" | "error"
}

interface SadaqaContextType {
    messages: Message[]
    addMessage: (msg: Message) => void
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
    pdfs: PdfFile[]
    addPdf: (file: File) => Promise<void>
}

const SadaqaContext = createContext<SadaqaContextType | undefined>(undefined)

export function SadaqaProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [pdfs, setPdfs] = useState<PdfFile[]>([])

    const addMessage = (msg: Message) => {
        setMessages((prev) => [...prev, msg])
    }

    const addPdf = async (file: File) => {
        // Mock upload/processing
        const newPdf: PdfFile = { name: file.name, status: "uploading" }
        setPdfs((prev) => [...prev, newPdf])

        // Simulate processing delay
        setTimeout(() => {
            setPdfs(prev => prev.map(p => p.name === file.name ? { ...p, status: "processed" } : p))
        }, 2000)
    }

    return (
        <SadaqaContext.Provider value={{ messages, addMessage, isLoading, setIsLoading, pdfs, addPdf }}>
            {children}
        </SadaqaContext.Provider>
    )
}

export function useSadaqa() {
    const context = useContext(SadaqaContext)
    if (context === undefined) {
        throw new Error("useSadaqa must be used within a SadaqaProvider")
    }
    return context
}
