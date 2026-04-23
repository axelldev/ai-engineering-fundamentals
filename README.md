# ai-engineering-fundamentals

To install dependencies:

```bash
bun install
```

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Then fill in these variables:

```bash
VITE_AI_URL=https://api.openai.com/v1
VITE_AI_MODEL=gpt-4.1-mini
VITE_AI_KEY=your_api_key_here
```

To start the Vite dev server:

```bash
bun run dev
```

This project was created using `bun init` in bun v1.3.10. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
