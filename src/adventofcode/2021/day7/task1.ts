/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day7/task1.ts
 */
import { PartId, readFile, TaskId, withTime } from "../../common.ts";
import { getFuel, parseInput } from "./common.ts";

const day: TaskId = 7;
const part: PartId = 1;
const example = false;
const rows = await readFile(day, example);

const getStepFuel = (start: number, end: number): number => {
  const size = Math.abs(end - start);
  return size;
};

const task = () => {
  const crabs = parseInput(rows);
  return getFuel(crabs, getStepFuel);
};

withTime(task, day, part);
