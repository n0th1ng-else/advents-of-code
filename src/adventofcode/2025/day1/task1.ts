/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2025
 * 2. Run the command: npm run aoc:run 1 1
 */
import type { TaskResult } from "../../types.ts";

export const task = (rows: string[]): TaskResult => {
  const parsed = rows.map((row) => {
    const char = row.at(0);
    const num = row.slice(1);
    return {
      dir: char,
      val: Number(num),
    };
  });

  const results = parsed.reduce(
    (acc, row) => {
      const [curr, count] = acc;
      const { dir, val } = row;
      const newPosition = dir === "L" ? curr - val : curr + val;

      if (newPosition < 0) {
        const lastDigits = Number(String(newPosition * -1).slice(-2));
        const actual = 100 - lastDigits;
        const counted = actual % 100 ? 0 : 1;
        return [actual % 100, count + counted];
      }
      const counted = newPosition % 100 ? 0 : 1;
      return [newPosition % 100, count + counted];
    },
    [50, 0],
  );

  return {
    result: results.at(1) ?? 0,
    sample: 3,
    task: 1139,
  };
};
