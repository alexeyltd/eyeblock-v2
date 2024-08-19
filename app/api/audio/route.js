import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import Sentiment from "sentiment";
import { sendOpenAi } from "@/libs/gpt"; // Adjust the path as necessary

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    // Parse the form data
    const formData = await req.formData();
    const file = formData.get("file");

    console.log("File uploaded:", file);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Define the uploads directory path
    const uploadsDir = path.join(process.cwd(), "uploads");

    // Ensure the uploads directory exists
    await fs.mkdir(uploadsDir, { recursive: true });

    // Define the path to save the file
    const filePath = path.join(uploadsDir, file.name);

    // Save the file
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    console.log(`File uploaded to: ${filePath}`);

    // Perform transcription using OpenAI
    const transcriptionResponse = await sendOpenAi(
      [
        {
          role: "system",
          content: "You are a transcription service.",
        },
        {
          role: "user",
          content: `Transcribe the following audio file: ${filePath}`,
        },
      ],
      "user-id" // Replace with actual user ID if needed
    );

    const transcription = transcriptionResponse;

    // Perform sentiment analysis
    const sentimentAnalyzer = new Sentiment();
    const sentiment = sentimentAnalyzer.analyze(transcription);

    // Summarize transcription
    const summaryResponse = await sendOpenAi(
      [
        {
          role: "system",
          content: "You are a helpful assistant that provides concise summaries.",
        },
        {
          role: "user",
          content: `Summarize the following transcription:\n\n${transcription}`,
        },
      ],
      "user-id" // Replace with actual user ID if needed
    );

    const summary = summaryResponse;

    console.log("data:", {
      transcription,
      summary,
      sentiment,
    });
    return NextResponse.json(
      {
        transcription,
        summary,
        sentiment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("File upload failed:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}