export type AIConfig = {
  apiKey: string;
  apiUrl: string;
  model: string;
};

export function getConfig(): AIConfig {
  return {
    apiKey: import.meta.env.VITE_AI_KEY ?? "",
    apiUrl: import.meta.env.VITE_AI_URL ?? "",
    model: import.meta.env.VITE_AI_MODEL ?? "",
  };
}

export function checkEnvironment(config: AIConfig) {
  if (!config.apiUrl) {
    throw new Error(
      "Missing VITE_AI_URL. This tells us which AI provider you're using.",
    );
  }

  if (!config.model) {
    throw new Error(
      "Missing VITE_AI_MODEL. The AI request needs a model name.",
    );
  }

  if (!config.apiKey) {
    throw new Error(
      "Missing VITE_AI_KEY. Your API key is not being picked up.",
    );
  }

  console.log("AI provider URL:", config.apiUrl);
  console.log("AI model:", config.model);
}
