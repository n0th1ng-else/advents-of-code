/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day11/task1.ts
 */
import { PartId, readFile, TaskId, withTime } from "../../common.ts";
import { experienceFlash, parseInput, renderFlashes } from "./common.ts";

const day: TaskId = 11;
const part: PartId = 1;
const example = false;
const rows = await readFile(day, example);

const STEPS = 100;

const task = () => {
  const data = parseInput(rows);
  renderFlashes(data);
  const count = new Array(STEPS).fill(0).reduce((sum) => {
    return sum + experienceFlash(data);
  }, 0);
  return count;
};

withTime(task, day, part);
