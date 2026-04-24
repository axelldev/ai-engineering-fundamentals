import OpenAI from "openai";
import { type ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { getConfig, checkEnvironment } from "./utils";

const responseOutput = document.querySelector<HTMLElement>("[data-response]");
if (!responseOutput) {
  throw new Error("Response output element not found");
}

const config = getConfig();
checkEnvironment(config);

const openai = new OpenAI({
  apiKey: config.apiKey,
  baseURL: config.apiUrl,
});

const messages: ChatCompletionMessageParam[] = [
  {
    role: "user",
    content: "hello",
  },
];

const response = await openai.chat.completions.create({
  model: config.model,
  messages,
});

responseOutput.textContent = response.choices[0]?.message.content ?? "";
