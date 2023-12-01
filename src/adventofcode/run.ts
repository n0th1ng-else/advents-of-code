import { execWithTime, getSampleFile, getTaskFile } from "./common.ts";

const [year, day, part, sample] = Deno.args;

const isSample = Boolean(sample);

if (!year) {
  console.error(
    new Error(
      "The yearn is not specified! The correct format is npm run aoc [year] [day] [part] (sample)",
    ),
  );
  Deno.exit();
}

if (!year || !day || !part) {
  console.error(
    new Error(
      "The day is not specified! The correct format is npm run aoc [year] [day] [part] (sample)",
    ),
  );
  Deno.exit();
}

if (!year || !day || !part) {
  console.error(
    new Error(
      "The part is not specified! The correct format is npm run aoc [year] [day] [part] (sample)",
    ),
  );
  Deno.exit();
}

const taskFile = getTaskFile(year, day, part);
const inputFile = getSampleFile(year, day, part, isSample);

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
