/**
 * npm run aoc 2023 2 1
 */
import { type GamePlay, COLORS, parseGame } from "./common.ts";

const MAX_VALUES: GamePlay = {
  red: 12,
  green: 13,
  blue: 14,
};

export const task = (rows: string[]) => {
  const games = rows.map((row) => parseGame(row));
  const legal = games.filter((game) =>
    game.plays.every((play) => {
      return COLORS.every((color) => play[color] <= MAX_VALUES[color]);
    }),
  );

  return legal.reduce((acc, game) => acc + game.gameId, 0);
};
