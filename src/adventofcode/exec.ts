const [year, day, part] = Deno.args;

if (!year || !day || !part) {
  console.error(new Error("The task is not specified!"));
  Deno.exit();
}

const thisFile = new URL("", import.meta.url).pathname;
const parts = thisFile.split("/");
parts.pop();

const taskFile = [...parts, year, `day${day}`, `task${part}.ts`].join("/");

const cmd = ["deno", "run", "-A", "--allow-hrtime", taskFile];

console.log(">", ...cmd, "\n");

const p = Deno.run({ cmd });

await p.status();
