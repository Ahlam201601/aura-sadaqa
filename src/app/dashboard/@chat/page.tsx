"use client"

import { useState, useRef, useEffect } from "react"
import { useSadaqa } from "@/components/context/sadaqa-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, Send, Bot, User, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { chatAction } from "@/actions/chat-action"

export default function ChatPage() {
    const { messages, addMessage, isLoading, setIsLoading } = useSadaqa()
    const [inputValue, setInputValue] = useState("")
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSend = async () => {
        if (!inputValue.trim()) return
        const userMsg = { role: "user" as const, content: inputValue }
        addMessage(userMsg)
        setInputValue("")
        setIsLoading(true)
        const result = await chatAction(userMsg.content)
        setIsLoading(false)
        if (result.success) {
            addMessage({ role: "assistant", content: result.message || "" })
        } else {
            addMessage({ role: "assistant", content: "Une erreur est survenue." })
        }
    }

    return (
        <div className="h-full flex flex-col p-2">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col bg-[#0f393b]/60 backdrop-blur-xl rounded-[24px] border border-[#f59e0b]/20 shadow-2xl relative overflow-hidden"
            >
                {/* Background Image - Islamic Pattern */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/ramadan-islamic-pattern.png"
                        alt=""
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#0f393b]/90 to-[#020617]" />
                </div>
                {/* Header - Luxury */}
                <div className="relative z-10 px-6 py-6 border-b border-[#f59e0b]/10 bg-[#020617]/40 backdrop-blur-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-md rounded-full animate-pulse-slow" />
                            <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-[#115e59] to-[#042f2e] border border-primary/20 flex items-center justify-center">
                                <Sparkles className="h-5 w-5 text-[#f59e0b]" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-serif text-white tracking-wide">Assistant Aura</h2>
                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
                                <p className="text-xs text-teal-200/50 uppercase tracking-widest">En ligne</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 px-4 py-6 relative z-10">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full opacity-60 mt-10">
                            <Moon className="h-12 w-12 text-[#f59e0b]/50 mb-4" />
                            <p className="text-sm text-teal-200/30 italic">Posez votre question sur les listes...</p>
                        </div>
                    )}

                    <div className="space-y-6 max-w-3xl mx-auto pb-4">
                        <AnimatePresence mode="popLayout">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {msg.role === "assistant" && (
                                        <div className="h-8 w-8 rounded-full bg-teal-900/50 border border-white/5 flex items-center justify-center shrink-0 mt-1">
                                            <Bot className="h-4 w-4 text-[#f59e0b]" />
                                        </div>
                                    )}

                                    <div
                                        className={`relative max-w-[85%] px-5 py-3 shadow-lg text-sm leading-relaxed ${msg.role === "user"
                                            ? "bg-gradient-to-br from-primary to-amber-500 text-[#022c22] rounded-2xl rounded-tr-none font-medium"
                                            : "bg-[#020617]/50 border border-white/5 text-teal-50 rounded-2xl rounded-tl-none backdrop-blur-sm"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>

                                    {msg.role === "user" && (
                                        <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-1">
                                            <User className="h-4 w-4 text-[#f59e0b]" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isLoading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                                <div className="h-8 w-8 rounded-full bg-teal-900/50 border border-white/5 flex items-center justify-center shrink-0">
                                    <Bot className="h-4 w-4 text-[#f59e0b]" />
                                </div>
                                <div className="bg-[#020617]/50 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-[#f59e0b]/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-[#f59e0b]/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-[#f59e0b]/60 rounded-full animate-bounce"></span>
                                </div>
                            </motion.div>
                        )}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 relative z-20 bg-[#020617]/30 backdrop-blur-sm border-t border-[#f59e0b]/10">
                    <form
                        className="relative flex items-center gap-2 max-w-4xl mx-auto"
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSend()
                        }}
                    >
                        <Input
                            placeholder="Message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="bg-[#020617]/60 border-white/10 rounded-full h-14 pl-6 pr-14 text-white placeholder:text-teal-200/20 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner hover:bg-[#020617]/80"
                            disabled={isLoading}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={isLoading || !inputValue.trim()}
                            className="absolute right-2 top-2 h-10 w-10 rounded-full bg-primary hover:bg-amber-500 text-[#022c22] shadow-lg transition-transform active:scale-95"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}
