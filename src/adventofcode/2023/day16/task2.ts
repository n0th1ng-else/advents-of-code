/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 16 2
 */
import type { TaskResult } from "../../types.ts";
import { getEnergizedCount } from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  let total = 0;
  for (let i = 0; i < rows.length; i++) {
    console.log(`Rows: ${i + 1} of ${rows.length} = ${total}`);
    const energizedPositionsLeft = getEnergizedCount(
      rows,
      {
        i,
        j: -1,
      },
      {
        i: 0,
        j: 1,
      },
    );

    if (energizedPositionsLeft > total) {
      total = energizedPositionsLeft;
    }

    const energizedPositionsRight = getEnergizedCount(
      rows,
      {
        i: rows.length - 1 - i,
        j: rows[0].length,
      },
      {
        i: 0,
        j: -1,
      },
    );

    if (energizedPositionsRight > total) {
      total = energizedPositionsRight;
    }
  }

  for (let j = 0; j < rows[0].length; j++) {
    console.log(`Columns: ${j + 1} of ${rows[0].length} = ${total}`);
    const energizedPositionsLeft = getEnergizedCount(
      rows,
      {
        i: -1,
        j,
      },
      {
        i: 1,
        j: 0,
      },
    );
    if (energizedPositionsLeft > total) {
      total = energizedPositionsLeft;
    }

    const energizedPositionsRight = getEnergizedCount(
      rows,
      {
        i: rows.length,
        j: rows[0].length - 1 - j,
      },
      {
        i: -1,
        j: 0,
      },
    );

    if (energizedPositionsRight > total) {
      total = energizedPositionsRight;
    }
  }

  return {
    result: total,
    sample: 51,
    task: 9_064,
  };
};
