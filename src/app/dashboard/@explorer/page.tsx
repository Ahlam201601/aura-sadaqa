"use client"

import { useState } from "react"
import { useSadaqa } from "@/components/context/sadaqa-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, FileText, Loader2 } from "lucide-react"
import { processPdfAction } from "@/actions/vector-action"

export default function ExplorerPage() {
    const { pdfs, addPdf } = useSadaqa()
    const [isUploading, setIsUploading] = useState(false)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setIsUploading(true)

            // 1. Add to context (optimistic UI)
            await addPdf(file)

            // 2. Send to Server Action
            const formData = new FormData()
            formData.append("file", file)
            const result = await processPdfAction(formData)

            if (!result.success) {
                console.error(result.message)
                // Handle error state in context if needed
            }

            setIsUploading(false)
        }
    }

    return (
        <Card className="h-full flex flex-col m-2 border-dashed border-2 border-orange-200 bg-white shadow-md">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                <CardTitle className="flex items-center gap-2 text-blue-900">
                    <FileText className="h-5 w-5 text-orange-500" />
                    Explorateur de Documents
                </CardTitle>
                <CardDescription className="text-gray-600">
                    Mettez en ligne les listes de familles et inventaires (PDF).
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden p-4">
                {/* Upload Area */}
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-orange-300 border-dashed rounded-lg cursor-pointer bg-orange-50 hover:bg-orange-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {isUploading ? (
                                <Loader2 className="w-8 h-8 mb-4 text-orange-500 animate-spin" />
                            ) : (
                                <Upload className="w-8 h-8 mb-4 text-orange-500" />
                            )}
                            <p className="mb-2 text-sm text-gray-700"><span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez</p>
                            <p className="text-xs text-gray-600">PDF (MAX. 5MB)</p>
                        </div>
                        <Input id="dropzone-file" type="file" accept=".pdf" className="hidden" onChange={handleUpload} disabled={isUploading} />
                    </label>
                </div>

                {/* File List */}
                <div className="font-semibold text-sm text-blue-900 mt-2">Fichiers traités</div>
                <ScrollArea className="flex-1 pr-4">
                    <div className="grid grid-cols-1 gap-2">
                        {pdfs.map((pdf, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-md border border-orange-200">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <FileText className="h-4 w-4 shrink-0 text-orange-500" />
                                    <span className="text-sm truncate text-gray-700">{pdf.name}</span>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${pdf.status === 'processed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {pdf.status === 'processed' ? 'Traité' : 'En cours...'}
                                </span>
                            </div>
                        ))}

                        {/* Mock Data for demo if empty */}
                        {pdfs.length === 0 && (
                            <>
                                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-md border border-orange-200 opacity-60">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-orange-500" />
                                        <span className="text-sm text-gray-700">familles_quartier_nord.pdf</span>
                                    </div>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">Exemple</span>
                                </div>
                            </>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
