/**
 * npm run aoc 2023 2 2
 */
import { GamePlay, parseGame } from "./common.ts";

export const task = (rows: string[]) => {
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

  return maxCubes.reduce((acc, value) => acc + value, 0);
};
