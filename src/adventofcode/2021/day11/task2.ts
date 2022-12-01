/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day11/task2.ts
 */
import { readFileByPath, execWithTime } from "../../common.ts";
import { experienceFlash, parseInput, renderFlashes } from "./common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

const task = () => {
  const data = parseInput(rows);
  renderFlashes(data);
  let step = 0;
  let isFinal = false;
  const size = data.length * data.length;
  do {
    step += 1;
    isFinal = experienceFlash(data) === size;
  } while (!isFinal);

  return step;
};

execWithTime(task, thisFile);
