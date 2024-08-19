import { OpenAI } from "openai";
import fs from "fs";
import Sentiment from "sentiment";

const openai = new OpenAI({
  apiKey: "sk-proj-3n6RI7zkX6RbujjlExncT3BlbkFJyZP0MgnmcT5Gx7y10RnX",
});

export async function transcribeAudio(filePath) {
  // Implement transcription logic using OpenAI's Whisper
  try {
    const response = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: fs.createReadStream(filePath),
      response_format: "text",
    });
    return response.text;
  } catch (error) {
    console.error("Error in transcription:", error);
    throw new Error("Transcription failed");
  }
}

export async function summarizeText(text) {
  // Implement summarization logic using GPT-4
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Summarize the following text in Greek." },
        { role: "user", content: text },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error in summarization:", error);
    throw new Error("Summarization failed");
  }
}

export function analyzeSentiment(text) {
  const sentiment = new Sentiment(); // Initialize the sentiment analyzer
  const result = sentiment.analyze(text);
  
  // Map the sentiment result to a format similar to VADER
  return {
    positive: result.comparative > 0 ? result.comparative : 0,
    negative: result.comparative < 0 ? Math.abs(result.comparative) : 0,
    neutral: result.comparative === 0 ? 1 : 0,
    score: result.score, // Overall sentiment score
  };
}
