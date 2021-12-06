/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day6/task2.ts
 */
import { PartId, readFile, TaskId, withTime } from "../../common.ts";
import { applyDay, parseInput } from "./commons.ts";

const day: TaskId = 6;
const part: PartId = 2;
const example = false;
const rows = await readFile(day, example);

const days = 256;

const task = () => {
  const parsed = parseInput(rows);
  const iterator = new Array(days).fill(0);
  iterator.forEach(() => applyDay(parsed));
  // renderFish(parsed)
  let sum = 0;
  parsed.forEach((item) => (sum += item));
  return sum;
};

withTime(task, day, part);
