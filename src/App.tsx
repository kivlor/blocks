import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  ConfirmActionDemo,
  confirmActionDemoCode,
  DataTableDemo,
  dataTableDemoCode,
  DialogFormDemo,
  dialogFormDemoCode,
  SheetFormDemo,
  sheetFormDemoCode,
  SubmitButtonDemo,
  submitButtonDemoCode,
} from "./demos";

import registry from "../registry.json";

const demos: Record<string, { code: string; demo: ReactNode }> = {
  "confirm-action": {
    code: confirmActionDemoCode,
    demo: <ConfirmActionDemo />,
  },
  "data-table": {
    code: dataTableDemoCode,
    demo: <DataTableDemo />,
  },
  "dialog-form": {
    code: dialogFormDemoCode,
    demo: <DialogFormDemo />,
  },
  "sheet-form": {
    code: sheetFormDemoCode,
    demo: <SheetFormDemo />,
  },
  "submit-button": {
    code: submitButtonDemoCode,
    demo: <SubmitButtonDemo />,
  },
};

const registryItems = registry.items.map((item) => ({
  ...item,
  ...demos[item.name],
  href: `/r/${item.name}.json`,
}));

function App() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 sm:px-8 lg:py-14">
        <header className="flex flex-col gap-4 border-b border-zinc-200 pb-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="mt-2 text-4xl font-semibold text-zinc-950 sm:text-5xl">
                blocks
              </h1>
            </div>
            <a
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-white"
              href="/r/registry.json"
            >
              registry.json
            </a>
          </div>
          <p className="max-w-2xl text-base text-zinc-600">
            a small component registry by{" "}
            <a href="https://kivlor.com" className="text-zinc-950">
              kivlor
            </a>
          </p>
        </header>

        <section className="grid gap-6">
          {registryItems.map((item) => (
            <article
              className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm"
              key={item.name}
            >
              <div className="flex flex-col gap-4 border-b border-zinc-200 p-5">
                <div className="flex flex-row gap-4 items-start justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                      <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600">
                        {item.type}
                      </span>
                    </div>
                    <p className="mt-2 max-w-2xl text-sm text-zinc-600">
                      {item.description}
                    </p>
                  </div>

                  <a
                    className="w-fit rounded-md bg-zinc-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
                    href={item.href}
                  >
                    View JSON
                  </a>
                </div>
                <div>
                  <pre className="mt-3 block break-all rounded-md bg-zinc-100 px-3 py-2 text-sm text-zinc-700">
                    {`npx shadcn@latest add https://blocks.kivlor.com${item.href}`}
                  </pre>
                </div>
              </div>

              {item.demo || item.code ? (
                <Tabs defaultValue="demo" className="p-5">
                  <TabsList>
                    {item.demo ? (
                      <TabsTrigger value="demo">Demo</TabsTrigger>
                    ) : null}
                    {item.code ? (
                      <TabsTrigger value="code">Code</TabsTrigger>
                    ) : null}
                  </TabsList>
                  {item.demo ? (
                    <TabsContent className="mt-4" value="demo">
                      <div className="grid gap-3">{item.demo}</div>
                    </TabsContent>
                  ) : null}
                  {item.code ? (
                    <TabsContent className="mt-4" value="code">
                      <div className="grid gap-3">
                        <pre className="overflow-x-auto rounded-md bg-zinc-950 p-4 text-sm text-zinc-100">
                          <code>{item.code}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  ) : null}
                </Tabs>
              ) : null}
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;
