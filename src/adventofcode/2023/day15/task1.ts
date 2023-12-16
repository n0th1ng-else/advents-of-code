/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 15 1
 */
import type { TaskResult } from "../../types.ts";
import { runHashOnSequence } from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  const sequences = (rows.at(0) ?? "").split(",");
  const results = sequences.map((seq) => runHashOnSequence(seq));
  const result = results.reduce((acc, res) => acc + res, 0);
  return {
    result,
    sample: 1_320,
    task: 506_869,
  };
};
