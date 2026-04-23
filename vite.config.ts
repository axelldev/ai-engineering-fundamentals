import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.API_KEY": JSON.stringify(env.API_KEY),
      "process.env.API_URL": JSON.stringify(env.API_URL),
      "process.env.AI_MODEL": JSON.stringify(env.AI_MODEL),
    },
  };
});
