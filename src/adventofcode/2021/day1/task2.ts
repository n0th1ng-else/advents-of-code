/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day1/task2.ts
 */
import { getResult } from "./common.ts";
import { PartId, readFile, TaskId, withTime } from "../../common.ts";

const day: TaskId = 1;
const part: PartId = 2;
const rows = await readFile(day);

const getWindow = (lines: string[], start: number): number | null => {
  const size = lines.length;
  const end = start + 3;
  const isBigger = size < end;
  if (isBigger) {
    return null;
  }
  const items = lines.slice(start, end);
  return items.reduce((res, item) => res + Number(item), 0);
};

const task = () => getResult(rows, getWindow);

withTime(task, day, part);
