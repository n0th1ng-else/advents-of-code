/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 11 2
 */
import type { TaskResult } from "../../types.ts";
import { runGalaxiesDistancesExploration } from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  const hasMultiplier = !isNaN(Number(rows[0]));
  const multiplier = hasMultiplier ? Number(rows[0]) : 1_000_000;
  if (hasMultiplier) {
    rows.shift();
    rows.shift();
  }
  const result = runGalaxiesDistancesExploration(rows, multiplier);
  return {
    result,
    sample: 8_410,
    task: 699_909_023_130,
  };
};
