import { execWithTime, getSampleFile, getTaskFile } from "../common.ts";
import { detectYear } from "../env.ts";
import { CONSOLE_COLORS, getRunCommand } from "../const.ts";

const [day, part, sample] = Deno.args;

const isSample = Boolean(sample);
const [yearValue, yearSource] = await detectYear();

console.log(
  `%c Fetching the AoC year from the %c${yearSource}%c. The year is set to %c${yearValue}`,
  CONSOLE_COLORS.WHITE,
  CONSOLE_COLORS.VOLT,
  CONSOLE_COLORS.WHITE,
  CONSOLE_COLORS.VOLT,
);

if (!day) {
  console.error(
    new Error(
      `The day is not specified! The correct format is ${getRunCommand("run")}`,
    ),
  );
  Deno.exit();
}

if (!part) {
  console.error(
    new Error(
      `The part is not specified! The correct format is ${getRunCommand(
        "run",
      )}`,
    ),
  );
  Deno.exit();
}

const taskFile = getTaskFile(yearValue, day, part);
const inputFile = getSampleFile(yearValue, day, isSample, part);

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

execWithTime(() => task(lines), taskFile, isSample ? "sample" : "task");
