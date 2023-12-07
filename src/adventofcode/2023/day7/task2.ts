/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 7 2
 */
import type { TaskResult } from "../../types.ts";
import {
  getCamelBars,
  getCamelBarsPriority,
  getCamelHands,
  getCamelResult,
  sortCamelHands,
} from "./common.ts";

const GAME_CARDS = [
  "J",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "Q",
  "K",
  "A",
];

const JOKER = "J";

const getBars = (hand: string): number[] => {
  const options = GAME_CARDS.map((jokerCard) => {
    const jokerHand = hand.replace(new RegExp(JOKER, "g"), jokerCard);
    return {
      bars: getCamelBars(jokerHand, GAME_CARDS),
      joker: jokerCard,
    };
  });
  const sorted = options.sort((a, b) => {
    const bar = getCamelBarsPriority(a.bars, b.bars);
    if (bar) {
      return bar;
    }

    const aIndex = GAME_CARDS.findIndex((gc) => gc === a.joker);
    const bIndex = GAME_CARDS.findIndex((gc) => gc === b.joker);
    return bIndex - aIndex;
  });
  return sorted[0].bars;
};

export const task = (rows: string[]): TaskResult => {
  const games = getCamelHands(rows, getBars);
  const sorted = sortCamelHands(games, GAME_CARDS);
  const result = getCamelResult(sorted);

  return {
    result,
    sample: 5_905,
    task: 250_665_248,
  };
};
