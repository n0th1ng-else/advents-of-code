/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 9 1
 */
import type { TaskResult } from "../../types.ts";
import { createForecastSubrow } from "./common.ts";

const getNextNumberForSubset = (numbers: number[]): number => {
  const allZeros = numbers.every((n) => !n);
  if (allZeros) {
    return 0;
  }
  const subrow = createForecastSubrow(numbers);
  return getNextNumberForSubset(subrow) + (numbers.at(-1) ?? 0);
};

export const task = (rows: string[]): TaskResult => {
  const results = rows.map((row) => {
    const numbers = row.split(" ").map(Number);
    return getNextNumberForSubset(numbers);
  });
  const result = results.reduce((acc, curr) => acc + curr, 0);
  return {
    result,
    sample: 114,
    task: 1_702_218_515,
  };
};
