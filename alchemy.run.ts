import alchemy from "alchemy";
import { Vite } from "alchemy/cloudflare";
import { CloudflareStateStore } from "alchemy/state";

const app = await alchemy("blocks", {
  stateStore: (scope) => new CloudflareStateStore(scope),
});

export const worker = await Vite("website", {
  build: "bun run build",
  domains: ["blocks.kivlor.com"],
  entrypoint: "src/worker.ts",
});

console.log({
  url: worker.url,
});

await app.finalize();
