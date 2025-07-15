import { GoogleGenAI } from "@google/genai";
import { env } from "../env.ts";

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

const model = "gemini-2.5-flash";

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const { text } = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: "Transcreva o áudio em português do Brasil. Seja preciso e natural na transcrição. Mantenha a pontuação adequada e divida o texto em parágrafos quando for adequado.",
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  });
  if (!text) {
    throw new Error("No text generated");
  }

  return text;
}

export async function generateEmbeddings(text: string) {
  const { embeddings } = await gemini.models.embedContent({
    model: "text-embedding-004",
    contents: [
      {
        text,
      },
    ],
    config: {
      taskType: "RETRIEVAL_DOCUMENT",
    },
  });

  if (!embeddings?.[0].values) {
    throw new Error("No embeddings generated");
  }

  return embeddings[0].values;
}

export async function generateAnswer(
  question: string,
  transcriptions: string[]
) {
  const context = transcriptions.join("\n\n");
  const prompt = `
    Com base no texto fornecido abaixo como contexto, responsa a pergunta de forma clara e precisa em português do Brasil.
    
    CONTEXTO: ${context}

    PERGUNTA: ${question}

    INSTRUÇÕES:
    - Utilize apenas informações contidas no contexto enviado;
    - Se a resposta não for encontrada no contexto, apenas responda que não possui informações suficientes para responder;
    - Seja objetivo;
    - Mantenha um tom educado e profissional;
    - Cite trechos relevantes do contexto se apropriado;
    - Se for citar o contexto, utilize o termo "conteúdo da aula";
  `.trim();

  const { text } = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  });

  if (!text) {
    throw new Error("No text generated");
  }

  return text;
}
