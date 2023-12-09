/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 8 2
 */
import type { TaskResult } from "../../types.ts";
import { findForkCycle, MapFork, parseFork } from "./common.ts";
import { getLeastCommonMultiple } from "../../common/utils.ts";

const prepareForks = (
  rows: string[],
): { initials: MapFork[]; forks: Record<string, MapFork> } => {
  const initials = rows.filter((row) => parseFork(row).id.endsWith("A"));

  const forks = rows.reduce((acc, row) => {
    const fork = parseFork(row);
    return {
      ...acc,
      [fork.id]: fork,
    };
  }, {});

  return {
    initials: initials.map((initial) => parseFork(initial)),
    forks,
  };
};

const isFinished = (step: MapFork): boolean => step.id.endsWith("Z");

export const task = (rows: string[]): TaskResult => {
  const commands = rows.shift() || "";
  const commandsPool = commands.split("");
  rows.shift();
  const { forks, initials } = prepareForks(rows);

  const steps = initials;
  const cycles = steps.map((step) =>
    findForkCycle(step, commandsPool, forks, isFinished),
  );
  let arr: number[] = [...cycles];
  do {
    const first = arr.shift() ?? 0;
    const second = arr.shift() ?? 0;
    const nokValue = getLeastCommonMultiple(first, second);
    arr = [nokValue, ...arr];
  } while (arr.length > 1);

  const result = arr.at(0) ?? 0;
  return {
    result,
    sample: 6,
    task: 12_315_788_159_977,
  };
};
