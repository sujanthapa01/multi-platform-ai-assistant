import express from "express";
import cors from "cors";
import multer from "multer";

import { runAgent } from "./agent/agent.js";
import { visionWithOllama } from "./services/ollama.js";
import { sendMail } from "./services/nodemailer.js";

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

//////////////////////////////////////////////////////
// CHAT (MULTI-SKILL)
//////////////////////////////////////////////////////

app.post("/api/chat", async (req, res) => {
  const { message, mode } = req.body;

  console.log("📩 Received:", message, "Mode:", mode);

  try {
    // 🔥 Pass mode to agent
    const data = await runAgent(message, mode);

    console.log("📤 Sending:", data);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.log("❌ SERVER ERROR:", err.message);

    res.status(500).json({
      success: false,
      data: {
        type: "response",
        blocks: [
          { type: "text", text: "Server error occurred" },
        ],
      },
    });
  }
});

//////////////////////////////////////////////////////
// IMAGE
//////////////////////////////////////////////////////

app.post("/api/image", upload.single("image"), async (req, res) => {
  try {
    const result = await visionWithOllama(
      "Analyze this image",
      req.file.path
    );

    res.json({
      success: true,
      data: {
        type: "response",
        blocks: [{ type: "text", text: result }],
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//////////////////////////////////////////////////////
// EMAIL TEMPLATE (OPTIONAL - you can remove later)
//////////////////////////////////////////////////////

app.post("/api/email-template", async (req, res) => {
  const { topic, date, email } = req.body;

  try {
    const prompt = `
Email Details:
Topic: ${topic}
Date: ${date}
Recipient: ${email}
`;

    //  Force email skill
    const data = await runAgent(prompt, "email");

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: "Failed to generate email",
    });
  }
});

//////////////////////////////////////////////////////
// SEND EMAIL
//////////////////////////////////////////////////////

app.post("/api/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const html = `
      <div style="font-family: Arial; line-height: 1.6;">
        ${message.replace(/\n/g, "<br/>")}
      </div>
    `;

    await sendMail({
      to,
      subject,
      html,
    });

    res.json({ success: true });
  } catch (err) {
    console.log("EMAIL ERROR:", err.message);

    res.status(500).json({ error: "Email failed" });
  }
});

//////////////////////////////////////////////////////

app.listen(8080, "0.0.0.0", () => {
  console.log("🚀 Backend running on http://localhost:8080");
});