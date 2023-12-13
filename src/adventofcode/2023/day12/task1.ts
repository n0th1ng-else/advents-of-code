/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 12 1
 */
import type { TaskResult } from "../../types.ts";
import { countVariants } from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  const parsed = rows.map((row) => {
    const [template, sequence] = row.split(" ");
    return {
      template,
      sequence,
    };
  });
  const variants = parsed.map((item) =>
    countVariants(item.template, item.sequence),
  );
  const result = variants.reduce((acc, item) => acc + item, 0);
  return {
    result,
    sample: 21,
    task: 7_670,
  };
};
