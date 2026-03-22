import { chatWithOllama } from "../services/ollama.js";
import { prompts } from "./systemprompt.js";
import { detectSkill } from "../utils/detectskill.js";


function safeParseJSON(text) {
  try {
    return JSON.parse(text);
  } catch (err) {
    console.log("JSON PARSE ERROR:", text);

    return {
      type: "response",
      blocks: [
        {
          type: "text",
          text: text || "Invalid AI response",
        },
      ],
    };
  }
}

export async function runAgent(userInput, mode) {
  try {
    //  Priority: frontend mode > auto detect
    const skill = mode || detectSkill(userInput);

    console.log(" Skill selected:", skill);

    const systemPrompt = prompts[skill];

    const messages = [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userInput,
      },
    ];

    const res = await chatWithOllama(messages);

    const raw = res?.message?.content || "";

    console.log("RAW AI:", raw);

    return safeParseJSON(raw);
  } catch (err) {
    console.log(" AGENT ERROR:", err.message);

    return {
      type: "response",
      blocks: [
        {
          type: "text",
          text: "Agent failed to generate response",
        },
      ],
    };
  }
}
