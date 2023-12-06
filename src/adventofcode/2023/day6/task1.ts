/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 6 1
 */
import type { TaskResult } from "../../types.ts";
import { getRoundOptions, type RaceRound } from "./common.ts";

const getRounds = (rows: string[]): RaceRound[] => {
  const parsed = rows.map((row) => {
    const values = row.split(":").at(1) || "";
    const parts = values
      .split(" ")
      .map((v) => v.trim())
      .filter(Boolean);
    return parts;
  });
  const rounds = parsed[0].map((_, index) => {
    return {
      time: Number(parsed[0][index]),
      dist: Number(parsed[1][index]),
    };
  });

  return rounds;
};

export const task = (rows: string[]): TaskResult => {
  const rounds = getRounds(rows);
  const options = rounds.map((round) => getRoundOptions(round));
  const result = options.reduce((acc, curr) => acc * curr, 1);
  return {
    result,
    sample: 288,
    task: 500_346,
  };
};
