import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable not set.");
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

app.post("/summarize", async (req, res) => {
  try {

    const { transcript, promptType } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: "Transcript is required." });
    }

    let fullPrompt = "";
    const baseInstruction = `Based on the following meeting transcript:\n\n---\n${transcript}\n---\n\n`;

    switch (promptType) {
      case "detailed":
        fullPrompt = baseInstruction + "Provide a detailed and comprehensive summary. Cover all major topics discussed, including nuances and context. Use headings for different sections. ONLY PLAIN TEXT";
        break;
      case "mom":
        fullPrompt = baseInstruction + "Generate the formal Minutes of the Meeting (MoM). The format should include:\n- **Meeting Title**\n- **Date**\n- **Attendees**\n- **Agenda**\n- **Key Discussion Points** (in bullet points)\n- **Decisions Made**\n- **Action Items** (with assigned owners if mentioned). ONLY PLAIN TEXT";
        break;
      case "email":
        fullPrompt = baseInstruction + "Draft a professional and concise follow-up email to all attendees. The email should summarize the key outcomes, decisions, and action items. Start with a friendly opening and end with a clear call to action or next steps. Use a subject line like 'Meeting Follow-up: [Main Topic]'. ONLY PLAIN TEXT";
        break;
      default: 
        fullPrompt = baseInstruction + "Summarize the key takeaways and action items in a clear, scannable format. Use points for easy reading. ONLY PLAIN TEXT";
    }

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const summary = response.text();
    
    res.json({ summary });
  } catch (error) {
    console.error("Error in /summarize endpoint:", error);
    res.status(500).json({ error: "Failed to generate summary." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running successfully on http://localhost:${PORT}`);
});