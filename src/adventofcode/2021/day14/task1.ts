/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day14/task1.ts
 */
import { PartId, readFile, TaskId, withTime } from "../../common.ts";
import { doStep, parseInput } from "./common.ts";

const day: TaskId = 14;
const part: PartId = 1;
const example = false;
const rows = await readFile(day, example);

const STEPS = 10;

const task = () => {
  const { rules, net, stat } = parseInput(rows);
  for (let i = 0; i < STEPS; i++) {
    doStep(net, rules, stat);
  }
  const sorted = Object.values(stat).sort((a, b) => b - a);
  return Number(sorted.shift()) - Number(sorted.pop());
};

withTime(task, day, part);
