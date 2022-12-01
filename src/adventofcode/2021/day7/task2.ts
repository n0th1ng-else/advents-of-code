/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day7/task2.ts
 */
import { readFileByPath, execWithTime } from "../../common.ts";
import { getFuel, parseInput } from "./common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

const getStepFuel = (start: number, end: number): number => {
  const size = Math.abs(end - start);
  return Math.ceil((size * (size + 1)) / 2);
};

const task = () => {
  const crabs = parseInput(rows);
  return getFuel(crabs, getStepFuel);
};

execWithTime(task, thisFile);
