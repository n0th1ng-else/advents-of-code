/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 6 2
 */
import type { TaskResult } from "../../types.ts";
import { getRoundOptions, type RaceRound } from "./common.ts";

const getRound = (rows: string[]): RaceRound => {
  const parsed = rows.map((row) => {
    const values = row.split(":").at(1) || "";
    const parts = values
      .split(" ")
      .map((v) => v.trim())
      .join("");
    return parts;
  });

  return {
    time: Number(parsed[0]),
    dist: Number(parsed[1]),
  };
};

export const task = (rows: string[]): TaskResult => {
  const round = getRound(rows);
  const options = [round].map((rnd) => getRoundOptions(rnd));
  const result = options.reduce((acc, curr) => acc * curr, 1);

  return {
    result,
    sample: 71_503,
    task: 42_515_755,
  };
};
