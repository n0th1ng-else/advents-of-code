import { existsSync } from "https://deno.land/std/fs/mod.ts";

export const readFileByPath = async (
  path: string,
  isExample = false,
): Promise<string[]> => {
  const parts = path.split("/");
  parts.pop();
  const file = [...parts, isExample ? "sample.txt" : "task.txt"].join("/");
  console.log("Reading the file:", file);
  const text = await Deno.readTextFile(file);
  const lines = text.split("\n");
  lines.pop();
  return lines;
};

export const execWithTime = (
  handler: () => number | string,
  path: string,
): void => {
  const parts = path.split("/");
  const year = parts.at(-3);
  const day = parts.at(-2);
  const task = parts.at(-1)?.split(".").at(0);
  // Use with --allow-hrtime
  const start = performance.now();
  const result = handler();
  const end = performance.now();
  const diff = end - start;
  const white = "color: #fff";
  const volt = "color: #bada55";
  console.log("%c =====================", white);
  console.log(`%c Year: %c ${year} `, white, volt);
  console.log(`%c Day: %c ${day} `, white, volt);
  console.log(`%c Part: %c ${task} `, white, volt);
  console.log("%c =====================", white);
  console.log(
    `%c Task execution took: %c ${diff.toFixed(
      3,
    )} %c milliseconds. The result was %c ${result}`,
    white,
    volt,
    white,
    volt,
  );
  console.log("%c =====================", white);
};

const getDayFolder = (year: string, day: string): string[] => {
  const thisFile = new URL("", import.meta.url).pathname;
  const parts = thisFile.split("/");
  parts.pop();
  return [...parts, year, `day${day}`];
};

export const getSampleFile = (
  year: string,
  day: string,
  part: string,
  isSample: boolean,
): string => {
  const folder = getDayFolder(year, day);
  if (!isSample) {
    return [...folder, "task.txt"].join("/");
  }

  const taskSample = [...folder, `sample${part}.txt`].join("/");
  const sample = [...folder, "sample.txt"].join("/");
  return existsSync(taskSample) ? taskSample : sample;
};

export const getTaskFile = (
  year: string,
  day: string,
  part: string,
): string => {
  const folder = getDayFolder(year, day);
  const taskFile = [...folder, `task${part}.ts`].join("/");
  return taskFile;
};
