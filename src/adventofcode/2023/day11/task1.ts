/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 11 1
 */
import type { TaskResult } from "../../types.ts";
import { runGalaxiesDistancesExploration } from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  const hasMultiplier = !isNaN(Number(rows[0]));
  const multiplier = hasMultiplier ? Number(rows[0]) : 2;
  if (hasMultiplier) {
    rows.shift();
    rows.shift();
  }
  const result = runGalaxiesDistancesExploration(rows, multiplier);
  return {
    result,
    sample: 374,
    task: 10_422_930,
  };
};
