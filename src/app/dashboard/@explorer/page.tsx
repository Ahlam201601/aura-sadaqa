"use client"

import { useState } from "react"
import { useSadaqa } from "@/components/context/sadaqa-context"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, FileText, Loader2, Search, CheckCircle2, Clock } from "lucide-react"
import { processPdfAction } from "@/actions/vector-action"
import { motion, AnimatePresence } from "framer-motion"

export default function ExplorerPage() {
    const { pdfs, addPdf } = useSadaqa()
    const [isUploading, setIsUploading] = useState(false)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setIsUploading(true)
            await addPdf(file)
            const formData = new FormData()
            formData.append("file", file)
            const result = await processPdfAction(formData)
            if (!result.success) console.error(result.message)
            setIsUploading(false)
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
                {/* Header */}
                <div className="relative z-10 px-6 py-6 border-b border-[#f59e0b]/10 bg-[#020617]/40 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#f59e0b]/10 flex items-center justify-center border border-[#f59e0b]/20">
                            <FileText className="h-5 w-5 text-[#f59e0b]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-serif text-white tracking-wide">Documents</h2>
                            <p className="text-xs text-teal-200/50 uppercase tracking-widest">Base de connaissances</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-6 gap-6 relative z-10">

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#f59e0b]/40" />
                        <Input
                            placeholder="Rechercher..."
                            className="bg-[#020617]/40 border-[#f59e0b]/10 rounded-xl h-12 pl-11 text-white placeholder:text-teal-200/20 focus:border-[#f59e0b]/40 focus:ring-1 focus:ring-[#f59e0b]/40 transition-all hover:bg-[#020617]/50"
                        />
                    </div>

                    {/* Upload Dropzone - Elegant */}
                    <label className="group relative flex flex-col items-center justify-center w-full h-32 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 border border-dashed border-[#f59e0b]/20 hover:border-[#f59e0b]/50 hover:bg-[#f59e0b]/5 bg-[#020617]/20">
                        <div className="flex flex-col items-center justify-center gap-2">
                            {isUploading ? (
                                <Loader2 className="w-8 h-8 text-[#f59e0b] animate-spin" />
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-teal-900/50 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                                    <Upload className="w-5 h-5 text-[#f59e0b]/80" />
                                </div>
                            )}
                            <p className="text-sm text-teal-100/70 group-hover:text-[#f59e0b] transition-colors">Importer PDF ou Excel</p>
                        </div>
                        <Input type="file" accept=".pdf,.xls,.xlsx" className="hidden" onChange={handleUpload} disabled={isUploading} />
                    </label>

                    {/* List */}
                    <div className="flex-1 flex flex-col min-h-0">
                        <h3 className="text-[10px] font-bold text-teal-200/30 uppercase tracking-widest mb-3 pl-1">Fichiers Récents</h3>
                        <ScrollArea className="flex-1 -mx-2 px-2">
                            <div className="space-y-2 pb-4">
                                <AnimatePresence>
                                    {pdfs.map((pdf, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="flex items-center justify-between p-3.5 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl border border-white/5 transition-colors group cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="h-8 w-8 rounded-lg bg-teal-950 flex items-center justify-center shrink-0 border border-white/5">
                                                    <FileText className="h-4 w-4 text-[#f59e0b] group-hover:text-[#f59e0b] transition-colors" />
                                                </div>
                                                <span className="text-sm text-teal-50/90 truncate font-light">{pdf.name}</span>
                                            </div>
                                            {pdf.status === 'processed' ? (
                                                <CheckCircle2 className="h-4 w-4 text-[#f59e0b]/80" />
                                            ) : (
                                                <Clock className="h-4 w-4 text-[#f59e0b]/80 animate-pulse" />
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {pdfs.length === 0 && (
                                    <div className="py-8 text-center">
                                        <p className="text-xs text-teal-200/30 italic">Aucun document.</p>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
