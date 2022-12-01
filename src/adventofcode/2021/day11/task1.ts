/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day11/task1.ts
 */
import { readFileByPath, execWithTime } from "../../common.ts";
import { experienceFlash, parseInput, renderFlashes } from "./common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

const STEPS = 100;

const task = () => {
  const data = parseInput(rows);
  renderFlashes(data);
  const count = new Array(STEPS).fill(0).reduce((sum) => {
    return sum + experienceFlash(data);
  }, 0);
  return count;
};

execWithTime(task, thisFile);
