/**
 * npm run aoc:run 2023 4 1
 */
import type { TaskResult } from "../../types.ts";

export const task = (rows: string[]): TaskResult => {
  const powers = rows.map((row) => {
    const card = row.split(":").at(1) || "";
    const halves = card.split("|");
    const counted: Record<string, number> = {};
    halves.forEach((half) => {
      const nums = half
        .split(" ")
        .map((item) => item.trim())
        .filter(Boolean);
      nums.forEach((num) => {
        if (counted[num]) {
          counted[num] = counted[num] + 1;
        } else {
          counted[num] = 1;
        }
      });
    });

    const winners = Object.values(counted).reduce(
      (acc, num) => (num === 2 ? acc + 1 : acc),
      0,
    );
    return winners;
  });

  const res = powers
    .filter(Boolean)
    .map((power) => new Array(power - 1).fill(null).reduce((acc) => acc * 2, 1))
    .reduce((acc, num) => acc + num, 0);
  return {
    result: res,
    sample: 13,
    task: 21138,
  };
};
