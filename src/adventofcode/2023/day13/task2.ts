/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 13 2
 */
import type { TaskResult } from "../../types.ts";
import {
  countReflections,
  findReflections,
  getReflectionPatternGroups,
  ReflectionDirection,
  ReflectionPlace,
} from "./common.ts";
import { FlatCoordinate } from "../../common/types.ts";

const FIX_MAP: Record<string, string> = {
  "#": ".",
  ".": "#",
};

const fixPattern = (pattern: string[], pos: FlatCoordinate): string[] => {
  const fixed = [...pattern];
  const val = fixed[pos.i][pos.j];
  const newVal = FIX_MAP[val];
  const elements = fixed[pos.i].split("");
  elements.splice(pos.j, 1, newVal);
  fixed[pos.i] = elements.join("");
  return fixed;
};

const findFixedReflection = (pattern: string[]): ReflectionPlace => {
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[0].length; j++) {
      const fixed = fixPattern(pattern, { i, j });
      try {
        const ids = findReflections(fixed);

        const rowId = ids.rowIds.find((rId) => {
          const loopRow = Math.min(rId, pattern.length - rId);
          if (i > rId - loopRow && i < rId + loopRow) {
            return true;
          }
          return false;
        });
        const columnId = ids.columnIds.find((cId) => {
          const loopColumn = Math.min(cId, pattern[0].length - cId);
          if (j > cId - loopColumn && j < cId + loopColumn) {
            return true;
          }
          return false;
        });

        if (rowId || columnId) {
          return rowId
            ? { id: rowId, type: ReflectionDirection.Row }
            : { id: columnId!, type: ReflectionDirection.Column };
        }
      } catch {
        // reflection not found for the specific fix, its okay, ignore
      }
    }
  }

  throw new Error("no result?");
};

export const task = (rows: string[]): TaskResult => {
  const patterns = getReflectionPatternGroups(rows);
  const reflections = patterns.map((pattern) => findFixedReflection(pattern));
  const result = countReflections(reflections);
  return {
    result,
    sample: 400,
    task: 35_915,
  };
};
