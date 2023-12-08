/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 8 1
 */
import type { TaskResult } from "../../types.ts";
import { type MapFork, parseFork } from "./common.ts";

const prepareForks = (
  rows: string[],
): { initial: MapFork; forks: Record<string, MapFork> } => {
  const initial = rows.find((row) => parseFork(row).id === "AAA");
  if (!initial) {
    throw new Error("AAA not found");
  }

  const forks = rows.reduce((acc, row) => {
    const fork = parseFork(row);
    return {
      ...acc,
      [fork.id]: fork,
    };
  }, {});

  return {
    initial: parseFork(initial),
    forks,
  };
};

const isFinished = (step: MapFork): boolean => step.id === "ZZZ";

export const task = (rows: string[]): TaskResult => {
  const commands = rows.shift() || "";
  const commandsPool = commands.split("");
  rows.shift();
  const { forks, initial } = prepareForks(rows);
  let step = initial;
  let count = 0;

  do {
    commandsPool.forEach((command) => {
      if (isFinished(step)) {
        return;
      }
      const next = step[command as "L" | "R"];
      step = forks[next];
      count += 1;
    });
  } while (!isFinished(step));

  return {
    result: count,
    sample: 6,
    task: 18_113,
  };
};
