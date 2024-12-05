/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2024
 * 2. Run the command: npm run aoc:run 5 1
 */
import type { TaskResult } from "../../types.ts";
import { isTerminalSequenceCorrect, readTerminalCommands } from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  const { sequences, rules } = readTerminalCommands(rows);
  const correct = sequences.filter((seq) =>
    isTerminalSequenceCorrect(seq, rules),
  );
  const res = correct
    .map((seq) => seq[Math.floor(seq.length / 2)])
    .reduce((sum, item) => sum + Number(item), 0);
  return {
    result: res,
    sample: 143,
    task: 6_242,
  };
};
