/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day6/task2.ts
 */
import { readFileByPath, execWithTime } from "../../common.ts";
import { applyDay, parseInput } from "./commons.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

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

execWithTime(task, thisFile);
