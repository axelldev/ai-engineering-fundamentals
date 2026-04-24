import OpenAI from "openai";
import { type ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { getConfig, checkEnvironment } from "./utils";

const responseOutput = document.querySelector<HTMLElement>("[data-response]");
const sendButton = document.querySelector<HTMLButtonElement>("#sendButton");

if (!responseOutput || !sendButton) {
  throw new Error("Response output or send button element not found");
}

const config = getConfig();
checkEnvironment(config);

const openai = new OpenAI({
  apiKey: config.apiKey,
  baseURL: config.apiUrl,
  dangerouslyAllowBrowser: true,
});

const messages: ChatCompletionMessageParam[] = [
  {
    role: "user",
    content: "hello",
  },
];

sendButton.addEventListener("click", async () => {
  responseOutput.textContent = "Loading...";
  const response = await openai.chat.completions.create({
    model: config.model,
    messages,
  });
  responseOutput.textContent = response.choices[0]?.message.content ?? "";
});
