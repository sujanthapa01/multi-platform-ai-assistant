export function detectSkill(message) {
  const msg = message.toLowerCase();

  if (msg.includes("email") || msg.includes("mail")) {
    return "email";
  }

  if (
    msg.includes("pdf") ||
    msg.includes("report") ||
    msg.includes("document")
  ) {
    return "pdf";
  }


   if (
    msg.includes("hi") ||
    msg.includes("hello") ||
    msg.includes("hey") ||
    msg.includes("how are you") ||
    msg.includes("what") ||
    msg.includes("why") ||
    msg.includes("help")
  ) {
    return "conversation";
  }

  return "research";
}