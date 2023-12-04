/**
 * npm run aoc:run 2023 4 2
 */
import type { TaskResult } from "../../types.ts";

export const task = (rows: string[]): TaskResult => {
  const powers = rows.map((row, index) => {
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
    return {
      cardId: index + 1,
      copies: 1,
      dependencies: new Array(winners)
        .fill(null)
        .map((_, winnerIndex) => index + 1 + winnerIndex + 1),
    };
  });

  const adjusted = powers.map((card) => {
    card.dependencies.forEach((dep) => {
      powers[dep - 1].copies += card.copies;
    });
    return card;
  });

  return {
    result: adjusted.reduce((acc, card) => acc + card.copies, 0),
    sample: 30,
    task: 7185540,
  };
};
