import OpenAI, { APIError, OpenAIError } from "openai";
import { checkEnvironment } from "./utils";

checkEnvironment();

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
  dangerouslyAllowBrowser: true,
});

const prompt = "Suggest some gifts for some who loves hiphop music";

console.log("Prompt:", prompt);
console.log("Making AI request");

try {
  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: process.env.AI_MODEL!,
  });

  const content = response.choices[0]?.message.content;
  console.log("AI response:", content ?? "No response text was returned.");
} catch (error) {
  if (error instanceof APIError && (error.status === 401 || error.status === 403)) {
    console.error(
      "Authentication error: Check your AI_KEY and make sure it’s valid.",
    );
  } else if (error instanceof APIError && error.status >= 500) {
    console.error(
      "AI provider error: Something went wrong on the provider side. Try again shortly.",
    );
  } else if (error instanceof OpenAIError) {
    console.error("OpenAI client error:", error.message);
  } else if (error instanceof Error) {
    console.error("Unexpected error:", error.message);
  } else {
    console.error("Unexpected error:", error);
  }
}
