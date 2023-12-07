/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 7 1
 */
import type { TaskResult } from "../../types.ts";
import {
  getCamelBars,
  getCamelHands,
  getCamelResult,
  sortCamelHands,
} from "./common.ts";

const GAME_CARDS = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

export const task = (rows: string[]): TaskResult => {
  const games = getCamelHands(rows, (hand) => getCamelBars(hand, GAME_CARDS));
  const sorted = sortCamelHands(games, GAME_CARDS);
  const result = getCamelResult(sorted);

  return {
    result,
    sample: 6_440,
    task: 250_120_186,
  };
};
