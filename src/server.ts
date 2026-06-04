import express from "express";
import cors from "cors";
import { taraAgent } from "./mastra/agents/tara-agent";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        error: "question is required",
      });
    }

    const result = await taraAgent.generate(question);

    res.json({
      answer: result.text,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "tara-finance-agent",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});