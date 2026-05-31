import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import alchemy from "alchemy/cloudflare/vite";
import { existsSync } from "node:fs";
import { defineConfig } from "vite";

const alchemyConfigPath = new URL(".alchemy/local/wrangler.jsonc", import.meta.url);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ...(existsSync(alchemyConfigPath) ? [alchemy()] : []),
  ],
  resolve: {
    alias: {
      "@": new URL(".", import.meta.url).pathname,
    },
  },
});
