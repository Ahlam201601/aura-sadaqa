"use client"

import { useState, useRef, useEffect } from "react"
import { useSadaqa } from "@/components/context/sadaqa-context"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Moon, Send, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { chatAction } from "@/actions/chat-action"

export default function ChatPage() {
    const { messages, addMessage, isLoading, setIsLoading } = useSadaqa()
    const [inputValue, setInputValue] = useState("")
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const handleSend = async () => {
        if (!inputValue.trim()) return

        const userMsg = { role: "user" as const, content: inputValue }
        addMessage(userMsg)
        setInputValue("")
        setIsLoading(true)

        // Call Server Action
        const result = await chatAction(userMsg.content)

        setIsLoading(false)

        if (result.success) {
            // Simulate streaming (typing effect)
            const fullText = result.message || ""
            let currentText = ""
            const words = fullText.split(" ")

            // Add empty message to create the bubble
            // Note: For a real consistent stream, we'd need a more complex state, 
            // but for this demo, we'll just add the full message after a delay or 
            // implement a local typing effect if we want to be fancy.
            // Let's just add it directly for robustness, since we don't have a stream reader setup.
            addMessage({ role: "assistant", content: fullText })
        } else {
            addMessage({ role: "assistant", content: "Erreur lors de la communication avec l'IA." })
        }
    }

    return (
        <Card className="h-full flex flex-col m-2 border-orange-200 shadow-lg relative overflow-hidden bg-white">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <Moon className="w-64 h-64 text-orange-500" />
            </div>

            <CardHeader className="border-b bg-gradient-to-r from-blue-900 to-blue-800">
                <CardTitle className="flex items-center gap-2 text-white">
                    <Sparkles className="h-5 w-5 text-orange-400" />
                    Assistant Aura
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 p-0 overflow-hidden relative bg-gradient-to-b from-orange-50 to-white">
                <ScrollArea className="h-full p-4">
                    <div className="flex flex-col gap-4">
                        {messages.length === 0 && (
                            <div className="flex h-full flex-col items-center justify-center text-center text-gray-600 p-8 opacity-50 mt-10">
                                <Moon className="h-12 w-12 mb-4 animate-pulse text-orange-500" />
                                <p>Posez une question sur vos listes de bénéficiaires...</p>
                            </div>
                        )}

                        <AnimatePresence>
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-lg px-4 py-2 shadow-sm ${msg.role === "user"
                                                ? "bg-orange-500 text-white rounded-tr-none"
                                                : "bg-white border border-orange-200 text-gray-800 rounded-tl-none"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Loading Indicator (Pulse Crescent) */}
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-start"
                            >
                                <div className="bg-white border border-orange-200 px-4 py-3 rounded-lg rounded-tl-none flex items-center gap-2">
                                    <Moon className="h-4 w-4 text-orange-500 animate-spin" />
                                    <span className="text-xs text-gray-600">Analyse en cours...</span>
                                </div>
                            </motion.div>
                        )}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>
            </CardContent>

            <CardFooter className="p-4 border-t bg-gradient-to-r from-orange-50 to-amber-50">
                <form
                    className="flex w-full items-center gap-2"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSend()
                    }}
                >
                    <Input
                        placeholder="Rechercher une famille, un besoin..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-1 border-orange-200 focus:border-orange-400"
                        disabled={isLoading}
                    />
                    <Button 
                        type="submit" 
                        size="icon" 
                        disabled={isLoading || !inputValue.trim()}
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Envoyer</span>
                    </Button>
                </form>
            </CardFooter>
        </Card>
    )
}
