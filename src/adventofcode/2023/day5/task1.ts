/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 5 1
 */
import type { TaskResult } from "../../types.ts";
import { getMinimalSeed, mapAllSeeds } from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  const seedsRow = rows.shift() || "";
  let seeds = seedsRow.split(" ").map(Number);
  seeds.shift();
  mapAllSeeds([0], rows);

  seeds = mapAllSeeds(seeds, rows, true);

  return {
    result: getMinimalSeed(seeds),
    sample: 35,
    task: 579_439_039,
  };
};
