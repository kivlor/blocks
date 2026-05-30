import alchemy from "alchemy";
import { Vite } from "alchemy/cloudflare";

const app = await alchemy("blocks");

export const worker = await Vite("website", {
  build: "bun run build",
  domains: ["blocks.kivlor.com"],
  entrypoint: "src/worker.ts",
});

console.log({
  url: worker.url,
});

await app.finalize();
