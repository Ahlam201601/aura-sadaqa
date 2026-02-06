"use server"

import { Pinecone } from "@pinecone-database/pinecone"
import { GoogleGenerativeAI } from "@google/generative-ai"
const pdf = require("pdf-parse-new");
import * as xlsx from "xlsx";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

export async function processPdfAction(formData: FormData) {
    try {
        const file = formData.get("file") as File
        if (!file) throw new Error("No file uploaded")

        let text = "";

        if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
            const arrayBuffer = await file.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            const data = await pdf(buffer)
            text = data.text
        } else if (
            file.type === "application/vnd.ms-excel" ||
            file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            file.name.endsWith(".xls") ||
            file.name.endsWith(".xlsx")
        ) {
            const arrayBuffer = await file.arrayBuffer()
            const workbook = xlsx.read(arrayBuffer, { type: 'array' });

            // Iterate over all sheets
            workbook.SheetNames.forEach((sheetName: string) => {
                const sheet = workbook.Sheets[sheetName];
                const jsonData = xlsx.utils.sheet_to_json(sheet);
                text += `Sheet: ${sheetName}\n`;
                jsonData.forEach((row: any) => {
                    text += JSON.stringify(row) + "\n";
                });
            });
        } else {
            throw new Error("Unsupported file type")
        }

        // Mock text for demo purposes if PDF parsing setup is complex in this environment
        // const text = `Family Name: Mock Family. Aid Type: Food Basket. Neighborhood: Downtown.`

        // Generate Embedding
        // Generate Embedding
        const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
        const result = await model.embedContent(text);
        if (!result.embedding || !result.embedding.values) {
            throw new Error("Failed to generate embedding")
        }
        // Ensure it is a plain number array to satisfy Pinecone validator
        const embedding = Array.from(result.embedding.values);

        // Store in Pinecone
        const index = pinecone.index(process.env.PINECONE_INDEX || "aura-sadaqa")

        // Use 'as any' to bypass potential version mismatch in types for the quick fix
        // In production, strictly type with PineconeRecord
        await index.upsert({
            records: [{
                id: `${file.name}-${Date.now()}`,
                values: embedding,
                metadata: {
                    filename: file.name,
                    text: text
                }
            }] as any
        })

        return { success: true, message: "PDF processed and vectors stored." }
    } catch (error: any) {
        console.error("Vector Action Error:", error)
        return { success: false, message: error.message }
    }
}
