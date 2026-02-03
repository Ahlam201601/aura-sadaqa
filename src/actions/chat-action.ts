"use server"

import { Pinecone } from "@pinecone-database/pinecone"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

export async function chatAction(message: string) {
    try {
        // 1. Generate embedding for query
        // 1. Generate embedding for query
        const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
        const result = await model.embedContent(message);
        console.log("DEBUG: Chat Embedding generated");
        const embedding = Array.from(result.embedding.values);

        // 2. Query Pinecone
        const index = pinecone.index(process.env.PINECONE_INDEX || "aura-sadaqa")
        console.log("DEBUG: Querying Pinecone index");
        const queryResponse = await index.query({
            vector: embedding,
            topK: 3,
            includeMetadata: true
        })
        console.log("DEBUG: Pinecone Query Matches:", queryResponse.matches.length);

        // 3. Construct Context
        const context = queryResponse.matches.map(match => match.metadata?.text).join("\n\n")

        // 4. Generate Answer with Gemini
        console.log("DEBUG: Generating answer with Gemini 2.5 Flash");
        const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `Context:\n${context}\n\nQuestion: ${message}\n\nAnswer based on context:`

        // Note: Streaming not implemented in this simple action, returning full text.
        // In real app, use streamText from AI SDK or manually handle streams.
        const chatResult = await chatModel.generateContent(prompt);
        console.log("DEBUG: Answer generated");
        const response = chatResult.response.text();

        return { success: true, message: response }
    } catch (error: any) {
        console.error("DEBUG: Chat Action Error Detail:", JSON.stringify(error, null, 2))
        console.error("Chat Action Error:", error)
        // Return a fallback mock response if API fails (common in dev without keys)
        return { success: true, message: "Je suis désolé, je n'ai pas pu accéder à la base de connaissances. (Vérifiez les clés API)" }
    }
}
