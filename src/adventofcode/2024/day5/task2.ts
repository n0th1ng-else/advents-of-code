/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2024
 * 2. Run the command: npm run aoc:run 5 2
 */
import type { TaskResult } from "../../types.ts";
import {
  isTerminalSequenceCorrect,
  readTerminalCommands,
  type TerminalCmdData,
} from "./common.ts";

const fixSequence = (
  left: string,
  right: string,
  rules: TerminalCmdData["rules"],
): number => {
  const correct = rules.find(
    (rule) => rule.left === left && rule.right === right,
  );
  if (correct) {
    return 1;
  }
  const incorrect = rules.find(
    (rule) => rule.right === left && rule.left === right,
  );
  if (incorrect) {
    return -1;
  }
  return 0;
};

export const task = (rows: string[]): TaskResult => {
  const { sequences, rules } = readTerminalCommands(rows);
  const incorrect = sequences.filter(
    (seq) => !isTerminalSequenceCorrect(seq, rules),
  );

  const correct = incorrect.map((seq) =>
    seq.sort((a, b) => fixSequence(a, b, rules)),
  );

  const res = correct
    .map((seq) => seq[Math.floor(seq.length / 2)])
    .reduce((sum, item) => sum + Number(item), 0);
  return {
    result: res,
    sample: 123,
    task: 5_169,
  };
};
