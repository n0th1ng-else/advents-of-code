/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 12 2
 */
import type { TaskResult } from "../../types.ts";
import { countVariants } from "./common.ts";

const unfold = (str: string, times: number, separator: string): string => {
  return new Array(times - 1)
    .fill(null)
    .reduce((acc) => `${acc}${separator}${str}`, str);
};

export const task = (rows: string[]): TaskResult => {
  const parsed = rows.map((row) => {
    const [template, sequence] = row.split(" ");
    return {
      template: unfold(template, 5, "?"),
      sequence: unfold(sequence, 5, ","),
    };
  });

  const variants = parsed.map((item) =>
    countVariants(item.template, item.sequence),
  );
  const result = variants.reduce((acc, item) => acc + item, 0);
  return {
    result,
    sample: 525_152,
    task: 157_383_940_585_037,
  };
};
