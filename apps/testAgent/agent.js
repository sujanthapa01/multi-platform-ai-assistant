import "dotenv/config";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { getWeather, addition } from "./tools.js";

const llm = new ChatOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "Test-Agent",
    },
  },
  model: "nvidia/nemotron-3-super-120b-a12b:free",  
  temperature: 0,
});

const agent = createReactAgent({               
  llm,                                         
  tools: [getWeather, addition],
});

export async function ChatAgent(message) {
  console.log(message);
  try {
    const res = await agent.invoke({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    console.log(res.messages.at(-1).content)
    return res.messages.at(-1).content;
  } catch (err) {
    console.error("error", err);
    return "agent failed to generate response"; 
  }
}