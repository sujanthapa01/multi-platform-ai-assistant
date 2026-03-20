import "dotenv/config";
import express from "express";
import cors from "cors";
import { ChatAgent } from "./agent.js";

if (!process.env.OPENROUTER_API_KEY) {
  console.log("❌ OPENROUTER_API_KEY is missing!");
  process.exit(1);
}

console.log(`🤖 Using model: ${process.env.MODEL || "mistralai/mistral-7b-instruct:free"}`);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/agent/status", (req, res) => {
  res.status(200).json({ message: "server is up and running" });
});

app.post("/agent/chat", async (req, res) => {
  const { message } = req.body;

  try {
    if (!message || message === "") {
      return res.status(400).json({     
        message: "message is required",
      });
    }

    console.log(message);

    const result = await ChatAgent(message);

    if (!result) {
      return res.status(500).json({
        message: "no response from agent",
      });
    }

    return res.status(200).json({ message: result });  

  } catch (err) {
    return res.status(500).json({
      message: "internal server error",
      error: err.message,
    });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server is up and running at http://localhost:${PORT}`);
});