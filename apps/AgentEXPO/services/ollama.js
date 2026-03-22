import Ollama from "ollama";

export async function chatWithOllama(messages) {
  return await Ollama.chat({
    model: "gpt-oss:120b-cloud",
    messages,
    stream:false,
  });
}

export async function visionWithOllama(prompt, imagePath) {
  const res = await Ollama.chat({
    model: "qwen3.5:397b-cloud",
    messages: [
      {
        role: "user",
        content: prompt,
        images: [imagePath],
      },
    ],
  });

  return res.message.content;
}