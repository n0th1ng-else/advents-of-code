/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 14 1
 */
import type { TaskResult } from "../../types.ts";
import { calculatePressure, transformReflections } from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  const transformed = transformReflections(rows.map((row) => row.split("")));
  const result = calculatePressure(transformed);
  return {
    result,
    sample: 136,
    task: 111_339,
  };
};
