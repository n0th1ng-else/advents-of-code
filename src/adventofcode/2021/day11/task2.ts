/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day11/task2.ts
 */
import { PartId, readFile, TaskId, withTime } from "../../common.ts";
import { experienceFlash, parseInput, renderFlashes } from "./common.ts";

const day: TaskId = 11;
const part: PartId = 2;
const example = false;
const rows = await readFile(day, example);

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

withTime(task, day, part);
