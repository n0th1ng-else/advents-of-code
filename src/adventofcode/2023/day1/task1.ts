/**
 * npm run aoc 2023 1 1
 */
import type { TaskResult } from "../../types.ts";
import { findDigitsAndSum } from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  return {
    result: findDigitsAndSum(rows),
    sample: 142,
    task: 55_488,
  };
};
