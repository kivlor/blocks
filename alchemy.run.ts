import alchemy from "alchemy";
import { Vite } from "alchemy/cloudflare";
import { CloudflareStateStore } from "alchemy/state";

const app = await alchemy("blocks", {
  adopt: true,
  stage: process.env.ALCHEMY_STAGE ?? "production",
  stateStore: (scope) => new CloudflareStateStore(scope),
});

export const worker = await Vite("website", {
  build: "bun run build",
  domains: [
    {
      adopt: true,
      domainName: "blocks.kivlor.com",
      overrideExistingOrigin: true,
    },
  ],
  entrypoint: "src/worker.ts",
});

console.log({
  url: worker.url,
});

await app.finalize();
