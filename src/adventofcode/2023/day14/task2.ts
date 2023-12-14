/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 14 2
 */
import type { TaskResult } from "../../types.ts";
import { calculatePressure, transformReflections } from "./common.ts";
import { transponMatrix } from "../../common/utils.ts";

const mapToCacheId = (rows: string[][]): string =>
  rows.map((row) => row.join("")).join("");

const cache = new Map<string, number>();

export const task = (rows: string[]): TaskResult => {
  let cycles = 1_000_000_000;
  const turns = 4;
  let transformed: string[][] = rows.map((row) => row.split(""));

  for (let i = 0; i < cycles; i++) {
    const cacheId = mapToCacheId(transformed);
    const cached = cache.get(cacheId);
    if (cached) {
      const cycleSize = i - cached;
      const remainingCycles = (cycles - i) % cycleSize;
      cycles = i + remainingCycles;
    } else {
      cache.set(cacheId, i);
    }

    for (let j = 0; j < turns; j++) {
      transformed = transformReflections(transformed);
      transformed = transponMatrix(transformed);
    }
  }

  const result = calculatePressure(transformed);

  return {
    result,
    sample: 64,
    task: 93_736,
  };
};
