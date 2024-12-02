/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2024
 * 2. Run the command: npm run aoc:run 1 2
 */
import type { TaskResult } from "../../types.ts";
import { parseLists } from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  const [left, right] = parseLists(rows);
  const freq = right.reduce(
    (acc, item) => {
      if (!acc[item]) {
        acc[item] = 0;
      }
      acc[item] = acc[item] + 1;
      return acc;
    },
    {} as Record<number, number>,
  );
  const sum = left.reduce((acc, item) => {
    const row = item * (freq[item] || 0);
    return acc + row;
  }, 0);
  return {
    result: sum,
    sample: 31,
    task: 0,
  };
};
