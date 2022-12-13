import { execWithTime } from "./common.ts";

const [year, day, part, sample] = Deno.args;

const isSample = Boolean(sample);

if (!year || !day || !part) {
  console.error(new Error("The task is not specified!"));
  Deno.exit();
}

const thisFile = new URL("", import.meta.url).pathname;
const parts = thisFile.split("/");
parts.pop();

const taskFile = [...parts, year, `day${day}`, `task${part}.ts`].join("/");
const inputFile = [
  ...parts,
  year,
  `day${day}`,
  isSample ? "sample.txt" : "task.txt",
].join("/");

console.log("Looking at the executor:", taskFile);
const module = await import(taskFile);

if (!module) {
  console.error(new Error("The task module not found!"));
  Deno.exit();
}

console.log("Reading the file:", inputFile);
const text = await Deno.readTextFile(inputFile);
const lines = text.split("\n");
lines.pop();

console.log("Running the task:", taskFile);
const task = module.default || module.task;

execWithTime(() => task(lines), taskFile);
