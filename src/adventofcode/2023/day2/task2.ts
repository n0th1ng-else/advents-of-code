/**
 * npm run aoc 2023 2 2
 */
import type { TaskResult } from "../../types.ts";
import { GamePlay, parseGame } from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  const games = rows.map((row) => parseGame(row));
  const maxCubes = games
    .map((game) => {
      return game.plays.reduce<GamePlay>(
        (acc, play) => {
          return {
            red: Math.max(acc.red, play.red),
            green: Math.max(acc.green, play.green),
            blue: Math.max(acc.blue, play.blue),
          };
        },
        { red: 0, green: 0, blue: 0 },
      );
    })
    .map((maxCube) =>
      Object.values(maxCube).reduce((acc, value) => acc * value, 1),
    );

  const result = maxCubes.reduce((acc, value) => acc + value, 0);
  return {
    result,
    sample: 2_286,
    task: 86_036,
  };
};
