/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 5 2
 */
import type { TaskResult } from "../../types.ts";
import { mapAllSeeds } from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  const seedsRow = rows.shift() || "";
  let seeds = seedsRow.split(" ").map(Number);
  seeds.shift();

  let minimal = 0;

  const halfSize = seeds.length / 2;
  mapAllSeeds([0], rows);

  for (let i = 0; i < halfSize; i++) {
    const start = seeds[2 * i];
    const size = seeds[2 * i + 1];
    console.log(start, size);
    for (let j = start; j < start + size; j++) {
      const progress = start + size - j;
      if (progress % 1000000 === 0) {
        console.log(progress);
      }

      const resultPart = mapAllSeeds([j], rows, true);
      const minimalPart = resultPart[0];
      if (!minimal || minimalPart < minimal) {
        minimal = minimalPart;
      }
    }

    console.log("Current minimal", minimal);
  }

  return {
    result: minimal,
    sample: 46,
    task: 7_873_084,
  };
};
