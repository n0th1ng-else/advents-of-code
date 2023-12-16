/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 16 1
 */
import type { TaskResult } from "../../types.ts";
import { getEnergizedCount } from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  const result = getEnergizedCount(
    rows,
    {
      i: 0,
      j: -1,
    },
    {
      i: 0,
      j: 1,
    },
  );

  return {
    result,
    sample: 46,
    task: 8_901,
  };
};
