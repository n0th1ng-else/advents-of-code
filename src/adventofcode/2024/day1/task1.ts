/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2024
 * 2. Run the command: npm run aoc:run 1 1
 */
import type { TaskResult } from "../../types.ts";
import { parseLists } from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  const [left, right] = parseLists(rows);
  const sortedL = left.sort((a, b) => a - b);
  const sortedR = right.sort((a, b) => a - b);
  let sum = 0;
  sortedL.forEach((l, index) => {
    console.log(l, sortedR[index]);
    sum = sum + Math.abs(l - sortedR[index]);
  });
  return {
    result: sum,
    sample: 11,
    task: 1651298,
  };
};
