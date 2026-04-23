import OpenAI, { APIError, OpenAIError } from "openai";
import { checkEnvironment, getConfig } from "./utils";

const config = getConfig();
checkEnvironment(config);

const openai = new OpenAI({
  apiKey: config.apiKey,
  baseURL: config.apiUrl,
  dangerouslyAllowBrowser: true,
});

const form = document.querySelector<HTMLFormElement>("[data-prompt-form]");
const promptInput = document.querySelector<HTMLTextAreaElement>("[data-prompt]");
const responseOutput = document.querySelector<HTMLElement>("[data-response]");
const statusOutput = document.querySelector<HTMLElement>("[data-status]");

if (!form || !promptInput || !responseOutput || !statusOutput) {
  throw new Error("The app UI could not be initialized.");
}

const setStatus = (message: string) => {
  statusOutput.textContent = message;
  console.log(message);
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const prompt = promptInput.value.trim();

  if (!prompt) {
    setStatus("Enter a prompt before making a request.");
    responseOutput.textContent = "";
    return;
  }

  setStatus("Making AI request...");
  responseOutput.textContent = "";

  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: config.model,
    });

    const content =
      response.choices[0]?.message.content ?? "No response text was returned.";

    responseOutput.textContent = content;
    setStatus("Request completed.");
  } catch (error) {
    if (
      error instanceof APIError &&
      (error.status === 401 || error.status === 403)
    ) {
      setStatus(
        "Authentication error: Check your VITE_AI_KEY and make sure it is valid.",
      );
    } else if (error instanceof APIError && error.status >= 500) {
      setStatus(
        "AI provider error: Something went wrong on the provider side. Try again shortly.",
      );
    } else if (error instanceof OpenAIError) {
      setStatus(`OpenAI client error: ${error.message}`);
    } else if (error instanceof Error) {
      setStatus(`Unexpected error: ${error.message}`);
    } else {
      setStatus(`Unexpected error: ${String(error)}`);
    }
  }
});

setStatus("Ready. Submit a prompt to see the response here and in the browser console.");
