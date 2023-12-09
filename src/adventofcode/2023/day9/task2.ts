/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 9 2
 */
import type { TaskResult } from "../../types.ts";
import { createForecastSubrow } from "./common.ts";

const getPrevNumberForSubset = (numbers: number[]): number => {
  const allZeros = numbers.every((n) => !n);
  if (allZeros) {
    return 0;
  }
  const subrow = createForecastSubrow(numbers);
  return (numbers.at(0) ?? 0) - getPrevNumberForSubset(subrow);
};

export const task = (rows: string[]): TaskResult => {
  const results = rows.map((row) => {
    const numbers = row.split(" ").map(Number);
    return getPrevNumberForSubset(numbers);
  });
  const result = results.reduce((acc, curr) => acc + curr, 0);
  return {
    result,
    sample: 2,
    task: 925,
  };
};
