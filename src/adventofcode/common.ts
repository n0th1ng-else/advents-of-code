import { existsSync } from "https://deno.land/std/fs/mod.ts";
import type { TaskResult, StringOrNumber } from "./types.ts";

const CONSOLE_COLORS = {
  WHITE: "color: #fff",
  RED: "color: #f00",
  VOLT: "color: #bada55",
} as const;

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
  handler: () => StringOrNumber | TaskResult,
  path: string,
  type: "task" | "sample" | "unknown" = "unknown",
): void => {
  const parts = path.split("/");
  const year = parts.at(-3);
  const day = parts.at(-2);
  const task = parts.at(-1)?.split(".").at(0);
  // Use with --allow-hrtime
  const start = performance.now();
  const taskResult = handler();
  const isPlainResult =
    typeof taskResult === "string" || typeof taskResult === "number";
  const result: TaskResult = isPlainResult
    ? {
        result: taskResult,
        sample: 0,
        task: 0,
      }
    : taskResult;
  const end = performance.now();
  const diff = end - start;

  console.log("%c =====================", CONSOLE_COLORS.WHITE);
  console.log(`%c Year: %c${year} `, CONSOLE_COLORS.WHITE, CONSOLE_COLORS.VOLT);
  console.log(`%c Day: %c${day} `, CONSOLE_COLORS.WHITE, CONSOLE_COLORS.VOLT);
  console.log(`%c Part: %c${task} `, CONSOLE_COLORS.WHITE, CONSOLE_COLORS.VOLT);
  console.log("%c =====================", CONSOLE_COLORS.WHITE);
  console.log(
    `%c Task execution took: %c${diff.toFixed(
      3,
    )}s %cmilliseconds. The result was %c${result.result}`,
    CONSOLE_COLORS.WHITE,
    CONSOLE_COLORS.VOLT,
    CONSOLE_COLORS.WHITE,
    CONSOLE_COLORS.VOLT,
  );
  if (type === "task" && result.task) {
    const isCorrect = result.result === result.task;
    const color = isCorrect ? CONSOLE_COLORS.VOLT : CONSOLE_COLORS.RED;
    console.log(
      `%c The result was %c${
        isCorrect ? "correct" : "incorrect"
      } %c(expected: %c${result.task}%c)`,
      CONSOLE_COLORS.WHITE,
      color,
      CONSOLE_COLORS.WHITE,
      color,
      CONSOLE_COLORS.WHITE,
    );
  }
  if (type === "sample" && result.sample) {
    const isCorrect = result.result === result.sample;
    const color = isCorrect ? CONSOLE_COLORS.VOLT : CONSOLE_COLORS.RED;
    console.log(
      `%c The result was %c${
        isCorrect ? "correct" : "incorrect"
      } %c(expected: %c${result.sample}%c)`,
      CONSOLE_COLORS.WHITE,
      color,
      CONSOLE_COLORS.WHITE,
      color,
      CONSOLE_COLORS.WHITE,
    );
  }
  console.log("%c =====================", CONSOLE_COLORS.WHITE);
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
  part: string | number,
): string => {
  const folder = getDayFolder(year, day);
  const taskFile = [...folder, `task${part}.ts`].join("/");
  return taskFile;
};

export const createDayFolder = async (
  year: string,
  day: string,
): Promise<string> => {
  const folder = getDayFolder(year, day).join("/");
  if (existsSync(folder)) {
    return folder;
  }
  await Deno.mkdir(folder);
  return folder;
};

export const createDayTasks = (year: string, day: string): void => {
  const parts = [1, 2];
  for (let i = 0; i < parts.length; i++) {
    const part = i + 1;
    const task = getTaskFile(year, day, part);
    const taskContent = `
/**
 * npm run aoc:run ${year} ${day} ${part}
 */
 import type { TaskResult } from "../../types.ts";

export const task = (rows: string[]): TaskResult => {
  return {
    result: 0,
    sample: 0,
    task: 0
  }
};
`;

    if (!existsSync(task)) {
      Deno.writeTextFileSync(task, taskContent);
    }
  }
};
