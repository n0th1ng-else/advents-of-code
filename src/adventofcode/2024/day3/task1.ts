/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2024
 * 2. Run the command: npm run aoc:run 3 1
 */
import type { TaskResult } from "../../types.ts";
import { multiplyFromString, scanCommands } from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  const row = rows.join();

  const res = scanCommands(row);
  const mult = res.map((item) => {
    return multiplyFromString(item[1], item[2]);
  });
  const sum = mult.reduce((acc, cur) => acc + cur, 0);
  return {
    result: sum,
    sample: 161,
    task: 159_892_596,
  };
};
