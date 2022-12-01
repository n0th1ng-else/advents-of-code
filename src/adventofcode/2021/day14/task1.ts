/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day14/task1.ts
 */
import { readFileByPath, execWithTime } from "../../common.ts";
import { doStep, parseInput } from "./common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

const STEPS = 10;

const task = () => {
  const { rules, net, stat } = parseInput(rows);
  for (let i = 0; i < STEPS; i++) {
    doStep(net, rules, stat);
  }
  const sorted = Object.values(stat).sort((a, b) => b - a);
  return Number(sorted.shift()) - Number(sorted.pop());
};

execWithTime(task, thisFile);
