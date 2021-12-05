/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day1/task1.ts
 */
import { getResult } from "./common.ts";
import { PartId, readFile, TaskId, withTime } from "../../common.ts";

const day: TaskId = 1;
const part: PartId = 1;
const example = false;
const rows = await readFile(day, example);

const getWindow = (lines: string[], start: number): number =>
  Number(lines[start] ?? 0);

const task = () => getResult(rows, getWindow);

withTime(task, day, part);
