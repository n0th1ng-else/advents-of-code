/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 13 1
 */
import type { TaskResult } from "../../types.ts";
import {
  countReflections,
  findReflections,
  getReflectionPatternGroups,
  ReflectionDirection,
} from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  const patterns = getReflectionPatternGroups(rows);
  const reflections = patterns.map((pattern) => {
    const { rowIds, columnIds } = findReflections(pattern);
    if (rowIds.length) {
      return {
        id: rowIds[0],
        type: ReflectionDirection.Row,
      };
    }

    return {
      id: columnIds[0],
      type: ReflectionDirection.Column,
    };
  });
  const result = countReflections(reflections);
  return {
    result,
    sample: 405,
    task: 36_041,
  };
};
